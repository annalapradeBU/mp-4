"use client";

import { useState } from "react";
import Link from "next/link"; // Replaced useRouter
import styled from "styled-components";

// --- STYLED COMPONENTS ---

const BauhausWrapper = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #F4F4F4;
    font-family: 'Courier New', Courier, monospace;
    color: #1A1A1A;
`;

const ContentBox = styled.div`
    border: 4px solid #1A1A1A;
    padding: 3vh;
    background: #FFFFFF;
    box-shadow: 12px 12px 0px #1A1A1A;
    max-width: 500px;
    width: 90%;
`;

const Title = styled.h1`
    font-size: calc(2px + 3vw);
    font-weight: 900;
    margin-bottom: 2vh;
    text-transform: uppercase;
    line-height: 1;
    border-left: 10px solid #E30613;
    padding-left: 1vh;
`;

const Subtitle = styled.p`
    font-size: calc(2px + 1vw);
    font-weight: 400;
    margin-bottom: 2vh;
    margin-top: -1.5vh;
    text-transform: uppercase;
    color: #00539C;
    letter-spacing: 1px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1vh;
`;

const Input = styled.input`
    border: 2px solid #1A1A1A;
    padding: 1vh;
    font-size: calc(2px + 1.2vw);
    outline: none;
    background: #FFD500;
    font-family: inherit;
    text-transform: uppercase;

    &::placeholder {
        color: rgba(26, 26, 26, 0.6);
        font-weight: bold;
    }

    &:focus {
        background: #FFFFFF;
    }
`;

// Changed from button to 'a' styled-component to work with Link
const StyledSearchLink = styled(Link)`
    background: #00539C;
    color: #FFFFFF;
    border: 2px solid #1A1A1A;
    padding: 1vh;
    font-weight: bold;
    text-transform: uppercase;
    font-family: inherit;
    text-align: center;
    text-decoration: none;
    transition: all 0.2s ease;
    
    &:hover {
        background: #1A1A1A;
        transform: translate(-2px, -2px);
        box-shadow: 4px 4px 0px #E30613;
    }

    &:active {
        transform: translate(0, 0);
        box-shadow: none;
    }
`;

// --- PAGE COMPONENT ---

export default function Home() {
    const [input, setInput] = useState("");

    return (
        <BauhausWrapper>
            <ContentBox>
                <Title>FILM<br/>INDEX</Title>
                <Subtitle>An archive of cinematic works</Subtitle>

                <Form onSubmit={(e) => e.preventDefault()}>
                    {/* search bar, put the text in the box when it's typed */}
                    <Input 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        placeholder="INPUT TITLE..." 
                    />
                    {/* The Link generates the URL dynamically based on the state */}
                    <StyledSearchLink href={`/search?query=${encodeURIComponent(input)}`}>
                        SEARCH
                    </StyledSearchLink>
                </Form>
            </ContentBox>
        </BauhausWrapper>
    );
}