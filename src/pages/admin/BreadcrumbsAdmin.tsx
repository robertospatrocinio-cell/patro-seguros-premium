import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, RefreshCw, Save, Trash2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import {
  useBreadcrumbOverrides,
  type BreadcrumbOverrideRow,
} from "@/hooks/useBreadcrumbOverrides";
import {
  KNOWN_LONGTAIL_SLUGS,
  getStaticBreadcrumbDefaults,
} from "@/lib/breadcrumbCategory";

interface EditableRow {
  slug: string;
  category_label: string;
  category_href: string;
  pillar_label: string;
  pillar_href: string;
  notes: string;
  hasOverride: boolean;
  dirty: boolean;
  saving: boolean;
}

/**
 * Painel `/admin/breadcrumbs`: revisa a categoria e o pilar de cada
 * página long-tail, permitindo salvar/remover overrides sem tocar
 * no código. Overrides são lidos por `useBreadcrumbOverrides` e
 * aplicados em runtime pelo `InsurancePageTemplate`.
 *
 * Convenções nos campos:
 *   - vazio     → mantém o default estático (herdado do código).
 *   - "—"       → remove o nível do breadcrumb (será persistido como "").
 */
const REMOVE_SENTINEL = "—";

const emptyRow = (slug: string): EditableRow => ({
  slug,
  category_label: "",
  category_href: "",
  pillar_label: "",
  pillar_href: "",
  notes: "",
  hasOverride: false,
  dirty: false,
  saving: false,
});

function rowFromDb(
  slug: string,
  db?: BreadcrumbOverrideRow,
): EditableRow {
  if (!db) return emptyRow(slug);
  const asInput = (v: string | null) => (v === "" ? REMOVE_SENTINEL : (v ?? ""));
  return {
    slug,
    category_label: asInput(db.category_label),
    category_href: asInput(db.category_href),
    pillar_label: asInput(db.pillar_label),
    pillar_href: asInput(db.pillar_href),
    notes: db.notes ?? "",
    hasOverride: true,
    dirty: false,
    saving: false,
  };
}

function fieldToDb(v: string): string | null {
  const t = v.trim();
  if (t === "") return null;
  if (t === REMOVE_SENTINEL) return "";
  return t;
}

