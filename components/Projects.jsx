'use client';
import { useState, useEffect, useRef } from 'react';
import config from '@/config';

const GAP = 16;

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    function update() {
      setIsMobile(window.innerWidth < 768);
      setCurrentIndex(0);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const projects = config.projects;
  const N = projects.length;

  const totalSlides = isMobile ? N : Math.max(1, N - 1);
  const safeIndex = Math.min(currentIndex, totalSlides - 1);

  const cardWidth = containerWidth > 0
    ? (isMobile ? containerWidth : (containerWidth - GAP) / 2)
    : 0;
  const translateX = isMobile
    ? safeIndex * containerWidth
    : safeIndex * (cardWidth + GAP);

  return (
    <section id="projects" className="space-y-6">
      <h2 className="font-serif text-3xl text-ink">Projects</h2>

      <div className="space-y-5">
        <div className="relative px-10">
          {totalSlides > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                disabled={safeIndex === 0}
                aria-label="Previous projects"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm bg-background text-taupe hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                style={{ border: '1px solid #8B7355' }}
              >
                &#8592;
              </button>

              <button
                onClick={() => setCurrentIndex(i => Math.min(totalSlides - 1, i + 1))}
                disabled={safeIndex === totalSlides - 1}
                aria-label="Next projects"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm bg-background text-taupe hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                style={{ border: '1px solid #8B7355' }}
              >
                &#8594;
              </button>
            </>
          )}

          <div className="overflow-hidden" ref={containerRef}>
            <div
              className="flex items-stretch transition-transform duration-300 ease-in-out"
              style={{ gap: GAP, transform: `translateX(-${translateX}px)` }}
            >
              {projects.map(project => (
                <div
                  key={project.title}
                  style={{ flex: `0 0 ${cardWidth}px`, minWidth: 0 }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="rounded-full transition-colors"
                style={{
                  width: 6,
                  height: 6,
                  background: idx === safeIndex ? '#8B7355' : '#E8E0D0',
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
