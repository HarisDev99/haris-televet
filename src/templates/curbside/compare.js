import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Table from '../../components/table'
import Header from '../../components/title/variantSix'

export default ({
    title,
    description,
    items,
}) => {
    return (
        <Section>
            <Container
                lg={`
                    grid-row-gap:7rem;
                `}
            >
                <Header
                    title={title}
                    description={description}
                />
                <Table
                    items={items}
                />
            </Container>
        </Section>
    )
}

// Styled Components
const Section = styled.section`
    display:none;
    @media (min-width:992px) {
        display:block;
        padding-top:4.125rem;
        padding-bottom:7.5rem;
    }
`