export default function BreadcrumbsAdmin() {
  const queryClient = useQueryClient();
  const { data: overrides, isLoading, refetch } = useBreadcrumbOverrides();
  const [rowsById, setRowsById] = useState<Record<string, EditableRow>>({});
  const [newSlug, setNewSlug] = useState("");
  const [dbRows, setDbRows] = useState<BreadcrumbOverrideRow[]>([]);

  const loadDbRows = useCallback(async () => {
    const { data, error } = await supabase
      .from("breadcrumb_overrides")
      .select("*")
      .order("slug", { ascending: true });
    if (error) {
      toast.error(`Erro ao carregar overrides: ${error.message}`);
      return;
    }
    setDbRows((data ?? []) as BreadcrumbOverrideRow[]);
  }, []);

  useEffect(() => {
    loadDbRows();
  }, [loadDbRows, overrides]);

  const displaySlugs = useMemo(() => {
    const set = new Set<string>(KNOWN_LONGTAIL_SLUGS);
    for (const r of dbRows) set.add(r.slug);
    return Array.from(set).sort();
  }, [dbRows]);

  const getRow = (slug: string): EditableRow => {
    if (rowsById[slug]) return rowsById[slug];
    return rowFromDb(slug, dbRows.find((r) => r.slug === slug));
  };

  const patchRow = (slug: string, patch: Partial<EditableRow>) => {
    setRowsById((prev) => ({
      ...prev,
      [slug]: { ...getRow(slug), ...patch, dirty: true },
    }));
  };

  const save = async (slug: string) => {
    const row = getRow(slug);
    setRowsById((p) => ({ ...p, [slug]: { ...row, saving: true } }));
    const payload = {
      slug,
      category_label: fieldToDb(row.category_label),
      category_href: fieldToDb(row.category_href),
      pillar_label: fieldToDb(row.pillar_label),
      pillar_href: fieldToDb(row.pillar_href),
      notes: row.notes.trim() || null,
    };
    const { error } = await supabase
      .from("breadcrumb_overrides")
      .upsert(payload, { onConflict: "slug" });
    if (error) {
      toast.error(`Erro ao salvar ${slug}: ${error.message}`);
      setRowsById((p) => ({ ...p, [slug]: { ...row, saving: false } }));
      return;
    }
    toast.success(`Override salvo para ${slug}`);
    await queryClient.invalidateQueries({ queryKey: ["breadcrumb-overrides"] });
    await refetch();
    await loadDbRows();
    setRowsById((p) => {
      const next = { ...p };
      delete next[slug];
      return next;
    });
  };

  const remove = async (slug: string) => {
    if (!confirm(`Remover override de ${slug} e voltar ao default?`)) return;
    const { error } = await supabase
      .from("breadcrumb_overrides")
      .delete()
      .eq("slug", slug);
    if (error) {
      toast.error(`Erro ao remover: ${error.message}`);
      return;
    }
    toast.success(`Override removido para ${slug}`);
    await queryClient.invalidateQueries({ queryKey: ["breadcrumb-overrides"] });
    await loadDbRows();
    setRowsById((p) => {
      const next = { ...p };
      delete next[slug];
      return next;
    });
  };

  const addSlug = () => {
    const s = newSlug.trim().replace(/\/+$/, "");
    if (!s.startsWith("/")) {
      toast.error("Slug deve começar com /");
      return;
    }
    setRowsById((p) => ({ ...p, [s]: { ...emptyRow(s), dirty: true } }));
    setNewSlug("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Breadcrumbs — Categoria & Pilar</h1>
            <p className="text-muted-foreground text-sm max-w-2xl">
              Ajuste sem tocar no código a cadeia <strong>Categoria → Pilar → Página</strong>{" "}
              usada em BreadcrumbList e navegação das páginas long-tail.
              Deixe em branco para manter o default. Use <code>{REMOVE_SENTINEL}</code>{" "}
              nos dois campos (label + href) para remover aquele nível do breadcrumb.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Recarregar
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Adicionar slug fora do cluster padrão</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Input
              placeholder="/nova-pagina-long-tail"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={addSlug} disabled={!newSlug.trim()}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {displaySlugs.map((slug) => {
            const row = getRow(slug);
            const defaults = getStaticBreadcrumbDefaults(slug);
            return (
              <Card key={slug}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-base font-mono">{slug}</CardTitle>
                    <div className="flex items-center gap-2">
                      {row.hasOverride ? (
                        <Badge variant="default">Override ativo</Badge>
                      ) : (
                        <Badge variant="outline">Usando defaults</Badge>
                      )}
                      {row.dirty && <Badge variant="secondary">Não salvo</Badge>}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 space-y-0.5">
                    <div>
                      <strong>Categoria default:</strong>{" "}
                      {defaults.category ? (
                        <>
                          {defaults.category.label}{" "}
                          <span className="font-mono">({defaults.category.href})</span>
                        </>
                      ) : (
                        <em>nenhuma</em>
                      )}
                    </div>
                    <div>
                      <strong>Pilar default:</strong>{" "}
                      {defaults.pillar ? (
                        <>
                          {defaults.pillar.label}{" "}
                          <span className="font-mono">({defaults.pillar.href})</span>
                        </>
                      ) : (
                        <em>nenhum</em>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">
                      Categoria
                    </Label>
                    <Input
                      placeholder="Label (ex: Seguro Auto)"
                      value={row.category_label}
                      onChange={(e) => patchRow(slug, { category_label: e.target.value })}
                    />
                    <Input
                      placeholder="Href (ex: /seguros-em-guarulhos)"
                      value={row.category_href}
                      onChange={(e) => patchRow(slug, { category_href: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">
                      Pilar
                    </Label>
                    <Input
                      placeholder="Label (ex: Seguro Auto em Guarulhos)"
                      value={row.pillar_label}
                      onChange={(e) => patchRow(slug, { pillar_label: e.target.value })}
                    />
                    <Input
                      placeholder="Href (ex: /seguro-auto-guarulhos)"
                      value={row.pillar_href}
                      onChange={(e) => patchRow(slug, { pillar_href: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs font-semibold uppercase text-muted-foreground">
                      Notas internas
                    </Label>
                    <Textarea
                      rows={2}
                      placeholder="Contexto do ajuste, tickets relacionados, etc."
                      value={row.notes}
                      onChange={(e) => patchRow(slug, { notes: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    {row.hasOverride && (
                      <Button variant="outline" size="sm" onClick={() => remove(slug)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Remover override
                      </Button>
                    )}
                    {row.dirty && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setRowsById((p) => {
                            const next = { ...p };
                            delete next[slug];
                            return next;
                          })
                        }
                      >
                        <RotateCcw className="h-4 w-4 mr-1" /> Descartar
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => save(slug)}
                      disabled={row.saving || !row.dirty}
                    >
                      {row.saving ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-1" />
                      )}
                      Salvar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}