import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Layout Components
import Container from '../container'

// Components
import Header from '../title/variantOne'

const HeaderCtaShapeBgComponent = ({
    subtitle = `Features and Benefits`,
    title = `The most trusted solution in veterinary telemedicine.`,
    description = `Built with the veterinarian-patient relationship in mind, seamlessly integrate into your current practice and effortlessly connect with pet owners.`,
    cta,
    background,
    sectionId,
}) => {
    return (
        <Section id={sectionId}>
            <Container
                sm={`
                    grid-row-gap:3rem;
                `}
                lg={`
                    align-items:start;
                    grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);
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
                    <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title}/>
                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469 452">
                        <path d="M85.804 30.59C44.94 60.24 21.317 112.816 8.548 169.06c-12.45 55.938-14.047 115.851 14.046 156.506 27.774 40.655 85.556 62.358 145.254 86.506 59.698 24.149 121.311 51.048 166.004 35.153 44.694-16.201 72.787-75.502 97.687-129.912 24.582-54.411 46.29-104.236 33.84-144.279-12.451-39.738-59.06-69.695-101.838-99.04-42.778-29.344-81.725-58.078-130.249-69.082C184.768-6.092 126.666.939 85.804 30.59z"/>
                    </Shape>
                </Background>
            </Container>
        </Section>
    )
}

export default HeaderCtaShapeBgComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:3.75rem;
    @media (min-width:992px) {
        padding-top:4.25rem;
        padding-bottom:6.625rem;
    }
`
const Background = styled.div`
    position:relative;
    padding-top:1.75rem;
    @media (min-width:992px) {
        padding-top:3.25rem;
    }
`
const Image = styled(GatsbyImage)`
    border-bottom-left-radius:2rem;
    box-shadow: 0px 8px 32px rgba(103, 117, 139, 0.15);
    margin:0 auto;
    width:calc(100% - 1.5rem);
    @media (min-width:992px) {
        max-width:initial;
        height:100%;
        min-height:29.25rem;
    }
`
const Shape = styled.svg`
    z-index:-1;
    fill:${props => props.theme.color.pink[200]};
    position:absolute;
    top:0;
    right:-1.25rem;
    width:16.25rem;
    @media (min-width:992px) {
        width:27.5rem;
        right:-2.5rem;
    }
`