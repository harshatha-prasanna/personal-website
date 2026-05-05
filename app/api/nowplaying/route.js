import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TRACKS = [
  { title: 'Tell Me', artist: 'The Pursuetist House, Sarah Black, Dishaan', album: 'The Pursuetist House Vol. 1' },
  { title: 'Amsham Pinneyum', artist: 'Aksomaniac, Circle Tone', album: 'Amsham - അംശം' },
  { title: 'Aila Aila', artist: 'A.R. Rahman, Aditya Rao, Natalie Ram, Madhan Karky', album: 'I (Original Motion Picture Soundtrack)' },
  { title: 'STAY HERE 4 LIFE (feat. Brent Faiyaz)', artist: 'A$AP Rocky, Brent Faiyaz', album: "Don't Be Dumb" },
  { title: 'Love Unconditionally', artist: 'JERHELL', album: 'Love Unconditionally' },
  { title: 'New York Nagaram', artist: 'Nilani', album: 'New York Nagaram' },
  { title: 'Mainave Mainave', artist: 'Nilani', album: 'Mainave Mainave' },
  { title: "Madhumitha's love Theme", artist: 'A.R. Rahman', album: 'Jeans (Original Background Score)' },
  { title: 'Sunflower Feelings', artist: 'Kuzu Mellow', album: 'Sunflower Feelings' },
  { title: "I'M ALIVE", artist: 'Tiffany Day', album: "I'M ALIVE" },
  { title: 'Dopamine', artist: 'Marc Wavy', album: 'Dopamine' },
  { title: 'Goodie Bag', artist: 'Still Woozy', album: 'Goodie Bag' },
  { title: 'Sorbet', artist: 'Galdive', album: 'Sorbet' },
  { title: 'LOVE. FEAT. ZACARI.', artist: 'Kendrick Lamar, Zacari', album: 'DAMN.' },
  { title: 'camellia', artist: 'slchld', album: 'camellia' },
  { title: 'The Way Life Goes (feat. Oh Wonder)', artist: 'Lil Uzi Vert, Oh Wonder', album: 'Luv Is Rage 2' },
  { title: 'A Town with an Ocean View', artist: 'Joe Hisaishi', album: "Kiki's Delivery Service Soundtrack Music Collection" },
  { title: 'The Path of the Wind - Acoustic Version', artist: 'Joe Hisaishi', album: 'My Neighbor Totoro Sound Book' },
  { title: 'Midnight', artist: 'Toby Sebastian, Florence Pugh', album: 'Midnight' },
  { title: 'Sharlene', artist: 'Hong Kong Boyfriend', album: 'Sharlene' },
  { title: 'Best Time', artist: 'Brent Faiyaz', album: 'Larger Than Life' },
  { title: 'Forever Yours', artist: 'Brent Faiyaz', album: 'Larger Than Life' },
  { title: 'After Hours', artist: 'Kehlani', album: 'CRASH' },
  { title: 'Self Love (Spider-Man: Across the Spider-Verse)', artist: 'Metro Boomin, Coi Leray', album: 'METRO BOOMIN PRESENTS SPIDER-MAN: ACROSS THE SPIDER-VERSE' },
  { title: 'Unakkul Naane', artist: 'Harris Jayaraj', album: 'Unakkul Naane' },
  { title: 'Something Super Sweet', artist: 'Rory Webley', album: 'Are You Scared Yet?' },
  { title: 'Japanese Pancakes', artist: 'Fran Vasilić', album: 'Retrovizor' },
  { title: 'San Francisco Bae', artist: 'Daehan, Dear Liry', album: 'San Francisco Bae' },
  { title: 'Maybe I', artist: 'Galdive', album: 'Canvas' },
  { title: 'Lotus', artist: 'Osvaldorio, Wiana, Galdive', album: 'Lotus' },
];

function pickTrack(slot) {
  const h = Math.imul(slot, 2654435769) >>> 0;
  return TRACKS[h % TRACKS.length];
}

export async function GET() {
  const pstHour = parseInt(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      hour12: false,
    }),
    10
  );

  const isNightTime = pstHour >= 1 && pstHour < 7;
  const slot = Math.floor(Date.now() / (2 * 60 * 1000));
  const track = pickTrack(slot);

  return NextResponse.json({
    isPlaying: !isNightTime,
    title: track.title,
    artist: track.artist,
    album: track.album,
  });
}
