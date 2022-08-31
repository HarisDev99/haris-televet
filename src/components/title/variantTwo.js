import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

const TitleComponent = ({
    title = `Less work. More play.`,
    description = `Information design is the presentation—placement and prioritization of information in a way that facilitates understanding. Information design is an area.`,
    cta,
}) => {
    return (
        <Header>
            <Title className={`sm:text--2xl lg:text--4xl`}>
                {title}
            </Title>
            <p className={`sm:text--lg`}>
                {description}
            </p>
            {cta.type === `internal` ? 
                <Button as={GatsbyLink} to={cta.linkInternal.link} className={`button--icon button--arrow sm:text--lg`}>
                    {cta.label}
                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                    </svg>
                </Button>
            :
                <Button href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button--icon button--arrow sm:text--lg`}>
                    {cta.label}
                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                    </svg>
                </Button>
            }
        </Header>
    )
}

export default TitleComponent

// Styled Components
const Header = styled.header`
    text-align:center;
    max-width:47rem;
    margin:0 auto;
`
const Title = styled.h2`
    margin-bottom:1.625rem;
`
const Button = styled.a`
    margin-top:2rem;
    @media (min-width:992px) {
        margin-top:1.75rem;
    }
`
