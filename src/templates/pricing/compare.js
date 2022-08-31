import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Table from '../../components/table'
import Header from '../../components/title/variantFour'

// Hooks
import useCompareList from '../../hooks/useCompareList'

const CompareComponent = ({
    title,
    description,
    items,
}) => {
    const mappedItems = items && items.map(({
        name,
        includedFeatures
    }) => {
        return {
            name,
            includedFeatures: includedFeatures.map((featureIndex) => parseInt(featureIndex) - 1)
        }
    })

    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:3.5rem;
                `}
                lg={`
                    grid-row-gap:7rem;
                `}
            >
                <Header
                    title={title}
                    description={description}
                />
                <Table
                    items={mappedItems}
                    features={useCompareList()}
                />
            </Container>
        </Section>
    )
}

export default CompareComponent

// Styled Components
const Section = styled.section`
    padding-top:5rem;
    padding-bottom:5rem;

`