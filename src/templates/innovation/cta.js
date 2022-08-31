import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

// Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const CtaComponent = ({
    title,
    description,
    cta
}) => {
    return (
        <Section>
            <Container
                sm={`
                    justify-items:center;
                    grid-row-gap:2rem;
                `}
                lg={`
                    grid-row-gap:3rem;
                `}
            >
                <Header>
                    <h2 className={`sm:text--3xl lg:text--4xl`}>{title}</h2>
                    <Content>
                        {parseContent(description)}
                    </Content>
                </Header>
                {cta.type === `internal` ?
                    <Button as={GatsbyLink} className={`button button--primary button--icon sm:text--xl`} to={cta.linkInternal.link}>
                        {cta.label}
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                        </svg>
                    </Button>
                :
                    <Button className={`button button--primary button--icon sm:text--xl`} href={cta.linkExternal} target={cta.scopeExternal && `_blank`}>
                        {cta.label}
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                        </svg>
                    </Button>
                }
            </Container>
        </Section>
    )
}

export default CtaComponent

// Styled Components
const Section = styled.section`
    padding-bottom:2.5rem;
    padding-top:2.5rem;
    @media (min-width:992px) {
        padding-top:7.5rem;
        padding-bottom:7.5rem;
    }
`
const Header = styled.header`
    max-width:55rem;
    margin:0 auto;
    text-align:center;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Button = styled.a`

`