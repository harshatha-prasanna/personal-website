import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const LAT = process.env.WEATHER_LAT ?? '32.7157';
const LON = process.env.WEATHER_LON ?? '-117.1611';

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: 'OPENWEATHER_API_KEY not set.' }, { status: 500 });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=imperial`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[weather route] OpenWeather ${res.status}:`, body);
      throw new Error(`OpenWeather request failed: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      city: data.name,
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
    });
  } catch (err) {
    console.error('[weather route]', err.message);
    return NextResponse.json({ error: 'Failed to fetch weather data.' }, { status: 500 });
  }
}
