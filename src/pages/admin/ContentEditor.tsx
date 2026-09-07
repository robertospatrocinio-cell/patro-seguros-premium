import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Save, Trash2, ExternalLink as ExternalLinkIcon, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { cidadesRegiao, cidadeRegiaoPath } from "@/data/cidadesRegiao";
import { articles } from "@/lib/blogData";
import {
  useAllContentOverrides,
  saveContentOverride,
  deleteContentOverride,
  type ContentScope,
  type ContentOverrideFaq,
  type ContentOverrideRow,
} from "@/hooks/useContentOverrides";

interface TargetPage {
  slug: string;
  label: string;
  path: string;
}

const cidadeTargets: TargetPage[] = cidadesRegiao.map((c) => ({
  slug: c.slug,
  label: `${c.nome}/${c.uf}`,
  path: cidadeRegiaoPath(c.slug),
}));

const blogTargets: TargetPage[] = [...articles]
  .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"))
  .map((a) => ({ slug: a.slug, label: a.title, path: `/blog/${a.slug}` }));

interface FormState {
  title: string;
  summary: string;
  intro: string;
  body: string;
  faqs: ContentOverrideFaq[];
  published: boolean;
  notes: string;
}

const emptyForm: FormState = {
  title: "",
  summary: "",
  intro: "",
  body: "",
  faqs: [],
  published: false,
  notes: "",
};

const rowToForm = (row?: ContentOverrideRow): FormState =>
  row
    ? {
        title: row.title ?? "",
        summary: row.summary ?? "",
        intro: row.intro ?? "",
        body: row.body ?? "",
        faqs: row.faqs,
        published: row.published,
        notes: row.notes ?? "",
      }
    : emptyForm;

