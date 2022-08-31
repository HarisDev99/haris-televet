import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantFour'

const IntroComponent = ({
    title = `Careers`,
    description = `We're looking for people who will make our culture and technology even better. If that sounds like you, check out our job openings below!`
}) => {
    return (
        <Section>
            <Container>
                <Header
                    title={title}
                    description={description}
                />
            </Container>
        </Section>
    )
}

export default IntroComponent

// Styled Components
const Section = styled.section`
    background-color: ${props => props.theme.color.teal[50]};
    padding-top:2.5rem;
    padding-bottom:6.625rem;
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:7.5rem;
    }
`