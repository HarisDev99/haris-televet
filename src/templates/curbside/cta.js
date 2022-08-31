import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Cta from '../../components/cta/variantOne'

const CtaComponent = ({
    subtitle,
    title,
    ctaLabel,
    ctaLink,
}) => {
    return (
        <Section>
            <Container>
                <Cta
                    subtitle={subtitle}
                    title={title}
                    ctaLabel={ctaLabel}
                    ctaLink={ctaLink}
                />
            </Container>
        </Section>
    )
}

export default CtaComponent

// Styled Components
const Section = styled.section`
    background-color:#fff;
    padding-top:6.25rem;
    padding-bottom:6.25rem;
    @media (min-width:992px) {
        padding-top:7rem;
        padding-bottom:8.5rem;
    }
`
