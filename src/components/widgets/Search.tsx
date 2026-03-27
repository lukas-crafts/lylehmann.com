/** @jsxImportSource preact */
import { Search as SearchIcon, X } from "lucide-preact";
import { useEffect, useRef, useState } from "preact/hooks";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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
            onClick={() => setIsOpen(false)}
            aria-label="Close search"
          />

          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">
            <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
              <SearchIcon className="w-6 h-6 text-emerald-500" />
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
                onClick={() => setIsOpen(false)}
                className="p-2 text-zinc-500 hover:text-white"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 min-h-72 flex flex-col items-center justify-center text-center space-y-4">
              {query.length < 2 ? (
                <div className="text-zinc-500">
                  <p className="font-medium text-lg text-zinc-400">
                    Search for anything...
                  </p>
                  <p className="text-sm">
                    Type at least 2 characters to see results
                  </p>
                </div>
              ) : (
                <div className="text-zinc-500">
                  <p className="font-medium text-lg text-zinc-400">
                    No results found for "{query}"
                  </p>
                  <p className="text-sm">
                    Try searching for "Accessibility" or "Design"
                  </p>
                </div>
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
                  to search
                </span>
              </div>
              <div>Powered by Astro Islands</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
