import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const IntroComponent = ({
    title,
    description
}) => {
    return (
        <Section>
            <Container>
                <Header>
                    <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
                    <Description className={`sm:text--lg`}>{parseContent(description)}</Description>
                </Header>
            </Container>
        </Section>
    )
}

export default IntroComponent

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
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
`
const Description = styled.div`
    max-width: 50.5rem;
    margin:0 auto;
`