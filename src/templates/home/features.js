import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantTwo'
import Features from '../../components/features'

// Assets
import Ease from '../../images/icons/ease.svg'
import Accessibility from '../../images/icons/accessibility.svg'
import Responsiveness from '../../images/icons/responsiveness.svg'

const IconList = [
    <Ease/>,
    <Accessibility/>,
    <Responsiveness/>,
]

export default ({
    title,
    description,
    cta,
    items
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2rem;
                `}
                lg={`
                    grid-row-gap:4rem;
                `}
            >
                <Header
                    title={title}
                    description={description}
                    cta={cta}
                />
                <Features
                    items={items.map(({
                        columnTitle: title,
                        columnDescription: description,
                    }, index) => {
                        return {
                            title,
                            description,
                            icon: IconList[index]
                        }
                    })}
                    align={`center`}
                />
            </Container>
        </Section>
    )
}

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    background-color:#fff;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`