'use client';
import { useState, useEffect, useRef } from 'react';
import config from '@/config';

const GAP = 16;

export default function ResumeAndCerts() {
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

  const certs = config.certs;
  const N = certs.length;

  const totalSlides = isMobile ? N : Math.max(1, N - 1);
  const safeIndex = Math.min(currentIndex, totalSlides - 1);

  const cardWidth = containerWidth > 0
    ? (isMobile ? containerWidth : (containerWidth - GAP) / 2)
    : 0;
  const translateX = isMobile
    ? safeIndex * containerWidth
    : safeIndex * (cardWidth + GAP);

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
          {totalSlides > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
                disabled={safeIndex === 0}
                aria-label="Previous certifications"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm bg-background text-taupe hover:text-ink disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                style={{ border: '1px solid #8B7355' }}
              >
                &#8592;
              </button>

              <button
                onClick={() => setCurrentIndex(i => Math.min(totalSlides - 1, i + 1))}
                disabled={safeIndex === totalSlides - 1}
                aria-label="Next certifications"
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
              {certs.map(cert => (
                <div
                  key={cert.title}
                  style={{ flex: `0 0 ${cardWidth}px`, minWidth: 0 }}
                >
                  <CertCard cert={cert} />
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
