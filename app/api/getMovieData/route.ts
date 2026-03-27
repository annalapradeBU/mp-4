
import {NextResponse} from "next/server";

// force dynamic ensures fresh search results
export const dynamic = "force-dynamic";

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

export async function GET(request:Request): Promise<NextResponse>{

    // extract search params using String-deconstruction
    const {searchParams} = new URL(request.url);

    // get value of the 'movie' parameter from query string
    const movieName = searchParams.get("query");

    // check if the user actually typed in a movie name
    if (!movieName) {
        return NextResponse.json({ error: "No movie query provided" }, { status: 400 });
    }

    try {
        // fetch from TMDb
        // use the 'search/movie' endpoint to find films by title
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&api_key=${MOVIE_API_KEY}&language=en-US&page=1&include_adult=false`
        );

        // check if TMDB responded and well
        if (res.status !== 200) {
            return NextResponse.json({ error: "Failed to fetch data from TMDB" }, { status: res.status });
        }

        const data = await res.json();

        // return the movie results back to frontend
        return NextResponse.json(data);

    } catch (err) {
        // handle unexpected network errors
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}



