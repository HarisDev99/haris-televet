import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import { Link as GatsbyLink } from 'gatsby'

// Components
import Container from '../../components/container'

const IntegrationsComponent = ({
    title,
    logos,
    cta
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:1.5rem;
                `}
                lg={`
                    grid-row-gap:3.25rem;
                `}
            >
                <h2 className={`sm:text--xl`}>{title}</h2>
                <List>
                    {logos.map(({
                        title,
                        altText,
                        localFile: {
                            childImageSharp: {
                                fluid
                            }
                        }
                    }, index) => (
                        <ImageWrapper key={index}>
                            <Image
                                fluid={fluid}
                                objectFit={`contain`}
                                alt={altText || title}
                            />
                        </ImageWrapper>
                    ))}
                </List>
                {cta.type === `internal` ? 
                    <GatsbyLink to={cta.linkInternal.link} className={`button--icon button--arrow sm:text--lg`}>
                        {cta.label}
                        <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                        </svg>
                    </GatsbyLink>
                :
                    <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button--icon button--arrow sm:text--lg`}>
                        {cta.label}
                        <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                        </svg>
                    </a>
                }
            </Container>
        </Section>
    )
}

export default IntegrationsComponent

// Styled Components
const Section = styled.section`
    padding-top:2rem;
    padding-bottom:2.375rem;
    text-align:center;
    background-color:${props => props.theme.color.grey[50]};
    @media (min-width:992px) {
        padding-top:4.4375rem;
        padding-bottom:4.4375rem;
    }
`
const List = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
`
const ImageWrapper = styled.div`
    background-color:#fff;
    border-radius:0.25rem;
    width:9.75rem;
    max-width:calc(50% - 1rem);
    height:5.625rem;
    margin:0.5rem;
    padding:0.5rem;
    overflow:hidden;
    @media (min-width:992px) {
        margin:1rem;
        width:10.375rem;
        height:5.9375rem;
        max-width:initial;
    }
`
const Image = styled(GatsbyImage)`
    height: 100%;
    width: 100%;
`   