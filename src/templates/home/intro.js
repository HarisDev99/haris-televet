import React from 'react'
import styled from 'styled-components'
// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantSeven'
import Calculator from './calculator'

const IntroComponent = ({
    subtitle,
    title,
    description,
    ctaGroup,
    reviews,
    calculator
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
                <Header
                    subtitle={subtitle}
                    title={title}
                    description={description}
                    ctaGroup={ctaGroup}
                />
                <Calculator
                    title={calculator.title}
                    cta={calculator.cta}
                    fields={calculator.fields}
                    disclaimer={calculator.disclaimer}
                />
            </Container>
        </Section>
    )
}

export default IntroComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    position:relative;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`