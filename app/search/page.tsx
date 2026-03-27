"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import MovieCard from "../components/movieCard";
import { Movie } from "../interfaces/movie";
import styled from "styled-components";
import useSWR from 'swr';

// --- STYLED COMPONENTS PORTION ---

const PageWrapper = styled.div`
    background-color: #F4F4F4;
    min-height: 100vh;
    font-family: 'Courier New', Courier, monospace;
`;

const Header = styled.header`
    border-bottom: 8px solid #1A1A1A;
    padding: 2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #FFFFFF;
`;

const SearchTitle = styled.h2`
    text-transform: uppercase;
    font-weight: 900;
    margin: 0;
    span {
        background-color: #FFD500;
        padding: 0 10px;
    }
`;

const ResultsContainer = styled.div`
    display: grid;
    /* to help format my grid https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns */
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 0; 
    border-left: 4px solid #1A1A1A;
    border-top: 4px solid #1A1A1A;
`;

// uses props to change color dynamically
const StatusMessage = styled.div<{ $variant?: 'error' | 'loading' }>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: calc(2px + 2vw);
    font-weight: bold;
    text-transform: uppercase;
    /* blue if loading, red if not */
    color: ${props => props.$variant === 'loading' ? '#00539C' : '#E30613'};
`;

const NavButton = styled.button`
    background-color: #FFD500;
    color: #1A1A1A;
    border: 4px solid #1A1A1A;
    padding: 10px 20px;
    /* make the font thick */
    font-weight: 900;
    text-transform: uppercase;
    /* change cursor to make more clear when hovering*/
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 10px;

    /* let's go hover animations! (still learned in other classes) */
    &:hover {
        background-color: #1A1A1A;
        color: #FFFFFF;
        transform: translate(-4px, -4px);
        box-shadow: 4px 4px 0px #E30613;
    }
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 2vh;
`;

// kind of like a logo, idk. I feel like it fits.
const RedAccentBox = styled.div`
    width: 5vh;
    height: 5vh;
    background: #E30613;
    border: 4px solid #1A1A1A;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

// --- PAGE COMPONENT ---

export default function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");


    const { data, error, isLoading } = useSWR(
        // check if parameters actually exist
        query ? `/api/getMovieData?query=${query}` : null, 
        
        (url: string) => fetch(url).then((res) => res.json())
    );

    if (error) return (
        <PageWrapper>
             <StatusMessage $variant="error">Error_System_Failure</StatusMessage>
        </PageWrapper>
    );

    if (isLoading) return (
        <PageWrapper>
            <StatusMessage $variant="loading">Processing_Data...</StatusMessage>
        </PageWrapper>
    );

    // either movies or empty array
    const movies = data?.results || [];

    return (
        <PageWrapper>
            <Header>
                <SearchTitle>Results_For: <span>{query}</span></SearchTitle>
                
                <HeaderActions>
                    <StyledLink href="/">
                        <NavButton>[←] NEW_SEARCH</NavButton>
                    </StyledLink>
                    <RedAccentBox />
                </HeaderActions>
            </Header>
            
            <ResultsContainer>
                {/* if more than 0 movies */}
                {movies.length > 0 ? (
                    // map the movies to card info
                    movies.map((movie: Movie) => (
                        
                        <MovieCard key={movie.id} {...movie} />
                    ))
                ) : (
                    <StatusMessage>NO_MATCHES_FOUND or empty search query</StatusMessage>
                )}
            </ResultsContainer>
        </PageWrapper>
    );
}