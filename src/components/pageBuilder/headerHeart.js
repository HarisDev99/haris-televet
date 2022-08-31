import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const HeaderHeartComponent = ({
    title,
    description
}) => {
    return (
        <Section>
            <Container>
                <Header>
                    <h1 className={`sm:text--3xl lg:text--5xl`}>{parseContent(title)}</h1>
                    <Content>{parseContent(description)}</Content>
                </Header>
            </Container>
        </Section>
    )
}

export default HeaderHeartComponent

// Styled Components
const Section = styled.section`
    background-color: ${props => props.theme.color.grey[50]};
    padding-top:2.5rem;
    padding-bottom:3.75rem;
    @media (min-width:992px) {
        padding-top:5.375rem;
        padding-bottom:7rem;
    }
`
const Header = styled.header`
    margin:0 auto;
    max-width:47rem;
    text-align:center;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    margin:0 auto;
    z-index:1;
    @media (min-width:992px) {
        grid-row-gap:1.375rem;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
`