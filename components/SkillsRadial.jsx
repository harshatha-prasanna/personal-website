'use client';

import config from '@/config';

const learningNote =
  "Always a work in progress. These numbers reflect where I am today, not where I am going.";

export default function SkillsRadial() {
  return (
    <section id="skills" className="space-y-5">
      <h2 className="font-serif text-3xl text-ink">Skills</h2>
      <div className="space-y-3">
        {config.skills.map((skill) => (
          <div key={skill.axis} className="flex items-center gap-4">
            <span className="font-sans text-sm text-ink w-36 shrink-0">{skill.axis}</span>
            <div className="flex-1 h-2 rounded-sm overflow-hidden bg-secondary">
              <div
                className="h-full rounded-sm bg-taupe"
                style={{ width: `${(skill.value / 10) * 100}%` }}
              />
            </div>
            <span className="font-sans text-sm text-taupe w-4 text-right shrink-0">
              {skill.value}
            </span>
          </div>
        ))}
      </div>
      <p className="font-sans text-xs italic text-taupe">{learningNote}</p>
    </section>
  );
}
