'use client';
import { useState, useEffect } from 'react';
import config from '@/config';

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);

  useEffect(() => {
    function update() {
      setCardsPerView(window.innerWidth >= 768 ? 2 : 1);
      setCurrentPage(0);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const projects = config.projects;
  const totalPages = Math.ceil(projects.length / cardsPerView);
  const page = Math.min(currentPage, totalPages - 1);

  const pages = Array.from({ length: totalPages }, (_, i) =>
    projects.slice(i * cardsPerView, i * cardsPerView + cardsPerView)
  );

  const gapPx = 16;
  const cardWidth = `calc(${100 / cardsPerView}% - ${(gapPx * (cardsPerView - 1)) / cardsPerView}px)`;

  return (
    <section id="projects" className="space-y-6">
      <h2 className="font-serif text-3xl text-ink">Projects</h2>

      <div className="space-y-5">
        <div className="relative px-10">
          {totalPages > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous projects"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm bg-background text-taupe hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                style={{ border: '1px solid #8B7355' }}
              >
                &#8592;
              </button>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                aria-label="Next projects"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm bg-background text-taupe hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                style={{ border: '1px solid #8B7355' }}
              >
                &#8594;
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {pages.map((pageCards, pageIdx) => (
                <div key={pageIdx} className="min-w-full flex gap-4 items-stretch">
                  {pageCards.map(project => (
                    <div key={project.title} style={{ flex: `0 0 ${cardWidth}` }}>
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
                className="rounded-full transition-colors"
                style={{
                  width: 6,
                  height: 6,
                  background: idx === page ? '#8B7355' : '#E8E0D0',
                  border: '1px solid #8B7355',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div
      className="h-full flex flex-col gap-4 p-5 bg-background rounded-lg"
      style={{ border: '1px solid #8B7355' }}
    >
      {project.thumbnail && (
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full object-contain rounded-sm"
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
      )}

      <div className="space-y-2 flex-1">
        <h3 className="font-serif text-xl text-ink leading-snug">{project.title}</h3>
        <p className="font-sans text-sm text-taupe leading-relaxed">{project.description}</p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(tag => (
            <span
              key={tag}
              className="font-sans text-[11px] text-taupe px-2 py-0.5 rounded-full bg-secondary"
              style={{ border: '1px solid #8B7355' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1 flex-shrink-0">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-taupe hover:text-ink transition-colors"
            >
              GitHub &rarr;
            </a>
          )}
          {project.poster && (
            <a
              href={project.poster}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-taupe hover:text-ink transition-colors"
            >
              Poster &rarr;
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-taupe hover:text-ink transition-colors"
            >
              Live &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
