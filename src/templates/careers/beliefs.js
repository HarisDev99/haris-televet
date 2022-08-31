import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Features from '../../components/features'
import Header from '../../components/title/variantSix'

// Assets
import Learner from '../../images/icons/learner.svg'
import TimeFast from '../../images/icons/time-fast.svg'
import Goal from '../../images/icons/goal.svg'
import Telescope from '../../images/icons/telescope.svg'
import CustomerCentric from '../../images/icons/customer-centric.svg'
import Team from '../../images/icons/team.svg'

const IconList = [
    <Learner/>,
    <TimeFast/>,
    <Goal/>,
    <Telescope/>,
    <CustomerCentric/>,
    <Team/>
]

const BeliefsComponent = ({
    title = `Our beliefs`,
    description = `At TeleVet, you’ll notice we are obsessed about our customers and solving their biggest problems with empathy and passion.
    We’re crafting a culture that encourages a healthy work-life balance for you, your passions, and the people (and pets!) you love.`,
    items
}) => {
    
    return (
        <Section>
            <Container 
                sm={`
                    grid-row-gap:5.625rem;
                `}
                lg={`
                    grid-row-gap:5.75rem;
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
                />
            </Container>
        </Section>
    )
}

export default BeliefsComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:3.125rem;
    @media (min-width:992px) {
        padding-bottom:5rem;
        padding-top:6.25rem;
    }
`