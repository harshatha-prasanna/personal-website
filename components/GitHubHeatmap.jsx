'use client';

import { useEffect, useState } from 'react';
import config from '@/config';

const LEVEL_COLORS = ['#E8E0D0', '#D1C5B1', '#BAA992', '#A38E74', '#8B7355'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function groupIntoWeeks(contributions) {
  if (!contributions.length) return [];
  const firstDate = new Date(contributions[0].date + 'T12:00:00');
  const startPad = firstDate.getDay();
  const flat = [...Array(startPad).fill(null), ...contributions];
  while (flat.length % 7 !== 0) flat.push(null);
  const weeks = [];
  for (let i = 0; i < flat.length; i += 7) {
    weeks.push(flat.slice(i, i + 7));
  }
  return weeks;
}

function monthLabel(week, index) {
  const first = week.find(d => d !== null);
  if (!first) return '';
  const date = new Date(first.date + 'T12:00:00');
  if (index === 0 || date.getDate() <= 7) return MONTH_NAMES[date.getMonth()];
  return '';
}

export default function GitHubHeatmap() {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/github-heatmap')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        const contributions = data.contributions ?? [];
        setTotal(data.total ?? contributions.reduce((sum, d) => sum + d.count, 0));
        setWeeks(groupIntoWeeks(contributions));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="activity" className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-serif text-3xl text-ink">
          <a
            href={config.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-taupe transition-colors"
          >
            Activity
          </a>
        </h2>
        <p className="font-sans text-sm text-taupe">GitHub Commit Activity</p>
      </div>
      {loading ? (
        <div className="h-24 bg-secondary rounded animate-pulse" />
      ) : error ? (
        <p className="font-sans text-sm text-taupe">Activity unavailable right now.</p>
      ) : (
        <div>
          <p className="font-sans text-sm mb-4" style={{ color: '#8B7355' }}>
            {total} contribution{total !== 1 ? 's' : ''} in the last year
          </p>
          <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '4px', width: 'max-content' }}>
              {weeks.map((week, i) => (
                <div
                  key={i}
                  style={{
                    width: '10px',
                    flexShrink: 0,
                    fontSize: '9px',
                    lineHeight: '12px',
                    color: '#8B7355',
                    fontFamily: 'var(--font-sans), sans-serif',
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                  }}
                >
                  {monthLabel(week, i)}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '2px', width: 'max-content' }}>
              {weeks.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={
                        day
                          ? `${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`
                          : undefined
                      }
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '2px',
                        backgroundColor: day ? LEVEL_COLORS[day.level] : 'transparent',
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
