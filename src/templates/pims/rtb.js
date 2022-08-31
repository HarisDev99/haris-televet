import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Utils
import parseContent from '../../utils/parseContent'

// Components
import Container from '../../components/container'

const RtbComponent = ({
    title,
    description,
    background
}) => {
    return (
        <Section>
            <Container>
                <Wrapper>
                    <Header>
                        <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                        <Content>
                            {parseContent(description)}
                        </Content>
                    </Header>
                    <Image
                        fluid={background.localFile.childImageSharp.fluid}
                        alt={background.altText || background.title}
                    />
                </Wrapper>
            </Container>
        </Section>
    )
}

export default RtbComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    position:relative;
    overflow:hidden;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Wrapper = styled.div`
    max-width:50rem;
    margin:0 auto;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:4rem;
`
const Header = styled.header`
    text-align:center;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    justify-items:center;
    grid-row-gap:1.5rem;
`
const Content = styled.div`
    max-width:42rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Image = styled(GatsbyImage)`
    width:100%;
`