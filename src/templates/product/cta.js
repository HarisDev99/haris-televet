import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Components
import Container from '../../components/container'

const CtaComponent = ({
    subtitle,
    title,
    buttons,
    border
}) => {
    return (
        <Section className={border ? 'section-grey' : ''}>
            <Container>
                <Header>
                    <div className={`sm:text--lg`}>{subtitle}</div>
                    <Title className={`sm:text--3xl lg:text--4xl`}>{title}</Title>
                </Header>
                <ButtonContainer>
                    {buttons.map((cta, index) => (
                        <React.Fragment key={index}>
                            {cta.type === `internal` ?
                                <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary sm:text--xl`}>
                                    {cta.label}
                                </GatsbyLink>
                            :
                                <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary sm:text--xl`}>
                                    {cta.label}
                                </a>
                            }
                            {index === 0 && <span className={`sm:text--xl`}>{`or`}</span>}
                        </React.Fragment>
                    ))}
                </ButtonContainer>
            </Container>
        </Section>
    )
}

export default CtaComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
    &.section-grey {
        background-color:${props => props.theme.color.grey[100]};
    }
    
`
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
const ButtonContainer = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    justify-items:center;
    @media (min-width:992px) {
        display:inline-grid;
        grid-template-columns:minmax(0,1fr) minmax(0,max-content) minmax(0,1fr);
        grid-column-gap:1.25rem;
        align-items:center;
        width: fit-content;
        margin: 0 auto;
        justify-content:center;
        > *:first-child, > *:last-child {
            min-width: 100%;
            text-align: center;
        }
    }
`