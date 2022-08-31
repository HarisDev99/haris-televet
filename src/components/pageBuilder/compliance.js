import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import GatsbyImage from 'gatsby-image'

// Utils
import parseContent from '../../utils/parseContent'

// Layout Components
import Container from '../../components/container'

const ComplianceComponent = ({
    title,
    logo,
    description,
    subtitle,
    cta,
}) => {
    return (
        <Section>
            <Container
                sm={`
                    align-items:start;
                    grid-row-gap:2.5rem;
                `}
                lg={`
                    grid-template-columns:repeat(2, minmax(0,1fr));
                    grid-column-gap:2rem;
                `}
            >
                <Header>
                    <h2 className={`sm:text--lg lg:text--4xl`}>{title}</h2>
                    <GatsbyImage
                        fixed={logo.localFile.childImageSharp.fixed}
                        alt={logo.altText || logo.title}
                    />
                </Header>
                <Content>
                    <h3 className={`sm:text--lg`}>{subtitle}</h3>
                    <Description>{parseContent(description)}</Description>
                    {cta.type === `internal` ?
                    <GatsbyLink className={`button--icon button--arrow sm:text--lg sm:d-none lg:d-grid`} to={cta.linkInternal.link} aria-label={`Discover more about ${subtitle.toLowerCase()}`}>
                        {cta.label}
                        <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="currentColor"/>
                         </svg>
                    </GatsbyLink>
                    :
                    <a className={`button--icon button--arrow sm:text--lg sm:d-none lg:d-grid`} href={cta.linkExternal} target={cta.scopeExternal && `_blank`} aria-label={`Discover more about ${subtitle.toLowerCase()}`}>
                        {cta.label}
                        <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="currentColor"/>
                         </svg>
                    </a>
                    }
                </Content>
            </Container>
        </Section>
    )
}

export default ComplianceComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:3.75rem;
    padding-bottom:3.75rem;
    text-align:center;
    .theme--dark & {
        background-color:${props => props.theme.color.primary.dark};
        color:#fff;
        .button--arrow {
            color:#fff;
        }
    }
    @media (min-width:992px) {
        text-align:left;
        padding-top:8.125rem;
        padding-bottom:8.125rem;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2.5rem;
    justify-items:center;
    @media (min-width:992px) {
        justify-items:start;
        grid-row-gap:3.875rem;
    }
`
const Content = styled.div`
    display:grid;
    grid-row-gap:1rem;
    grid-template-columns:minmax(0,1fr);
    justify-items:center;
    @media (min-width:992px) {
        justify-items:start;
        grid-row-gap:1rem;
    }
`
const Description = styled.div`
    max-width:28.625rem;
`