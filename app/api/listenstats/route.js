import { NextResponse } from 'next/server';

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

// Last.fm does not include track duration in getrecenttracks.
// We get the total scrobble count for the year via @attr.total and
// multiply by a 3.5-minute average to estimate hours.
const AVG_TRACK_MINUTES = 3.5;

export async function GET() {
  if (!API_KEY || !USERNAME) {
    return NextResponse.json({ error: 'Missing env vars.' }, { status: 500 });
  }

  const now = Math.floor(Date.now() / 1000);
  const startOfYear = Math.floor(new Date(new Date().getFullYear(), 0, 1).getTime() / 1000);

  try {
    const url =
      `${BASE_URL}?method=user.getrecenttracks` +
      `&user=${encodeURIComponent(USERNAME)}` +
      `&api_key=${API_KEY}` +
      `&format=json` +
      `&from=${startOfYear}` +
      `&to=${now}` +
      `&limit=1`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) throw new Error(`Last.fm error: ${res.status}`);

    const data = await res.json();
    const total = parseInt(data.recenttracks?.['@attr']?.total ?? '0', 10);
    const hours = Math.round((total * AVG_TRACK_MINUTES) / 60);

    return NextResponse.json({ hours, scrobbles: total });
  } catch (err) {
    console.error('[listenstats route]', err.message);
    return NextResponse.json({ error: 'Failed to fetch stats.' }, { status: 500 });
  }
}
