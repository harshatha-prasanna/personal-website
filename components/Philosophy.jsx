import config from '@/config';

export default function Philosophy() {
  return (
    <div aria-hidden="true" className="space-y-5">
      <h2 className="font-serif text-3xl text-ink">Philosophy</h2>
      <div
        className="pl-6 py-2"
        style={{ borderLeft: '2px solid #8B7355' }}
      >
      <p className="font-quote italic text-xl md:text-2xl text-ink leading-snug">
        &ldquo;{config.philosophy.quote}&rdquo;
      </p>
      </div>
    </div>
  );
}
