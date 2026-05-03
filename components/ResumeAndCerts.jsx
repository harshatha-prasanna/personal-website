import config from '@/config';

export default function ResumeAndCerts() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {config.certs.map((cert) => (
          <CertCard key={cert.title} cert={cert} />
        ))}
      </div>
    </section>
  );
}

function CertCard({ cert }) {
  const inner = (
    <div
      className="flex flex-col gap-1.5 p-5 bg-background rounded-lg h-full"
      style={{ border: '1px solid #8B7355' }}
    >
      <p className="font-sans text-[11px] text-taupe">{cert.issuer}</p>
      <h3 className="font-serif text-lg text-ink leading-snug">{cert.title}</h3>
      <p className="font-sans text-xs text-taupe mt-auto pt-2">{cert.date}</p>
    </div>
  );

  if (cert.url && cert.url !== '#') {
    return (
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-80 transition-opacity"
      >
        {inner}
      </a>
    );
  }

  return <div>{inner}</div>;
}
