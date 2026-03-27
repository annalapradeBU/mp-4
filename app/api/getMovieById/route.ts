import { NextResponse } from "next/server";

// / updates the data everytime the page refreshes
export const dynamic = "force-dynamic";

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    try {
        // TMDB endpoint for specific movie details!
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API_KEY}&language=en-US`
        );

        // checks for any bad respinse
        if (res.status !== 200) {
            return NextResponse.json({ error: "Failed to fetch from TMDB" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}