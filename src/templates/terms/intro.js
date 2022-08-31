import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

const TitleComponent = ({
    title
}) => {
    return (
        <Section>
            <Container>
                <Header>
                    <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
                </Header>
            </Container>
        </Section>
    )
}

export default TitleComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:5rem;
    }
`
const Header = styled.header`
    text-align:center;
`