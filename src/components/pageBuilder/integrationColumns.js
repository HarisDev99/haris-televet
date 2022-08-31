import React from 'react'
import styled from 'styled-components'
import GatbsbyImage from 'gatsby-image/withIEPolyfill'
import { Link as GatsbyLink } from 'gatsby'

// Components
import Container from '../../components/container'

const IntegrationColumnsComponent = ({
    posts,
    clickable
}) => {
    return (
        <Section>
            <Container>
                <Row>
                    {posts.map(({
                        title,
                        slug,
                        integrationPostBuilder: {
                            integrationPostLogo: background
                        }
                    }, index) => (
                        <Wrapper key={index}>
                            <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title} objectFit={`contain`} />
                            {clickable && <Link as={GatsbyLink} aria-label={`Discover more about: ${title}`} to={`/integrations/${slug}`}></Link>}
                        </Wrapper>
                    ))}
                </Row>
            </Container>
        </Section>
    )
}

export default IntegrationColumnsComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Row = styled.div`
    display:grid;
    grid-template-columns:repeat(2, minmax(0,1fr));
    grid-column-gap:1rem;
    grid-row-gap:1rem;
    @media (min-width:992px) {
        grid-column-gap:3rem;
        grid-row-gap:3rem;
        grid-template-columns:repeat(4, minmax(0,1fr));
    }
`

const Wrapper = styled.div`
    position:relative;
    border-radius: 0.5rem;
    box-shadow:0px 8px 20px rgba(103,117,139,0.10);
    background-color:#fff;
    overflow:hidden;
    padding:1rem;
    width: 100%;
    display: grid;
    align-items: center;
    height:8rem;
    top:0;
    transition: all .2s;
    @media (min-width:992px) {
        height:9rem;
        box-shadow:0px 8px 32px rgba(103,117,139,0.15);
        &:hover {
            top:-5px;
            box-shadow:0px 10px 38px rgba(103,117,139,0.15);
        }
    }
`
const Image = styled(GatbsbyImage)`
    width:100%;
    height:100%;
`

const Link = styled.a`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
`