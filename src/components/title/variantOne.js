import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Utils
import parseContent from '../../utils/parseContent'


// Higher Order Components
const Wrapper = ({
    subtitle,
    children
}) => (
        subtitle ? <Title>{children}</Title> 
        : <React.Fragment>{children}</React.Fragment>
)

const TitleComponent = ({
    subtitle,
    title = `The most trusted solution in veterinary telemedicine.`,
    description,
    cta,
}) => {
    return (
        <Header>
            <Wrapper subtitle={subtitle}>
                {subtitle && <Subtitle className={`sm:text--base`}>{subtitle}</Subtitle>}
                <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
            </Wrapper>
            {description && <Content>{parseContent(description)}</Content>}
            {!cta ? null
            : cta.type === `internal` ? 
                <GatsbyLink to={cta.linkInternal.link} className={`button button--primary button--icon sm:text--xl`}>
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
    grid-row-gap:2rem;
    align-items:center;
    justify-items:center;
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
        justify-items:start;
        grid-row-gap:2.5rem;
    }
`
const Title = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
`
const Subtitle = styled.div`
    font-weight:600;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`