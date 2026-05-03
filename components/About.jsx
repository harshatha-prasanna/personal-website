import config from '@/config';

export default function About() {
  return (
    <section id="about" className="space-y-5">
      <h2 className="font-serif text-3xl text-ink">About</h2>
      <p className="font-sans text-base text-ink leading-relaxed">
        {config.about.paragraph}
      </p>
      <div className="space-y-4">
        <p className="font-sans text-sm font-medium text-ink">A few things about me</p>
        <div className="space-y-3">
          {config.about.personalFacts.map((fact, i) => (
            <p key={i} className="font-sans text-sm text-taupe border-l border-taupe pl-4">
              {fact}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
