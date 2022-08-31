import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

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
                    cta={cta}
                />
                <Background>
                    <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title} objectFit={`contain`}/>
                </Background>
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