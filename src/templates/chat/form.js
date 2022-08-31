import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Components
import FormBuilder from '../../components/formBuilder/index'

const FormComponent = ({
    formPetOwnerCta,
    title,
    redirect,
    ctaLabel,
    slug,
    id,
}) => {
    return (
        <Wrapper>
            {formPetOwnerCta.length > 0 && formPetOwnerCta[0].type === `internal` ?
                <PerOwnerLink as={GatsbyLink} className={`button--icon button--arrow sm:text--lg`} to={formPetOwnerCta[0].linkInternal.link}>
                    {formPetOwnerCta[0].label}
                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                    </svg>
                </PerOwnerLink>
            : formPetOwnerCta[0].type === `external` ?
                <PerOwnerLink className={`button--icon button--arrow sm:text--lg`} href={formPetOwnerCta[0].linkExternal} target={formPetOwnerCta[0].scopeExternal && `_blank`}>
                    {formPetOwnerCta[0].label}
                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                    </svg>
                </PerOwnerLink>
            : null
            }
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
const PerOwnerLink = styled.a`
    justify-content:start;
    margin-bottom:0.5rem;
`
const Wrapper = styled.div`
    padding:1.5rem;
`
const Title = styled.h2`
    margin-bottom:1.5rem;
`