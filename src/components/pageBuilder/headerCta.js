import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'
import { Link as GatsbyLink } from 'gatsby'

// Hooks
import useDownloads from '../../hooks/useDownloads'

// Layout Components
import Container from '../../components/container'

// Components
import Calendly from '../../components/calendly'
import AppStore from '../../components/download/logos'
import FormBuilder from '../formBuilder/index'

// Utils
import parseContent from '../../utils/parseContent'

const HeaderCtaComponent = ({
    title,
    description,
    background,
    ctaGroup,
    headerCta,
    slug,
    sectionId
}) => {
    const {
        pets
    } = useDownloads()

    return (
        <Section id={sectionId}>
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
                        {parseContent(description)}
                    </Content>
                    {!headerCta.type ? null :
                    headerCta.type === `internal` ?
                        <GatsbyLink to={headerCta.linkInternal.uri} className={`button button--secondary sm:text--lg`}>{headerCta.label}</GatsbyLink>
                    : headerCta.type === `external` ?
                        <a href={headerCta.linkExternal} className={`button button--secondary sm:text--lg`} target={headerCta.scopeExternal && `_blank`}>{headerCta.label}</a>
                    :
                        <AppStore
                            appStore={pets.app_store}
                            playStore={pets.play_store}
                        />
                    }
                </Header>
                <CtaWrapper>
                {ctaGroup.type === `form` ?
                <FormWrapper>
                    {ctaGroup.formTitle && <FormTitle className="sm:text--lg">{ctaGroup.formTitle}</FormTitle>}
                    <FormBuilder
                        id={ctaGroup.hubspotFormId}
                        ctaLabel={ctaGroup.buttonLabel}
                        redirect={ctaGroup.confirmationGroup}
                        slug={slug}
                    />
                </FormWrapper>
                : ctaGroup.type === `calendly` ?
                    <Calendly
                        url={ctaGroup.calendlyUrl}
                    />
                :
                    null
                }
                </CtaWrapper>
            </Container>
            <Background>
                <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title}/>
            </Background>
        </Section>
    )
}

export default HeaderCtaComponent

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
const FormWrapper = styled.section`
    padding:1.5rem;
`
const FormTitle = styled.h2`
    margin-bottom:1rem;
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
const CtaWrapper = styled.div`
    background-color:#fff;
    border-radius:0.375rem;
    overflow:hidden;
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