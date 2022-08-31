import React from 'react'
import styled from 'styled-components'

// Components
import Form from '../formBuilder/index'

export default ({
    title,
    redirect,
    ctaLabel,
    formId,
    slug
}) => {
    return (
        <Wrapper>
            <Title className={`sm:text--lg`}>{title}</Title>
            <Form
                id={formId}
                ctaLabel={ctaLabel}
                redirect={redirect}
                slug={slug}
            />
        </Wrapper>
    )
}

// Styled Components
const Wrapper = styled.div`
    padding:1.5rem;
`
const Title = styled.h2`
    margin-bottom:1.5rem;
`