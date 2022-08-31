import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

// Components
import Cta from '../../components/cta/variantSubscribe'

const SubscribeComponent = ({
    subtitle,
    title,
    formId,
    slug,
    confirmationPage
}) => {
    return (
        <Section>
            <Container>
                <Cta
                    subtitle={subtitle}
                    title={title}
                    formId={formId}
                    slug={slug}
                    confirmationPage={confirmationPage}
                />
            </Container>
        </Section>
    )
}

export default SubscribeComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[100]};
    padding-top:6.25rem;
    padding-bottom:6.25rem;
    @media (min-width:992px) {
        padding-top:7rem;
        padding-bottom:8.5rem;
    }
`
