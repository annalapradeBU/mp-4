"use client";

import Link from "next/link";
import styled from "styled-components";
import { Movie } from "../interfaces/movie";

// --- STYLED COMPONENTS PORTION ---

const StyledLink = styled(Link)`
    text-decoration: none;
    display: block;
`;

const CardWrapper = styled.div`
    border: 4px solid #1A1A1A;
    background: #FFFFFF;
    /* nice little transition back down after hover */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;

    /* nice little hover transisiton (used similar in other classes) and brings out shadow */
    &:hover {
        transform: translate(-4px, -4px);
        box-shadow: 8px 8px 0px #00539C;
    }
`;

const Poster = styled.img`
    width: 100%;
    height: auto;
    border-bottom: 4px solid #1A1A1A;
    filter: grayscale(100%);
    
    /* you wont believe this, explored in other classes, but on hovering on the card, it brings the color back to the image stuff!!! I think its fun and cute */
    ${CardWrapper}:hover & {
        filter: grayscale(0%);
    }
`;

const CardContent = styled.div`
    padding: 1vh;
`;

const MovieTitle = styled.h3`
    font-size: calc(2px + 1.2vw);
    /* make everything BIG */
    text-transform: uppercase;
    margin: 0;
    font-weight: 900;
`;

const ReleaseYear = styled.p`
    font-size: 0.8vh;
    margin-top: 5%;
    font-weight: bold;
    color: #1A1A1A;
`;

// --- COMPONENT ---

export default function MovieCard(movie: Movie) {
    return (
       /*  links it to the card themself for a detail page  */
        <StyledLink href={`/${movie.id}`}>
            <CardWrapper>
                {/* it makes me append the image to a great link since it hates me */}
                <Poster 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                />
                <CardContent>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <ReleaseYear>
                        {/* steal the year from date info */}
                        {movie.release_date?.split('-')[0]}
                    </ReleaseYear>
                </CardContent>
            </CardWrapper>
        </StyledLink>
    );
}