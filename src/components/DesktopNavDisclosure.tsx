import { useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface DesktopNavDisclosureProps {
  label: string;
  panelClassName: string;
  children: ReactNode;
}

/** Navegação por links: Tab percorre os destinos; Escape volta ao botão. */
export default function DesktopNavDisclosure({ label, panelClassName, children }: DesktopNavDisclosureProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
      onClick={(event) => {
        if ((event.target as Element).closest("a")) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="flex items-center gap-1 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-base py-2 px-3"
        onClick={() => setOpen((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => panel.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus());
          }
        }}
      >
        {label}
        <ChevronDown className="h-3 w-3 opacity-70" aria-hidden="true" />
      </button>
      <div
        ref={panel}
        id={`${id}-panel`}
        aria-labelledby={`${id}-trigger`}
        hidden={!open}
        className={`absolute top-full pt-2 z-50 ${panelClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
