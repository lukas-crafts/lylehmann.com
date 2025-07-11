import React, { useState, useMemo } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  cover?: string;
  tags?: string[];
}

interface PortfolioFilterProps {
  projects: Project[];
  tags: string[];
}

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ projects, tags }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTags =
        selectedTags.length === 0 ||
        (project.tags && selectedTags.some((tag) => project.tags!.includes(tag)));
      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());
      return matchesTags && matchesSearch;
    });
  }, [projects, selectedTags, search]);

  return (
    <div>
      {/* Only Search Bar */}
      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 mb-8">
        <div className="relative w-full">
          <span className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2 pointer-events-none">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            className="bg-[var(--color-bg-default)] shadow-sm focus:shadow-md py-2 pr-3 pl-10 border border-[var(--color-border-default)] rounded-full focus:outline-none focus:ring-2 focus:ring-primary w-full text-[var(--color-text-body)] transition-all duration-200"
            aria-label="Search projects by title or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="top-1/2 right-3 absolute focus:outline-none text-gray-400 hover:text-primary -translate-y-1/2"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>
      </div>
      {/* Project Grid */}
      <section className="gap-8 md:gap-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" aria-label="Portfolio projects">
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 text-muted text-center">No projects found.</div>
        )}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col justify-between bg-[var(--color-bg-subtle)] opacity-100 shadow hover:shadow-xl p-6 border border-[var(--color-border-default)] rounded-2xl focus-within:ring-2 focus-within:ring-primary scale-100 hover:scale-[1.03] transition-all hover:-translate-y-1 duration-300 portfolio-card-modern"
          >
            {(project.cover || project.image) && (
              <img
                src={project.cover || project.image}
                alt={typeof project.title === 'string' && project.title.trim().length > 0 ? project.title : 'Project cover'}
                className="bg-[var(--color-bg-muted)] mb-4 rounded-xl w-full h-48 object-cover"
                loading="lazy"
              />
            )}
            <div>
              <div className="flex items-center mb-4">
                <h2 className="font-semibold text-2xl">
                  {project.title && project.title.trim() ? project.title : 'Project'}
                </h2>
              </div>
              <p className="mb-4 text-muted">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(project.tags || []).map((tag) => (
                  <span className="bg-[var(--color-interactive-secondary-hover)] px-2 py-0.5 border border-[var(--color-border-default)] rounded-full font-medium text-[var(--color-text-body)] text-xs" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={`/portfolio/${project.id}`}
              className="inline-block mt-auto focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-[var(--color-brand-primary)] hover:underline"
              aria-label={`View case study: ${project.title}`}
            >
              View Case Study
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PortfolioFilter; 
