import { NextResponse } from 'next/server';

const GRAPHQL_URL = 'https://api.github.com/graphql';

const QUERY = `
  query {
    viewer {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token || token === 'your_classic_token_here') {
    return NextResponse.json({ contributions: [], total: 0 });
  }

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GitHub GraphQL ${res.status}`);

    const { data, errors } = await res.json();
    if (errors?.length) throw new Error(errors[0].message);

    const calendar = data.viewer.contributionsCollection.contributionCalendar;

    const contributions = calendar.weeks.flatMap(w =>
      w.contributionDays.map(d => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      }))
    );

    return NextResponse.json({ contributions, total: calendar.totalContributions });
  } catch (err) {
    console.error('[github-heatmap route]', err.message);
    return NextResponse.json({ contributions: [], total: 0 });
  }
}