const ScopeEditor = ({ scope, targets }: { scope: ContentScope; targets: TargetPage[] }) => {
  const queryClient = useQueryClient();
  const { data: rows, isLoading } = useAllContentOverrides(scope);
  const [selected, setSelected] = useState(targets[0]?.slug ?? "");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("");

  const rowsBySlug = useMemo(() => {
    const map: Record<string, ContentOverrideRow> = {};
    for (const row of rows ?? []) map[row.slug] = row;
    return map;
  }, [rows]);

  useEffect(() => {
    setForm(rowToForm(rowsBySlug[selected]));
  }, [selected, rowsBySlug]);

  const target = targets.find((t) => t.slug === selected);
  const visibleTargets = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return targets;
    return targets.filter(
      (t) => t.label.toLowerCase().includes(term) || t.slug.includes(term),
    );
  }, [filter, targets]);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["content-overrides"] });
  };

  const handleSave = async () => {
    if (!target) return;
    setSaving(true);
    try {
      await saveContentOverride({
        scope,
        slug: target.slug,
        title: form.title.trim() || null,
        summary: form.summary.trim() || null,
        intro: form.intro.trim() || null,
        body: form.body.trim() || null,
        faqs: form.faqs.filter((f) => f.q.trim() && f.a.trim()),
        published: form.published,
        notes: form.notes.trim() || null,
      });
      invalidate();
      toast.success(
        form.published
          ? "Conteúdo publicado. A página é atualizada na próxima visita — o sitemap não muda."
          : "Rascunho salvo. Ele não aparece no site até ser publicado.",
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!target || !rowsBySlug[target.slug]) return;
    setSaving(true);
    try {
      await deleteContentOverride(scope, target.slug);
      invalidate();
      setForm(emptyForm);
      toast.success("Edição removida. A página volta ao texto original.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível remover.");
    } finally {
      setSaving(false);
    }
  };

  const updateFaq = (index: number, patch: Partial<ContentOverrideFaq>) =>
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    }));

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-base">Páginas ({targets.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrar por nome ou endereço"
            aria-label="Filtrar páginas"
          />
          <ul className="max-h-[520px] overflow-y-auto space-y-1 pr-1">
            {visibleTargets.map((t) => {
              const row = rowsBySlug[t.slug];
              return (
                <li key={t.slug}>
                  <button
                    type="button"
                    onClick={() => setSelected(t.slug)}
                    className={`w-full text-left text-sm rounded-md px-3 py-2 transition-colors ${
                      selected === t.slug ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    }`}
                  >
                    <span className="block truncate">{t.label}</span>
                    {row && (
                      <Badge
                        variant={row.published ? "default" : "secondary"}
                        className="mt-1 text-[10px]"
                      >
                        {row.published ? "Publicado" : "Rascunho"}
                      </Badge>
                    )}
                  </button>
                </li>
              );
            })}
            {visibleTargets.length === 0 && (
              <li className="text-sm text-muted-foreground px-3 py-2">Nenhuma página encontrada.</li>
            )}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base">{target?.label ?? "Selecione uma página"}</CardTitle>
            {target && (
              <Link
                to={target.path}
                className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
              >
                {target.path}
                <ExternalLinkIcon className="h-3 w-3" aria-hidden="true" />
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor={`published-${scope}`} className="text-sm">
              Publicado
            </Label>
            <Switch
              id={`published-${scope}`}
              checked={form.published}
              onCheckedChange={(checked) => setForm((prev) => ({ ...prev, published: checked }))}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {isLoading && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Carregando edições…
            </p>
          )}

          {scope === "blog" && (
            <div className="space-y-1.5">
              <Label htmlFor="field-title">Título do artigo</Label>
              <Input
                id="field-title"
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Deixe vazio para manter o título original"
              />
            </div>
          )}

          {scope === "cidade" && (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="field-summary">Frase de destaque</Label>
                <Textarea
                  id="field-summary"
                  rows={2}
                  value={form.summary}
                  onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
                  placeholder="Deixe vazio para manter o texto original"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="field-intro">Parágrafo de abertura</Label>
                <Textarea
                  id="field-intro"
                  rows={4}
                  value={form.intro}
                  onChange={(e) => setForm((p) => ({ ...p, intro: e.target.value }))}
                />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="field-body">
              {scope === "blog" ? "Texto do artigo" : "Contexto local"}
            </Label>
            <Textarea
              id="field-body"
              rows={scope === "blog" ? 16 : 6}
              value={form.body}
              onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
              placeholder="Deixe vazio para manter o texto original"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Perguntas frequentes</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setForm((p) => ({ ...p, faqs: [...p.faqs, { q: "", a: "" }] }))}
              >
                <Plus className="h-4 w-4 mr-1" aria-hidden="true" /> Adicionar
              </Button>
            </div>
            {form.faqs.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Sem perguntas próprias — as perguntas originais da página continuam valendo.
              </p>
            )}
            {form.faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={faq.q}
                    onChange={(e) => updateFaq(index, { q: e.target.value })}
                    placeholder="Pergunta"
                    aria-label={`Pergunta ${index + 1}`}
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label={`Remover pergunta ${index + 1}`}
                    onClick={() =>
                      setForm((p) => ({ ...p, faqs: p.faqs.filter((_, i) => i !== index) }))
                    }
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
                <Textarea
                  rows={3}
                  value={faq.a}
                  onChange={(e) => updateFaq(index, { a: e.target.value })}
                  placeholder="Resposta"
                  aria-label={`Resposta ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="field-notes">Anotação interna (não aparece no site)</Label>
            <Input
              id="field-notes"
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleSave} disabled={saving || !target}>
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="h-4 w-4 mr-2" aria-hidden="true" />
              )}
              Salvar
            </Button>
            {target && rowsBySlug[target.slug] && (
              <Button variant="outline" onClick={handleDelete} disabled={saving}>
                <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                Voltar ao texto original
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ContentEditor = () => (
  <>
    <Helmet>
      <title>Editor de conteúdo | Admin Patro Seguros</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <main id="main-content" className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">Editor de conteúdo</h1>
      <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
        Edite os textos das páginas de cidade/região e dos artigos do blog. As alterações valem
        para páginas que já existem, então o mapa do site (sitemap) continua o mesmo e não precisa
        ser recalculado a cada publicação — ele só muda quando uma página nova é criada no código.
      </p>

      <Tabs defaultValue="cidade">
        <TabsList className="mb-6">
          <TabsTrigger value="cidade">Cidades e regiões</TabsTrigger>
          <TabsTrigger value="blog">Artigos do blog</TabsTrigger>
        </TabsList>
        <TabsContent value="cidade">
          <ScopeEditor scope="cidade" targets={cidadeTargets} />
        </TabsContent>
        <TabsContent value="blog">
          <ScopeEditor scope="blog" targets={blogTargets} />
        </TabsContent>
      </Tabs>
    </main>
  </>
);

export default ContentEditor;
