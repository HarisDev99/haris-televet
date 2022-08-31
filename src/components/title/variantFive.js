import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Utils
import parseContent from '../../utils/parseContent'

const TitleComponent = ({
    title = `Spread the word`,
    description = `Enjoy automated email templates, social media posts, print marketing materials, and more to notify clients of your added services.`,
    cta
}) => {
    return (
        <Header>
            <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
            <Content>{parseContent(description)}</Content>
            {!cta ? null
            : cta.type === `internal` ? 
                <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary button--icon sm:text--xl`}>
                    {cta.label}
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                    </svg>
                </GatsbyLink>
            : cta.type === `external` ?
                <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary button--icon sm:text--xl`}>
                    {cta.label}
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                    </svg>
                </a>
            : null}
        </Header>
    )
}

export default TitleComponent

// Styled Components
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.75rem;
    justify-items:center;
    text-align:center;
    @media (min-width:992px) {
        justify-items:start;
        text-align:left;
        grid-row-gap:2.25rem;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    max-width:24rem;
`