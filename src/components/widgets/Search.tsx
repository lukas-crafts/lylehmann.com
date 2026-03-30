/** @jsxImportSource preact */
import { Search as SearchIcon, X } from "lucide-preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (_) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
  }, [query]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-zinc-400 hover:text-white transition-colors"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-24 px-6">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300 w-full h-full border-none cursor-default"
            onClick={handleClose}
            aria-label="Close search"
          />

          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
              <SearchIcon className="w-6 h-6 text-emerald-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
                placeholder="Search projects or services..."
                className="flex-1 bg-transparent border-none text-xl text-white focus:outline-none placeholder:text-zinc-600"
              />
              <button
                type="button"
                onClick={handleClose}
                className="p-2 text-zinc-500 hover:text-white"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 min-h-48 flex flex-col">
              {query.length < 2 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                  <p className="font-medium text-lg text-zinc-400">
                    Search for anything...
                  </p>
                  <p className="text-sm text-zinc-500">
                    Try "Accessibility", "Design", or "E-Commerce"
                  </p>
                </div>
              ) : loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                </div>
              ) : results.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                  <p className="font-medium text-lg text-zinc-400">
                    No results for "{query}"
                  </p>
                  <p className="text-sm text-zinc-500">
                    Try a different search term
                  </p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {results.map((result) => (
                    <li key={result.id}>
                      <a
                        href={`/portfolio/${result.id}`}
                        onClick={handleClose}
                        className="flex flex-col gap-1 p-4 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {result.title}
                          </span>
                          {result.category && (
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider shrink-0">
                              {result.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {result.description}
                        </p>
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {result.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-400 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-zinc-950/50 p-4 border-t border-zinc-800 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-zinc-600">
              <div className="flex gap-4">
                <span>
                  <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400 font-mono">
                    ESC
                  </kbd>{" "}
                  to close
                </span>
                <span>
                  <kbd className="bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400 font-mono">
                    ENTER
                  </kbd>{" "}
                  to open
                </span>
              </div>
              <div>{results.length > 0 ? `${results.length} result${results.length !== 1 ? "s" : ""}` : "Powered by Astro Islands"}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
