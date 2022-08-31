import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Cta from '../../components/cta/variantOne'

const CtaComponent = () => {
    return (
        <Section>
            <Container>
                <Cta/>
            </Container>
        </Section>
    )
}

export default CtaComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:6.25rem;
    padding-bottom:6.25rem;
    display:block;
    @media (min-width:992px) {
        display:none;
    }
`