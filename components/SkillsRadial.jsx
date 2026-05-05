'use client';

import config from '@/config';

export default function SkillsRadial() {
  return (
    <section id="skills" className="space-y-5">
      <h2 className="font-serif text-3xl text-ink">Skills</h2>
      <div className="space-y-3">
        {config.skills.map((skill) => (
          <div key={skill.axis} className="flex items-center gap-4">
            <div className="w-36 shrink-0 flex items-center gap-2">
              <span className="font-sans text-sm text-ink">{skill.axis}</span>
              {skill.learning && (
                <span
                  className="font-sans text-[10px] text-taupe px-1.5 py-0.5 rounded-full bg-secondary shrink-0"
                  style={{ border: '1px solid #8B7355' }}
                >
                  learning
                </span>
              )}
            </div>
            <div className="flex-1 h-2 rounded-sm overflow-hidden bg-secondary">
              <div
                className="h-full rounded-sm bg-taupe"
                style={{ width: `${(skill.value / 10) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
