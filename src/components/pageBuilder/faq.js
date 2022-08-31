import React from 'react'
import styled from 'styled-components'


// Components
import Container from '../../components/container'
import Accordion from '../../components/accordion'

const FaqComponent = ({
    title,
    items,
    sectionId
}) => {
    return (
        <Section id={sectionId}>
            <Container
                sm={`
                    grid-row-gap:3rem;
                `}
                lg={`
                    grid-row-gap:4.375rem;
                `}
            >
                <Title className={`sm:text--2xl lg:text--4xl`}>{title}</Title>
                <Accordion
                    items={items}
                />
            </Container>
        </Section>
    )
}

export default FaqComponent

// Styled Components
const Section = styled.section`
        padding-top:5rem;
        padding-bottom:5rem;
`
const Title = styled.h1`
    text-align:center;
`