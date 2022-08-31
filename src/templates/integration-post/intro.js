import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import GatbyImage from 'gatsby-image/withIEPolyfill'

// Utils
import parseContent from '../../utils/parseContent'

// Components
import Container from '../../components/container'

const IntroComponent = ({
    logo,
    title,
    description,
    cta
}) => {
    return (
        <Section>
            <Container>
                <Header>
                    <Logo fluid={logo.localFile.childImageSharp.fluid} alt={logo.altText || logo.title} objectFit={`contain`} />
                    <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
                    <Content>
                        {parseContent(description)}
                    </Content>
                    {cta.type === `internal` ?
                        <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary sm:text--xl`}>
                            {cta.label}
                        </GatsbyLink>
                    : cta.type === `external` ?
                        <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary sm:text--xl`}>
                            {cta.label}
                        </a>
                    : null
                    }
                </Header>
            </Container>
        </Section>
    )
}

export default IntroComponent

// Styled Components
const Section = styled.div`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-bottom:5rem;
        padding-top:5rem;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    text-align:center;
    justify-items:center;
    margin:0 auto;
    max-width:65rem;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
`
const Logo = styled(GatbyImage)`
    width:250px;
`