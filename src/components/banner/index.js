import React, { useContext } from 'react'
import styled from 'styled-components'

// Context
import { globalContext } from '../../context/index'

// Layout Components
import Container from '../container'

export default ({
    description = `Telemedicine support during COVID-19`,
    ctaLink = `#`,
    ctaLabel = `Learn more`
}) => {
    const context = useContext(globalContext)

    return (
        <Banner className={!context.banner && `hidden`}>
            <Container>
                <Wrapper>
                    <Close
                        aria-label="Close Primary Navigation Menu"
                        onClick={() => context.toggleBanner(false)}
                    >
                        <CloseIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                            <path fillRule="evenodd" d="M15.736 17.536a1.273 1.273 0 001.8-1.8L10.8 9l6.736-6.736a1.273 1.273 0 00-1.8-1.8L9 7.2 2.264.464a1.273 1.273 0 00-1.8 1.8L7.2 9 .464 15.736a1.273 1.273 0 101.8 1.8L9 10.8l6.736 6.736z" clipRule="evenodd"/>
                        </CloseIcon>
                    </Close>
                    <Description>{description}</Description>
                    <Link href={ctaLink}>{ctaLabel}</Link>
                </Wrapper>
            </Container>
        </Banner>
    )
}

// Styled Components
const Banner = styled.div`
    display:none;
    @media (min-width:992px) {
        display:flex;
        height: 3rem;
        width: 100%;
        position: relative;
        background-color: ${props => props.theme.color.grey[800]};
        z-index:8;
        align-items:center;
        &.hidden {
            display:none;
        }
    }
`
const Wrapper = styled.div`
    display:grid;
    align-items:center;
    flex-wrap:wrap;
    grid-template-columns:repeat(3, minmax(0,max-content));
    grid-column-gap:1rem;
`
const Close = styled.button`
    cursor: pointer;
    background-color:transparent;
    padding:0;
    display: block;
    height:1rem;
    width:1rem;
`
const CloseIcon = styled.svg`
    fill:#fff;
    width: 100%;
    height: 100%;
`
const Description = styled.p`
    color:#fff;
`
const Link = styled.a`
    display:flex;
    font-weight:500;
    color:#fff;
    text-decoration:underline;
`