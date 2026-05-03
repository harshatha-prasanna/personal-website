'use client';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import config from '@/config';

export default function SkillsRadial() {
  return (
    <section id="skills" className="space-y-5">
      <h2 className="font-serif text-3xl text-ink">Skills</h2>
      <ResponsiveContainer width="100%" height={340}>
        <RadarChart data={config.skills} cx="50%" cy="50%">
          <PolarGrid stroke="#E8E0D0" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: '#1A1410', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}
          />
          <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            dataKey="value"
            stroke="#8B7355"
            strokeWidth={1.5}
            fill="#8B7355"
            fillOpacity={0.15}
            dot={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </section>
  );
}
