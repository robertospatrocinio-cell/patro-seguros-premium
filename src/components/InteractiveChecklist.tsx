import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Printer, RotateCcw, CheckCircle2 } from "lucide-react";

export interface ChecklistSection {
  title: string;
  items: string[];
}

interface Props {
  slug: string;
  title: string;
  sections: ChecklistSection[];
}

const storageKey = (slug: string) => `patro:checklist:${slug}`;

const InteractiveChecklist = ({ slug, title, sections }: Props) => {
  const allKeys = useMemo(
    () => sections.flatMap((s, si) => s.items.map((_, ii) => `${si}-${ii}`)),
    [sections]
  );
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
  }, [slug]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey(slug), JSON.stringify(checked));
    } catch {}
  }, [slug, checked]);

  const total = allKeys.length;
  const done = allKeys.filter((k) => checked[k]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const reset = () => setChecked({});
  const print = () => window.print();

  return (
    <div className="space-y-5 print-checklist">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between rounded-lg border bg-card p-4 no-print-hidden">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm font-medium mb-1">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            {done} de {total} concluídos ({pct}%)
          </div>
          <Progress value={pct} className="h-2" />
        </div>
        <div className="flex gap-2 no-print">
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-4 w-4 mr-1" /> Zerar
          </Button>
          <Button variant="default" size="sm" onClick={print}>
            <Printer className="h-4 w-4 mr-1" /> Imprimir / PDF
          </Button>
        </div>
      </div>

      <h2 className="sr-only print-only-block">{title}</h2>

      {sections.map((section, si) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="text-lg">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {section.items.map((item, ii) => {
                const key = `${si}-${ii}`;
                const isDone = !!checked[key];
                return (
                  <li key={key} className="flex items-start gap-3 text-sm">
                    <Checkbox
                      id={`${slug}-${key}`}
                      checked={isDone}
                      onCheckedChange={() => toggle(key)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={`${slug}-${key}`}
                      className={`cursor-pointer leading-snug ${isDone ? "line-through text-muted-foreground" : ""}`}
                    >
                      {item}
                    </label>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InteractiveChecklist;