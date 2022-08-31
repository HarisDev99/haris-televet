import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const AboutComponent = ({
    items,
}) => {
    return (
        items.map(({
            title,
            description,
            background
        }, index) => {
            const idOdd = index % 2

            const sectionClass = idOdd ? `secondary` : `primary`

            return (
                <Section className={`feature__section--${sectionClass}`} key={index}>
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
                        <Header className={`feature__header--${sectionClass}`}>
                            <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                            <Content>
                                {parseContent(description)}
                            </Content>
                        </Header>
                        <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title}/>
                    </Container>
                </Section>
            )
        })
    )
}

export default AboutComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:7.5rem;
        padding-bottom:7.5rem;
    }
    &.feature__section--secondary {
        background-color:${props => props.theme.color.grey[50]};
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
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    max-width:30rem;
`