import { useMemo, useState } from "preact/hooks";

interface Project {
  id: string;
  data: {
    title: string;
    description: string;
    tags?: string[];
  };
}

interface Props {
  projects: Project[];
}

export default function PortfolioFilters({ projects }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const project of projects) {
      if (project.data.tags) {
        for (const tag of project.data.tags) {
          tags.add(tag);
        }
      }
    }
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter((p) => p.data.tags?.includes(activeTag));
  }, [projects, activeTag]);

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
            !activeTag
              ? "bg-emerald-500 text-zinc-950 border-emerald-500 shadow-lg shadow-emerald-500/20"
              : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
          }`}
        >
          All Projects
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
              activeTag === tag
                ? "bg-emerald-500 text-zinc-950 border-emerald-500 shadow-lg shadow-emerald-500/20"
                : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
        {filteredProjects.map((project) => (
          <a
            key={project.id}
            href={`/portfolio/${project.id}`}
            className="group block p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-emerald-500/30 transition-all hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {project.data.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest font-black text-emerald-500/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                {project.data.title}
              </h3>
              <p className="text-zinc-400 line-clamp-2 text-sm leading-relaxed">
                {project.data.description}
              </p>
              <div className="pt-4 flex items-center text-xs font-bold text-emerald-500 group-hover:gap-2 transition-all">
                View Case Study
                <span className="opacity-0 group-hover:opacity-100 transition-all">
                  →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <p className="text-zinc-500 font-medium">
            No projects found for "{activeTag}".
          </p>
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className="text-emerald-500 font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
