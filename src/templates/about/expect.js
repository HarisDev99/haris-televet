import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Features from '../../components/features'
import Header from '../../components/title/variantSix'

// Assets
import Empathy from '../../images/icons/empathy.svg'
import Checklist from '../../images/icons/checklist.svg'
import Expertise from '../../images/icons/expertise.svg'

const IconList = [
    <Empathy/>,
    <Checklist/>,
    <Expertise/>,
]

const ExpectComponent = ({
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
                <Features
                    items={items.map((item, index) => {
                        return {
                            ...item,
                            icon: IconList[index]
                        }
                    })}
                    align={`center`}
                    size={`large`}
                />
            </Container>
        </Section>
    )
}

export default ExpectComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-bottom:5.625rem;
        padding-top:5rem;
    }
`