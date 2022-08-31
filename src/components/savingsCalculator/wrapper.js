import React from 'react'
import styled from 'styled-components'

import Container from '../container'

const SavingsCalcWrapper = ({
    children,
    title
}) => {
    return (
        <Section>
            <Container                   
                sm={`
                    grid-row-gap:3rem;
                `}
                lg={`
                    grid-row-gap:4.5rem;
                `}
            >

                {title && <h1 className="sm:text--2xl lg:text--3xl" style={{ textAlign: 'center' }}>{title}</h1>}
                {children}
            </Container>
        </Section>
    )
}

const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    background-color:${props => props.theme.color.grey[50]};
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`

export default SavingsCalcWrapper