import { useEffect, useMemo, useRef, useState, type ElementType, type KeyboardEvent } from "react";
import { CornerDownLeft, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDialogFocus } from "@/lib/useDialogFocus";

export interface CommandItem {
  id: string;
  group: string;
  title: string;
  hint?: string;
  icon: ElementType;
  keywords?: string;
  run: () => void;
}

const norm = (s: string) => s.toLowerCase().replace(/[\s·_-]+/g, " ").trim();

export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = "Search modules, economies, clusters, or metrics…",
  emptyHint = "Try searching 'Indonesia', 'Moran', 'Land Frontier', or 'Simulator'",
  limitPerGroup = 6,
}: {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  emptyHint?: string;
  limitPerGroup?: number;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useDialogFocus(open, panel, onClose);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      requestAnimationFrame(() => input.current?.focus());
    }
  }, [open]);

  // Global Ctrl+K / Cmd+K listener handled by parent or here
  const results = useMemo(() => {
    const terms = norm(q).split(" ").filter(Boolean);
    const hits = items.filter((it) => {
      const hay = norm(`${it.title} ${it.hint ?? ""} ${it.keywords ?? ""} ${it.group}`);
      return terms.every((t) => hay.includes(t));
    });
    const groups = new Map<string, CommandItem[]>();
    for (const h of hits) {
      const g = groups.get(h.group) ?? [];
      if (g.length < limitPerGroup) g.push(h);
      groups.set(h.group, g);
    }
    return [...groups.entries()];
  }, [q, items, limitPerGroup]);

  const flat = results.flatMap(([, g]) => g);

  useEffect(() => {
    setSel(0);
  }, [q]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  if (!open) return null;

  const run = (it?: CommandItem) => {
    if (!it) return;
    onClose();
    it.run();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.max(0, Math.min(s + 1, flat.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(flat[sel]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  let index = -1;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]" role="presentation">
      <div
        className="absolute inset-0 bg-[#000000]/25 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Search GRAIN"
        onKeyDown={onKey}
        className="grain-dialog relative w-full max-w-[620px] overflow-hidden rounded-2xl border border-black/10 bg-surface text-neutral-900 shadow-xl"
      >
        <div className="flex items-center gap-3 border-b border-black/10 px-4">
          <Search className="size-5 shrink-0 text-neutral-800" strokeWidth={1.8} aria-hidden="true" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            role="combobox"
            aria-label="Search modules, economies, and clusters"
            aria-controls="grain-search-results"
            aria-activedescendant={flat[sel] ? "grain-result-" + flat[sel].id : undefined}
            aria-expanded="true"
            className="h-[52px] min-w-0 flex-1 border-0 bg-transparent text-[15px] text-neutral-950 placeholder-neutral-500 outline-none"
          />
          <kbd className="hidden h-5 items-center rounded border border-black/10 bg-neutral-100 px-1.5 font-mono text-[11px] text-neutral-600 sm:inline-flex">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-md p-1 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 sm:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <div ref={list} id="grain-search-results" role="listbox" className="max-h-[min(60vh,460px)] overflow-y-auto p-2">
          {flat.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-[14px] font-semibold text-neutral-950">No results found for “{q}”</p>
              {emptyHint && <p className="mt-1 text-[13px] text-neutral-600">{emptyHint}</p>}
            </div>
          )}

          {results.map(([group, its]) => (
            <div key={group} className="mb-2" role="group" aria-label={group}>
              <div className="px-3 pb-1 pt-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                {group}
              </div>
              {its.map((it) => {
                index += 1;
                const i = index;
                const on = i === sel;
                return (
                  <div
                    key={it.id}
                    id={"grain-result-" + it.id}
                    data-index={i}
                    role="option"
                    aria-selected={on}
                    onMouseMove={() => setSel(i)}
                    onClick={() => run(it)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                      on ? "bg-grain-mist border border-black/10 text-neutral-950" : "hover:bg-neutral-100/60 text-neutral-700",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-lg border",
                        on
                          ? "border-black/10 bg-grain-mist text-neutral-800"
                          : "border-black/10 bg-neutral-100/50 text-neutral-600",
                      )}
                    >
                      <it.icon className="size-4" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold text-neutral-950">{it.title}</span>
                      {it.hint && <span className="block truncate text-[12px] text-neutral-600">{it.hint}</span>}
                    </span>
                    {on && <CornerDownLeft className="size-4 shrink-0 text-neutral-800" aria-hidden="true" />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
