import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Components
import FormBuilder from '../../components/formBuilder/index'
import Calendly from '../../components/calendly'

const CtaComponent = ({
    headerCta,
    title,
    primaryCta,
    slug
}) => {
    return (
        <Wrapper>
            {headerCta.type === `internal` ?
                <PerOwnerLink as={GatsbyLink} className={`button--icon button--arrow sm:text--lg`} to={headerCta.linkInternal.uri}>
                    {headerCta.label}
                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                    </svg>
                </PerOwnerLink>
            : headerCta.type === `external` ?
                <PerOwnerLink className={`button--icon button--arrow sm:text--lg`} href={headerCta.linkExternal} target={headerCta.scopeExternal && `_blank`}>
                    {headerCta.label}
                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                    </svg>
                </PerOwnerLink>
            : null}
            {title && <Title className={`sm:text--lg`}>{title}</Title>}
            <Wrapper>
                {primaryCta.type === `form` ?
                <FormBuilder
                    id={primaryCta.hubspotFormId}
                    ctaLabel={primaryCta.ctaLabel}
                    redirect={primaryCta.confirmationPage}
                    slug={slug}
                />
                : primaryCta.type === `calendly` ?
                    <Calendly url={primaryCta.calendlyUrl} slug={slug}/>
                : null}
            </Wrapper>
        </Wrapper>
    )
}

export default CtaComponent

// Styled Components
const PerOwnerLink = styled.a`
    justify-content:start;
    margin-bottom:0.5rem;
`
const Wrapper = styled.div`
`
const Title = styled.h2`
    margin-bottom:1rem;
`