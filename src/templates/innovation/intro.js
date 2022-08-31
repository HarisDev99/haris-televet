import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'
import { Link as GatsbyLink } from 'gatsby'

// Components
import Container from '../../components/container'
import Calendly from '../../components/calendly'
import Form from './form'


// Utils
import parseContent from '../../utils/parseContent'

const IntroComponent = ({
    title,
    description,
    background,
    formTitle,
    formCtaLabel,
    formId,
    confirmationPage,
    cta,
    slug,
    formType,
    calendly,
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2.5rem;
                `}
                lg={`
                    align-items:start;
                    grid-column-gap:3rem;
                    grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);
                `}
            >
                <Header>
                    <h1 className={`sm:text--2xl lg:text--4xl`}>{title}</h1>
                    <Content>
                        {parseContent(description)}
                    </Content>
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
                </Header>
                <FormWrapper>
                {formType === `calendly` ?
                    <Calendly
                        url={calendly}
                    />
                : formType === `form` ?
                    <Form
                        title={formTitle}
                        ctaLabel={formCtaLabel}
                        redirect={confirmationPage}
                        id={formId}
                        slug={slug}
                    />
                : null}
                </FormWrapper>
            </Container>
            <Background>
                <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title}/>
            </Background>
        </Section>
    )
}

export default IntroComponent

// Styled Components
const Section = styled.section`
    position:relative;
    padding-bottom:2.5rem;
    padding-top:2.5rem;
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:5rem;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    max-width:32rem;
    align-items:start;
    text-shadow:0 1px 3px rgba(0,0,0,.32), 0 1px 2px rgba(0,0,0,.44);
    color:#fff;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    & li {
        font-size:1rem;
        &:before {
           background-color:#fff; 
        }
    }
    @media (min-width:992px) {
        & li {
            font-size:1.125rem;
        }
    }
`
const FormWrapper = styled.div`
    background-color:#fff;
    border-radius:0.375rem;
    overflow:hidden;
    height:100%;
    @media (min-width:992px) {
        max-height:initial;
    }
`
const Background = styled.div`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    z-index:-1;
    &:after {
        content: '';
        position:absolute;
        height:100%;
        width:100%;
        left:0;
        top:0;
        background-color:rgba(0,0,0,0.70);
    }
`
const Image = styled(GatsbyImage)`
    height:100%;
    width:100%;
`
const Button = styled.a`
    width: fit-content;
    border-radius: 80px;
`