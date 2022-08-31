import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const IntroComponent =  ({
    featured,
    title,
    description
}) => {
    return (
        <Section id="resources">
            <IntroWrapper>
                <Container>
                    <Header>
                        <h1 className="sm:text--3xl lg:text--5xl">{title}</h1>
                        <Content>
                            {parseContent(description)}
                        </Content>
                    </Header>
                </Container>
            </IntroWrapper>
            <FeaturedMediaContainer>
                <FeaturedMediaWrapper>
                    <FeaturedResponsiveContainer>
                        <FeaturedGatsbyImage
                            fixed={featured.background.localFile.childImageSharp.fixed}
                            objectFit={`cover`}
                            style={{
                                height: "100%",
                                width: "100%",
                                position: "absolute"
                            }}
                        />
                        {
                        featured.cta.type === `external` ? 
                            <FeaturedMediaLink aria-label={featured.cta.label} href={featured.cta.linkExternal} target={featured.cta.scopeExternal ? `_Blank` : ``}></FeaturedMediaLink>
                        :
                        featured.cta.type === `internal` ? 
                            <FeaturedMediaLink as={GatsbyLink} to={featured.cta.linkInternal.uri} aria-label={featured.cta.label}></FeaturedMediaLink>
                        : 
                            null
                        }
                    </FeaturedResponsiveContainer>
                </FeaturedMediaWrapper>
            </FeaturedMediaContainer>
            <FeaturedWrapper>
                <Container>
                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 355">
                        <path d="M71.52 21.744C28.954 43.404-8.012 93.546 1.51 133.898c9.521 40.055 65.81 70.319 108.095 113.341 42.286 43.022 70.85 99.099 106.416 106.813 35.565 7.715 78.691-32.934 124.057-75.956 45.647-43.022 94.094-88.714 98.574-138.857 4.481-50.144-35.005-105.034-80.651-126.693C312.354-8.817 260.547 3.05 210.98 5.425 161.133 7.502 113.806.381 71.52 21.744z"/>
                    </Shape>
                    <Featured>
                        <Header>
                            <Wrapper>
                                <h2 className="sm:text--base">{featured.subtitle}</h2>
                                <h3 className="sm:text--2xl lg:text--3xl">{featured.title}</h3>
                            </Wrapper>
                            {
                            featured.cta.type === `external` ? 
                                <CtaButton className="sm:text--xl button button--secondary" href={featured.cta.linkExternal} target={featured.cta.scopeExternal ? `_Blank` : ``}>{featured.cta.label}</CtaButton>
                            :
                            featured.cta.type === `internal` ? 
                                <CtaButton className="sm:text--xl button button--secondary" as={GatsbyLink} to={featured.cta.linkInternal.uri}>{featured.cta.label}</CtaButton>
                            : 
                                <CtaButton className="sm:text--xl button button--secondary" as={GatsbyLink} to={featured.cta.linkInternal.uri}>{featured.cta.label}</CtaButton>
                            }
                        </Header>
                    </Featured>
                </Container>
            </FeaturedWrapper>
        </Section>
    )
}

export default IntroComponent

const Section = styled.section`
    position: relative;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
`
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.25rem;
    margin-bottom:0.5rem;
`
const Shape = styled.svg`
    display:none;
    @media (min-width:992px) {
        display:block;
        position:absolute;
        left: -30rem;
        width: 33rem;
        color:${props => props.theme.color.orange[200]};
        opacity:0.35;
        fill: currentColor;
        z-index:4;
    }
    @media (min-width:1200px) {
        left: calc(50% - 32vw + -30rem);
        width: 29vw;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    max-width:25rem;
    z-index:3;
    position:relative;
    justify-items: start;
`
const FeaturedWrapper = styled.div`
    background-color:${props => props.theme.color.teal[50]};
    padding-top:2rem;
    padding-bottom:2rem;
`
const IntroWrapper = styled.div`
    padding-top:4rem;
    padding-bottom:2rem;
`
const Featured = styled.div`
    @media (min-width:992px) {
        padding-left:5rem;
    }
`
const FeaturedMediaLink = styled.a`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
`
const FeaturedMediaContainer = styled.div`
    position:relative;
    max-width: 30rem;
    width: calc(100% - 3rem);
    margin:0 auto;
    height:100%;
    display:flex;
    align-items:center;
    justify-content: flex-end;
    @media (min-width:992px) {
        max-width:1144px;
        position:absolute;
        top:0;
        left:0;
        right:0;
        padding-top:4rem;
    }
`
const FeaturedMediaWrapper = styled.div`
    z-index:4;
    height: 100%;
    width:100%;
    display:flex;
    align-items:center;
    @media (min-width:992px) {
        max-width:calc(100% - 34rem);
    }
`
const FeaturedResponsiveContainer = styled.div`
    width:100%;
    position:relative;
    padding-top:65%;
    box-shadow: rgba(103,117,139,0.17) 0px 8px 32px;
`
const FeaturedGatsbyImage = styled(GatsbyImage)`
    top:0;
    left:0;
`
const CtaButton = styled.a`
    font-weight:bold;
    background-color:transparent;
    color:#fff;
    cursor:pointer;
`