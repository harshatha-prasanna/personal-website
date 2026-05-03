import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_KEY = process.env.LASTFM_API_KEY;
const USERNAME = process.env.LASTFM_USERNAME;
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export async function GET() {
  if (!API_KEY || !USERNAME) {
    return NextResponse.json(
      { error: 'LASTFM_API_KEY or LASTFM_USERNAME not set.' },
      { status: 500 }
    );
  }

  try {
    const url =
      `${BASE_URL}?method=user.getrecenttracks` +
      `&user=${encodeURIComponent(USERNAME)}` +
      `&api_key=${API_KEY}` +
      `&format=json` +
      `&limit=1`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`Last.fm request failed: ${res.status}`);
    }

    const data = await res.json();
    const tracks = data.recenttracks?.track;

    if (!tracks || (Array.isArray(tracks) && tracks.length === 0)) {
      return NextResponse.json({ isPlaying: false });
    }

    // Last.fm returns an array when limit > 1, but a single object when limit=1
    // and nothing is cached. Handle both shapes.
    const track = Array.isArray(tracks) ? tracks[0] : tracks;
    const isPlaying = track['@attr']?.nowplaying === 'true';

    return NextResponse.json({
      isPlaying,
      title: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
    });
  } catch (err) {
    console.error('[nowplaying route]', err.message);
    return NextResponse.json(
      { error: 'Failed to fetch now playing data.' },
      { status: 500 }
    );
  }
}
