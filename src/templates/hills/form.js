import React from 'react'
import styled from 'styled-components'

// Components
import Form from '../../components/formBuilder/index'

const FormComponent = ({
    redirect,
    title,
    cta_label,
    slug,
    id
}) => {
    return (
        <Wrapper>
            <Title className={`sm:text--xl lg:text--2xl`}>{title}</Title>
            <Form
                id={id}
                ctaLabel={cta_label}
                redirect={redirect}
                slug={slug}
            />
        </Wrapper>
    )
}

export default FormComponent

// Styled Components
const Wrapper = styled.div`
`
const Title = styled.h2`
    margin-bottom:2.875rem;
    text-align:center;
`