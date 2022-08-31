import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
 
// Layout Components
import Container from '../../components/container'

// Components
import Subscribe from '../../components/subscribe'

const CtaComponent = ({
    title,
    slug,
    cta
}) => {
    return (
        <Section>
            <Container md={`z-index:2;`}>
                <Header>
                    <Title className={`sm:text--3xl lg:text--4xl`}>{title}</Title>
                    {cta.type === `internal` ?
                        <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary sm:text--xl`}>
                            {cta.label}
                        </GatsbyLink>
                    : cta.type === `external` ?
                        <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary sm:text--xl`}>
                            {cta.label}
                        </a>
                    :
                        <Subscribe
                            id={cta.hubspotFormId}
                            slug={slug}
                            confirmationPage={cta.confirmationPage}
                        />
                    }
                </Header>
            </Container>
            <Shape viewBox="0 0 439 335" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M367.48 20.5187C410.046 40.9578 447.012 88.2759 437.49 126.354C427.969 164.153 371.681 192.712 329.395 233.31C287.109 273.908 258.545 326.826 222.979 334.106C187.414 341.385 144.288 303.027 98.9217 262.429C53.2752 221.83 4.82828 178.712 0.347643 131.394C-4.133 84.0761 35.3526 32.2782 80.9992 11.8391C126.646 -8.32012 178.453 2.87942 228.02 5.11932C277.867 7.07924 325.194 0.359522 367.48 20.5187Z"/>
            </Shape>
        </Section>
    )
}

export default CtaComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:3rem;
    padding-bottom:3rem;
    position:relative;
    overflow:hidden;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`

const Header = styled.header`
    text-align:center;
    max-width:47rem;
    margin:0 auto;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    justify-items:center;
    width:100%;
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
const Shape = styled.svg`
    fill:${props => props.theme.color.purple[100]};
    position: absolute;
    width: 30rem;
    left: -8rem;
    bottom: -12rem;
    z-index: 1;
    display:none;
    transform:rotate(25deg);
    @media (min-width:992px) {
        display:block;
    }
`