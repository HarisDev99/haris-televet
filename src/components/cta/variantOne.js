import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Hooks
import useCtaVariantOne from '../../hooks/useCtaVariantOne'

const CtaComponent = () => {
    const {
        ctaIntro: subtitle,
        ctaTitle: title,
        ctaOneCta: ctaButton
    } = useCtaVariantOne()

    return (
        <Header>
            <div className={`sm:text--lg`}>{subtitle}</div>
            <Title className={`sm:text--3xl lg:text--4xl`}>{title}</Title>
            {ctaButton.type === `internal` ?
                <GatsbyLink to={ctaButton.linkInternal.link} className={`button button--primary button--icon sm:text--xl`}>
                    {ctaButton.label}
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                    </svg>
                </GatsbyLink>
            :
                <a href={ctaButton.linkExternal} target={ctaButton.scopeExternal && `_blank`} className={`button button--primary button--icon sm:text--xl`}>
                    {ctaButton.label}
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                    </svg>
                </a>
            }
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