'use client';

import { useEffect, useState } from 'react';
import config from '@/config';

export default function Hero() {
  const [track, setTrack] = useState(null);
  const [trackLoaded, setTrackLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch('/api/nowplaying');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTrack(data.title ? data : null);
      } catch {
        setTrack(null);
      } finally {
        setTrackLoaded(true);
      }
    }

    async function fetchWeather() {
      try {
        const res = await fetch('/api/weather');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setWeather(data.error ? null : data);
      } catch {
        setWeather(null);
      }
    }

    fetchTrack();
    fetchWeather();
    const id = setInterval(fetchTrack, config.nowPlaying.refreshInterval);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section id="hero" className="space-y-6">
        <div className="space-y-3">
          <h1 className="font-serif text-5xl md:text-6xl text-ink leading-tight">
            {config.name}
          </h1>
          <p
            className="text-taupe text-base md:text-lg font-light max-w-lg leading-loose"
            dangerouslySetInnerHTML={{ __html: config.tagline }}
          />
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${config.email}`}
            className="font-sans text-sm text-taupe hover:text-ink transition-colors"
          >
            Email
          </a>
          <span className="text-taupe text-sm" aria-hidden="true">&middot;</span>
          <a
            href={config.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-taupe hover:text-ink transition-colors"
          >
            GitHub
          </a>
          <span className="text-taupe text-sm" aria-hidden="true">&middot;</span>
          <a
            href={config.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-taupe hover:text-ink transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-taupe text-sm" aria-hidden="true">&middot;</span>
          <a
            href={config.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm text-taupe hover:text-ink transition-colors"
          >
            Resume
          </a>
        </div>
      </section>

      {trackLoaded && <CornerWidget track={track} weather={weather} />}
    </>
  );
}

function MusicIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8B7355"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8B7355"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CornerWidget({ track, weather }) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeStr = time.toLocaleTimeString('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div
      className="fixed top-4 right-4 z-50 font-sans bg-background rounded-xl p-4 w-64"
      style={{
        border: '1px solid #8B7355',
        boxShadow: '0 2px 8px 0 rgba(26, 20, 16, 0.08)',
      }}
    >
      {/* Row 1: Music */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MusicIcon />
            <span className="text-taupe text-[10px] tracking-widest uppercase font-medium leading-none">
              {track?.isPlaying ? 'Listening To' : 'Last Listened To'}
            </span>
          </div>
          {track?.isPlaying && (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span
                className="text-[9px] font-semibold tracking-wider uppercase leading-none"
                style={{ color: '#16a34a' }}
              >
                Live
              </span>
            </div>
          )}
        </div>
        <div className="mt-1.5 pl-[17px]">
          {track ? (
            <>
              <p className="text-ink text-xs leading-snug truncate font-medium">
                {track.title}
              </p>
              <p className="text-taupe text-[11px] truncate mt-0.5">{track.artist}</p>
            </>
          ) : (
            <p className="text-taupe text-xs">—</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="my-3" style={{ borderTop: '1px solid #8B7355', opacity: 0.25 }} />

      {/* Row 2: Location */}
      <div>
        <div className="flex items-center gap-1.5">
          <PinIcon />
          <span className="text-taupe text-[10px] tracking-widest uppercase font-medium leading-none">
            Current Location
          </span>
        </div>
        <div className="mt-1.5 pl-[17px]">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-ink text-xs font-medium truncate">
              {weather?.city ?? config.location.city}
            </p>
            {weather && (
              <p className="text-taupe text-[11px] flex-shrink-0">
                {weather.temp}&deg;F &middot; {weather.condition}
              </p>
            )}
          </div>
          <p className="text-taupe text-[11px] mt-0.5 tabular-nums">{timeStr}</p>
        </div>
      </div>
    </div>
  );
}
