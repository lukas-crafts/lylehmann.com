import { useEffect, useState } from "preact/hooks";

interface Heading {
  slug: string;
  text: string;
  depth: number;
}

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0% -80% 0%" },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800">
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">
          Table of Contents
        </span>
      </div>
      <nav className="px-5 py-4">
        <ul className="space-y-3">
          {headings
            .filter((h) => h.depth <= 3)
            .map((heading) => (
              <li
                key={heading.slug}
                style={{ paddingLeft: `${(heading.depth - 2) * 12}px` }}
              >
                <a
                  href={`#${heading.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(heading.slug)
                      ?.scrollIntoView({ behavior: "smooth" });
                    setActiveId(heading.slug);
                  }}
                  className={`text-sm transition-all block leading-tight font-medium ${
                    activeId === heading.slug
                      ? "text-emerald-400 translate-x-1"
                      : "text-zinc-400 hover:text-emerald-400"
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
