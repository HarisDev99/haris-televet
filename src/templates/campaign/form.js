import React from 'react'
import styled from 'styled-components'

// Components
import FormBuilder from '../../components/formBuilder/index'

const FormComponent = ({
    title,
    redirect,
    ctaLabel,
    id,
    slug
}) => {
    return (
        <Wrapper>
            <Title className={`sm:text--lg`}>{title}</Title>
            <FormBuilder
                id={id}
                ctaLabel={ctaLabel}
                redirect={redirect}
                slug={slug}
            />
        </Wrapper>
    )
}

export default FormComponent

// Styled Components
const Wrapper = styled.div`
    padding:1.5rem;
`
const Title = styled.h2`
    margin-bottom:1.5rem;
`