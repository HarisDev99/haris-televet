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
    ctaGroup = [],
}) => {
    return (
        <Header>
            <Wrapper subtitle={subtitle}>
                {subtitle && <Subtitle className={`sm:text--base`}>{subtitle}</Subtitle>}
                <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
            </Wrapper>
            {description && <Content>{parseContent(description)}</Content>}
            <CtaWrapper>
                {ctaGroup.map((item, index) => {
                    return (
                        <>
                            {item.type === 'internal' &&
                                <GatsbyLink class={`button--xs sm:text--base lg:text--lg ${index === 1 ? 'button--alt' : 'button'}`} to={item.linkInternal.link}>{item.label}</GatsbyLink>}
                            {item.type === 'external' &&
                                <a class={`button--xs sm:text--base lg:text--lg ${index === 1 ? 'button--alt' : 'button'}`} href={item.linkExternal} target={item.scopeExternal ? '_blank' : ''}>{item.label}</a>}
                        </>
                    )
                })}
            </CtaWrapper>
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
const CtaWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items: center;
    & > a {
        display:flex;
        align-items:center;
    }
    & > :first-child {
        margin-bottom:1rem;
    }
    @media (min-width:992px) {
        flex-direction:row;
        & > :first-child {
            margin-right:1rem;
            margin-bottom:0;
        }
        & > a {
            display:flex;
            align-items:center;
        }
    }
`