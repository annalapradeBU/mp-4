"use client";

import { useParams } from "next/navigation";
import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";

// --- STYLED COMPONENTS PORTION ---

const PageWrapper = styled.div`
    background-color: #F4F4F4;
    min-height: 100vh;
    /* more bauhaus-y font :) */
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    border-bottom: 8px solid #1A1A1A;
    padding: 2vh;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProjectIndex = styled.div`
    font-weight: 900;
`;

const MainContent = styled.main`
    display: flex;
    flex-direction: row;
    gap: 0;
    

    /* just so screen is a little more responsive, stacks content when screen small */
    @media (max-width: 750px) {
        flex-direction: column;
    }
`;

const PosterSection = styled.div`
    flex: 1;
    border-right: 8px solid #1A1A1A;
    background: #1A1A1A;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MoviePoster = styled.img`
    width: 100%;
    height: auto;
    /* i thought it would be a cool hover detail */
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/filter */
    filter: grayscale(20%);
`;

const DetailSection = styled.div`
    padding: 3vh;
    display: flex;
    flex-direction: column;
    gap: 1.5vh;
`;

const MovieTitle = styled.h1`
    font-size: calc(2px + 4vw);
    font-weight: 900;
    text-transform: uppercase;
    margin: 0;
    color: #1A1A1A;
    border-left: 15px solid #E30613;
    padding-left: 1.5vh;
`;

const Tagline = styled.p`
    font-size: calc(2px + 1.2vw);
    font-weight: bold;
    text-transform: uppercase;
    background: #FFD500;
    color: #1A1A1A;
    padding: 5px 15px;
    /* wide as content inside requires */
    /* https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/fit-content */
    width: fit-content;
`;

const Overview = styled.p`
    font-size: calc(2px + 1.1vw);
    border-top: 4px solid #1A1A1A;
    padding-top: 1.5vh;
`;

const InfoGrid = styled.div`
    display: grid;
    gap: 1vh;
    margin-top: auto;
`;

const InfoBox = styled.div`
    border: 4px solid #1A1A1A;
    padding: 1vh;
    background: #FFFFFF;
    
    label {
        display: block;
        font-size: calc(2px + 0.7vw);
        font-weight: 900;
        text-transform: uppercase;
        margin-bottom: 5px;
        color: #00539C;
    }
    
    span {
        font-size: calc(2px + 1.1vw);
        font-weight: bold;
    }
`;

const BackButton = styled.button`
    background-color: #FFD500;
    border: 4px solid #1A1A1A;
    padding: 10px 20px;
    font-family: inherit;
    font-weight: 900;
    text-transform: uppercase;
    /* just lets you specify what it looks like on click/hover, used in classes past */
    cursor: pointer;

    /* mmm hover for more interactivity/intuiitivness */
    &:hover {
        background: #1A1A1A;
        color: #FFFFFF;
    }
`;

// --- PAGE COMPONENT ---

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
});

export default function MovieDetail() {
    const { id } = useParams();
    
    // similar to the example mp-4 tee hee

    const { data: movie, error } = useSWR(
        id ? `/api/getMovieById?id=${id}` : null, 
        (url: string) => fetch(url).then((res) => res.json())
    );

    // figure out if its loading (have used in other courses to show something while loading instead of blankness)
    const isLoading = !movie && !error;

    if (isLoading) return <PageWrapper>LOADING_ASSETS...</PageWrapper>;
    // shows if there's actually nothing found
    if (!movie) return <PageWrapper>FILE_NOT_FOUND</PageWrapper>;

    return (
        <PageWrapper>
            <Header>
                <ProjectIndex>PROJECT_INDEX // {id}</ProjectIndex>
                <Link href="/">
                    <BackButton>[←] RETURN</BackButton>
                </Link>
            </Header>

            <MainContent>
                <PosterSection>
                    <MoviePoster 
                        // gotta append the stuff from the API for this one for some reason
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                        alt={movie.title}
                    />
                </PosterSection>

                <DetailSection>
                    <MovieTitle>{movie.title}</MovieTitle>
                    {movie.tagline && <Tagline>{movie.tagline}</Tagline>}
                    
                    <Overview>{movie.overview}</Overview>

                    <InfoGrid>
                        <InfoBox>
                            <label>Release_Date</label>
                            <span>{movie.release_date}</span>
                        </InfoBox>
                        <InfoBox>
                            <label>Rating_Score</label>
                            <span>{movie.vote_average} / 10</span>
                        </InfoBox>
                        <InfoBox>
                            <label>Runtime_Minutes</label>
                            <span>{movie.runtime} MIN</span>
                        </InfoBox>
                        <InfoBox>
                            <label>Primary_Genre</label>
                            {/* genre or nothing */}
                            <span>{movie.genres?.[0]?.name || "N/A"}</span>
                        </InfoBox>
                    </InfoGrid>
                </DetailSection>
            </MainContent>
        </PageWrapper>
    );
}