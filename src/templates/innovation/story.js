import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Components
import Container from '../../components/container'

const StoryComponent = ({
    title,
    description,
    background
}) => {
    return (
        <Sections>
            <Container
                sm={`
                    grid-row-gap:1.5rem;
                `}
                lg={`
                    grid-column-gap:7.25rem;
                    grid-template-columns:repeat(2,minmax(0,1fr));
                    align-items:center;
                `}
            >
                <Header>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                    <Content className={`sm:text--lg`}>{description}</Content>
                </Header>
                <Image fluid={background.localFile.childImageSharp.fluid} alt={background.alt_text || background.title}/>
            </Container>
        </Sections>
    )
}

export default StoryComponent

// Styled Components
const Sections = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    background-color:${props => props.theme.color.grey[50]};
    @media (min-width:992px) {
        padding-top:7.5rem;
        padding-bottom:7.5rem;
    }
`
const Image = styled(GatsbyImage)`
    height: 100%;
    z-index:1;
    border-radius:0.375rem;
    box-shadow:0px 8px 32px rgba(103,117,139,0.15);
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    @media (min-width:992px) {
        grid-row-gap:3rem;
        &.feature__header--secondary {
            grid-column:2/3;
            grid-row:1;
        }
    }
`
const Content = styled.p`
    max-width:30rem;
`