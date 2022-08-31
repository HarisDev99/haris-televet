import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

// Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const GroupsComponent = ({
    items
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:3rem;
                `}
                lg={`
                    grid-template-columns:repeat(3,minmax(0,1fr));
                    grid-column-gap:4rem;
                `}
            >
            {items.map(({
                title,
                description,
                background,
                cta
            }, index) => (
                <Item key={index}>
                    <Background>
                        <BackgroundImage
                            alt={background.altText || background.title}
                            fluid={background.localFile.childImageSharp.fluid}
                            style={{
                                position: ``
                            }}
                        />
                    </Background>
                    <h2 className={`sm:text--lg lg:text--2xl`}>{title}</h2>
                    <Content>
                        {parseContent(description)}
                    </Content>
                    {cta.type === `internal` ? 
                        <GatsbyLink to={cta.linkInternal.uri} className={`button--icon button--arrow sm:text--lg`}>
                            {cta.label}
                            <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                            </svg>
                        </GatsbyLink>
                    : cta.type === `external` ?
                        <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button--icon button--arrow sm:text--lg`}>
                            {cta.label}
                            <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                            </svg>
                        </a>
                    : null}
                </Item>
            ))}
            </Container>
        </Section>
    )
}

export default GroupsComponent

const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Background = styled.div`
    grid-row:1;
    position:relative;
    padding-top:52.25%;
    width:100%;
    border-radius:0.65rem;
    overflow:hidden;
`
const Content = styled.div`
    display:grid;
    grid-row-gap:1rem;
`
const Item = styled.div`
    display:grid;
    grid-row-gap:1rem;
    justify-items: start;
`