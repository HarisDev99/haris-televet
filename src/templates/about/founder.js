import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Layout Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const FoundersComponent = ({
    title,
    description,
    background
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2rem;
                `}
                lg={`
                    align-items:start;
                    grid-template-columns:minmax(0,30rem) minmax(0,1fr);
                    grid-column-gap:7.875rem;
                `}
            >
                <Background>
                    <Image
                        fluid={background.localFile.childImageSharp.fluid}
                        alt={background.altText || background.title}
                        objectFit={`contain`}
                        objectPosition={`0 0`}
                    />
                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 369">
                        <path d="M8.52 45.754c-21.494 39.568 2.888 105.42 16.041 152.787 12.833 47.367 14.437 75.961 26.307 103.688 11.87 27.727 34.006 54.587 62.88 63.252 28.552 8.376 64.162-1.155 116.775-3.466 52.614-2.022 122.23 3.466 163.936-23.683 41.706-27.439 55.18-87.514 35.931-134.881-19.249-47.367-71.22-82.314-120.947-117.55-49.405-35.237-96.564-71.051-153.99-82.027C98.028-7.39 30.336 5.896 8.521 45.754z"/>
                    </Shape>
                </Background>
                <Header>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                    <Content>
                        {parseContent(description)}
                    </Content>
                </Header>
            </Container>
        </Section>
    )
}

export default FoundersComponent

// Styled Components
const Section = styled.section`
    padding-top:3.75rem;
    padding-bottom:3.75rem;
    @media (min-width:992px) {
        padding-top:5.625rem;
        padding-bottom:5.625rem;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    justify-items:center;
    text-align:center;
    @media (min-width:992px) {
        justify-items:start;
        text-align:left;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    max-width:22.5rem;
`
const Image = styled(GatsbyImage)`
    margin: 0 auto;
    width: calc(100% - 1.5rem);
    border-top-right-radius:2rem;
    @media(min-width:992px) {
        width:100%;
    }
`
const Background = styled.div`
    position:relative;
    padding-bottom:1.25rem;
    @media(min-width:992px) {
        padding-bottom:2.25rem;
    }
`
const Shape = styled.svg`
    z-index:-1;
    position:absolute;
    fill:${props => props.theme.color.green[200]};
    left:-1.25rem;
    bottom: 0;
    width: 16.25rem;
    @media (min-width:992px) {
        width:27.5rem;
        left:-2.25rem;
    }
`