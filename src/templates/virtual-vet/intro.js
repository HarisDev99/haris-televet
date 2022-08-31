import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Components
import Container from '../../components/container'
import Form from './form'

// Utils
import parseContent from '../../utils/parseContent'

const IntroComponent = ({
    title,
    subtitle,
    description,
    background,
    formTitle,
    formCtaLabel,
    formId,
    confirmationPage,
    formPetOwnerCta,
    slug
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2.5rem;
                `}
                lg={`
                    align-items:center;
                    grid-column-gap:3rem;
                    grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);
                `}
            >
                <Header>
                    <h1 className={`sm:text--2xl lg:text--4xl`}>{title}</h1>
                    <Content>
                        <h2 className={`sm:text--xl`}>{subtitle}</h2>
                        {parseContent(description)}
                    </Content>
                </Header>
                <FormWrapper>
                    <Form
                        title={formTitle}
                        ctaLabel={formCtaLabel}
                        redirect={confirmationPage}
                        formPetOwnerCta={formPetOwnerCta}
                        slug={slug}
                        id={formId}
                    />
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
    .calendly-inline-widget {
        min-height: 66rem;
        height:100%;
    }
    @media (min-width:992px) {
        max-height:initial;
        .calendly-inline-widget {
            min-height: 40rem;
        }
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