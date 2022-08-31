import React from 'react'
import styled from 'styled-components'

import Subscribe from '../subscribe'

const CtaComponent = ({
    subtitle,
    title,
    formId,
    slug,
    confirmationPage
}) => {
    return (
        <Header>
            <div className={`sm:text--lg`}>{subtitle}</div>
            <Title className={`sm:text--3xl lg:text--4xl`}>{title}</Title>
            <Subscribe
                id={formId}
                slug={slug}
                confirmationPage={confirmationPage}
            />
        </Header>
    )
}

export default CtaComponent

// Styled Components
const Header = styled.header`
    text-align:center;
    max-width:47rem;
    margin:0 auto;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    justify-items:center;
    width:100%;
    grid-row-gap:1.75rem;
    @media (min-width:992px) {
        grid-row-gap:1rem;
    }
`
const Title = styled.h2`
    margin-bottom:1.25rem;
    @media (min-width:992px) {
        margin-bottom:2.25rem;
    }
`