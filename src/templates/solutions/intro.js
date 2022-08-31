import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Layout Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const IntroComponent = ({
    subtitle,
    title,
    description,
    background
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
                <Header>
                    <Subtitle className={`sm:text--base`}>{subtitle}</Subtitle>
                    <h1 className="sm:text--3xl lg:text--6xl">{title}</h1>
                    <Content>
                        {parseContent(description)}
                    </Content>
                </Header>
                <Background>
                    <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title}/>
                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 355">
                        <path d="M71.52 21.744C28.954 43.404-8.012 93.546 1.51 133.898c9.521 40.055 65.81 70.319 108.095 113.341 42.286 43.022 70.85 99.099 106.416 106.813 35.565 7.715 78.691-32.934 124.057-75.956 45.647-43.022 94.094-88.714 98.574-138.857 4.481-50.144-35.005-105.034-80.651-126.693C312.354-8.817 260.547 3.05 210.98 5.425 161.133 7.502 113.806.381 71.52 21.744z"/>
                    </Shape>
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
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Subtitle = styled.span`
    font-weight:bold;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Background = styled.div`
    position:relative;
`
const Image = styled(GatsbyImage)`
    border-top-right-radius:2rem;
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
    fill:${props => props.theme.color.teal[100]};
    position:absolute;
    bottom:-3rem;
    left:-1.25rem;
    width:14rem;
    @media (min-width:992px) {
        width:27.5rem;
        left:-5.625rem;
        bottom:-5.625rem;
    }
`