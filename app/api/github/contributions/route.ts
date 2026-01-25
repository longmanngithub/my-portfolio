import { NextResponse } from "next/server"

const query = `
  query($login: String!) {
    user(login: $login) {
      repositories(privacy: PUBLIC) { totalCount }
      followers { totalCount }
      following { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
            }
          }
        }
      }
    }
  }
`

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const login = process.env.GITHUB_LOGIN || "longmanngithub"

  if (!token) {
    return NextResponse.json({ error: "Missing GITHUB_TOKEN" }, { status: 500 })
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login } }),
      cache: "no-store",
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: "GitHub API error", details: text }, { status: res.status })
    }

    const json = await res.json()
    const user = json?.data?.user

    if (!user) {
      return NextResponse.json({ error: "No user data returned" }, { status: 500 })
    }

    const calendar = user.contributionsCollection.contributionCalendar
    const weeks: number[][] = (calendar?.weeks ?? []).map((week: any) =>
      (week?.contributionDays ?? []).map((day: any) => day?.contributionCount ?? 0)
    )

    return NextResponse.json({
      stats: {
        publicRepos: user.repositories?.totalCount ?? 0,
        followers: user.followers?.totalCount ?? 0,
        following: user.following?.totalCount ?? 0,
        totalContributions: calendar?.totalContributions ?? 0,
        weeks,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: "Unexpected error", details: error?.message }, { status: 500 })
  }
}
