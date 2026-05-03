'use client';
import { useState, useEffect } from 'react';
import config from '@/config';

export default function ResumeAndCerts() {
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

  const certs = config.certs;
  const totalPages = Math.ceil(certs.length / cardsPerView);
  const page = Math.min(currentPage, totalPages - 1);

  const pages = Array.from({ length: totalPages }, (_, i) =>
    certs.slice(i * cardsPerView, i * cardsPerView + cardsPerView)
  );

  const gapPx = 16;
  const cardWidth = `calc(${100 / cardsPerView}% - ${(gapPx * (cardsPerView - 1)) / cardsPerView}px)`;

  return (
    <section id="resume" className="space-y-10">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl text-ink">Resume & Certs</h2>
        <a
          href={config.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm font-medium text-taupe px-4 py-2 rounded transition-colors hover:text-ink"
          style={{ border: '1px solid #8B7355' }}
        >
          Download Resume &darr;
        </a>
      </div>

      <div className="space-y-5">
        <div className="relative px-10">
          {totalPages > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                aria-label="Previous certifications"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm bg-background text-taupe hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                style={{ border: '1px solid #8B7355' }}
              >
                &#8592;
              </button>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                aria-label="Next certifications"
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
                  {pageCards.map(cert => (
                    <div key={cert.title} style={{ flex: `0 0 ${cardWidth}` }}>
                      <CertCard cert={cert} />
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

function CertCard({ cert }) {
  return (
    <div
      className="h-full flex flex-col gap-4 p-5 bg-background rounded-lg"
      style={{ border: '1px solid #8B7355' }}
    >
      {cert.logo && (
        <div className="flex items-center h-10">
          <img
            src={cert.logo}
            alt={cert.issuer}
            className="h-10 w-10 object-contain rounded-sm"
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
      )}

      <div className="space-y-1 flex-1">
        <h3 className="font-serif text-lg text-ink leading-snug">{cert.title}</h3>
        <p className="font-sans text-[11px] text-taupe">{cert.issuer} &middot; {cert.date}</p>
      </div>

      {cert.url && (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs text-taupe hover:text-ink transition-colors mt-auto"
        >
          View Certificate &rarr;
        </a>
      )}
    </div>
  );
}
