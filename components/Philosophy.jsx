import config from '@/config';

export default function Philosophy() {
  return (
    <div
      aria-hidden="true"
      className="pl-6 py-2"
      style={{ borderLeft: '2px solid #8B7355' }}
    >
      <p className="font-serif text-2xl md:text-3xl text-ink leading-snug">
        {config.philosophy.quote}
      </p>
    </div>
  );
}
