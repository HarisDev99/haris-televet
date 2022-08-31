import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import { Link as GatsbyLink } from 'gatsby'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantOne'

const IntroComponent = ({
    subtitle,
    title,
    description,
    cta,
    background,
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:3rem;
                `}
                lg={`
                    align-items:center;
                    grid-template-columns:minmax(0,1fr) minmax(0,1.125fr);
                    grid-column-gap:6.6875rem;
                `}
            >
                    <Header
                        subtitle={subtitle}
                        title={title}
                        description={description}
                    />
                <Background>
                    <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title} objectFit={`contain`}/>
                </Background>
            </Container>
            <Container
                sm={`
                    padding-top:3rem;
                    justify-items: center;
                `}
            >
                {!cta ? null
                    : cta.type === `internal` ? 
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

export default IntroComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    position:relative;
    background-color:${props => props.theme.color.grey[50]};
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Background = styled.div`
    position:relative;
`
const Image = styled(GatsbyImage)`
    margin:0 auto;
    width:100%;
    @media (min-width:992px) {
        max-width:initial;
        height:100%;
        min-height:29.25rem;
    }
`