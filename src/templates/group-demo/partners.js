import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Components
import Container from '../../components/container'

const PartnersComponent = ({
    title,
    logos,
    cta,
    bgColor
}) => {
    return (
        <Section bgColor={bgColor}>
            <Container
                sm={`
                    grid-row-gap:1.5rem;
                    justify-items:center;
                `}
                lg={`
                    grid-row-gap:3.25rem;
                `}
            >
                <h2 className={`sm:text--3xl lg:text--5xl`}>{title}</h2>
                <List>
                    {logos.map(({
                        title,
                        altText,
                        localFile: {
                            childImageSharp: {
                                fluid
                            }
                        }
                    }, index) => (
                        <ImageWrapper key={index}>
                            <Image
                                fluid={fluid}
                                objectFit={`contain`}
                                alt={altText || title}
                            />
                        </ImageWrapper>
                    ))}
                </List>
                {cta.type === `internal` ? 
                    <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary button--icon sm:text--xl`}>
                        {cta.label}
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                        </svg>
                    </GatsbyLink>
                : cta.type === `external` ?
                    <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary button--icon sm:text--xl`}>
                        {cta.label}
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                        </svg>
                    </a>
                : null}
            </Container>
        </Section>
    )
}

export default PartnersComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:2rem;
    padding-bottom:2.375rem;
    text-align:center;
    @media (min-width:992px) {
        padding-top:4.4375rem;
        padding-bottom:4.4375rem;
    }
`
const List = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
`
const ImageWrapper = styled.div`
    box-shadow:0px 8px 32px rgba(103,117,139,0.15);
    background-color:#fff;
    border-radius:0.25rem;
    width:9.75rem;
    max-width:calc(50% - 1rem);
    height:5.625rem;
    margin:0.5rem;
    padding:0.5rem;
    overflow:hidden;
    @media (min-width:992px) {
        margin:1rem;
        width:10.375rem;
        height:5.9375rem;
        max-width:initial;
    }
`
const Image = styled(GatsbyImage)`
    height: 100%;
    width: 100%;
`   