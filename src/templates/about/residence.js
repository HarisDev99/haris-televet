import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantSix'

const ResidenceComponent = ({
    title,
    description,
    items
}) => {
    return (
        <Section>
            <Container 
                sm={`
                    grid-row-gap:4rem;
                `}
                lg={`
                    grid-row-gap:6.5rem;
                `}
            >
                <Header
                    title={title}
                    description={description}
                />
                    <Row>
                        {items.map(({
                            title,
                            description,
                            icon
                        }, index) => (
                            <Column key={index}>
                                <Image
                                    fixed={icon.localFile.childImageSharp.fixed}
                                    alt={icon.altText || icon.title}
                                />
                                <h3 className={`sm:text--xl`}>{title}</h3>
                                {description && <p className={`sm:text--base`}>{description}</p>}
                            </Column>
                        ))}
                    </Row>
            </Container>
        </Section>
    )
}

export default ResidenceComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-bottom:6.25rem;
        padding-top:5rem;
    }
`
const Row = styled.div`
    display: grid;
    grid-template-columns: minmax(0,1fr);
    justify-content: space-between;
    grid-row-gap: 3.875rem;
    @media (min-width:992px) {
        align-items: start;
        grid-column-gap: 4.5rem;
        grid-template-columns: repeat(3,minmax(0,max-content));
    }
`
const Column = styled.div`
    display: grid;
    grid-template-columns: minmax(0,1fr);
    grid-row-gap: 1rem;
    text-align: center;
    justify-items: center;
`
const Image = styled(GatsbyImage)`
    border-radius:50%;
`