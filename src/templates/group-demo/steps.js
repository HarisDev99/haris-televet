import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const StepsComponent = ({
    title,
    description,
    cta
}) => {
    return (
        <Section>
            <Container
                lg={
                    `grid-template-columns:repeat(2,minmax(0,1fr));`
                }
            >
                <h2 className={`sm:text--3xl lg:text--5xl`}>{title}</h2>
                <Wrapper>
                    <Content>
                        {parseContent(description)}
                    </Content>
                    {cta.type === `internal` ? 
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
                </Wrapper>
            </Container>
        </Section>
    )
}

export default StepsComponent

const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    background-color:${props => props.theme.color.grey[50]};
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Wrapper = styled.div`
    display:grid;
    grid-row-gap:2rem;
`
const Content = styled.div`
    display:grid;
    grid-row-gap:1rem;
`