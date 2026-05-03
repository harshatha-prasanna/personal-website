import config from '@/config';

export default function Projects() {
  return (
    <section id="projects" className="space-y-6">
      <h2 className="font-serif text-3xl text-ink">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div
      className="flex flex-col justify-between gap-4 p-5 bg-background rounded-lg"
      style={{ border: '1px solid #8B7355' }}
    >
      <div className="space-y-2">
        <h3 className="font-serif text-xl text-ink leading-snug">{project.title}</h3>
        <p className="font-sans text-sm text-taupe leading-relaxed">{project.description}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[11px] text-taupe px-2 py-0.5 rounded-full bg-secondary"
              style={{ border: '1px solid #8B7355' }}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs text-taupe hover:text-ink transition-colors flex-shrink-0"
          >
            GitHub &rarr;
          </a>
        )}
      </div>
    </div>
  );
}
