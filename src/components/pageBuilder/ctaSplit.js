import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import { Link as GatsbyLink } from 'gatsby'

// Components
import FormBuilder from '../formBuilder/index'
import Calendly from '../calendly'

// Utils
import parseContent from '../../utils/parseContent'

const CtaButton = ({
    type,
    label,
    linkInternal,
    linkExternal,
    scopeExternal,
}) => {
    const toggleChat = () => {
        const isDefined = typeof window !== `undefined`

        const drift = isDefined && window.drift

        drift && drift.api.toggleChat()
    }

    const buttonClass = `button--underline teal sm:text--xl`

    switch (type) {
        case `internal`:
            return (
                <GatsbyLink to={linkInternal.uri} className={buttonClass}>
                    {label}
                </GatsbyLink>
            )
        case `external`:
            return (
                <a href={linkExternal} target={scopeExternal ? `_blank` : ``} className={buttonClass}>
                    {label}
                </a>
            )
        case `question`:
            return (
                <button onClick={toggleChat} className={buttonClass} style={{ cursor: `pointer`, textAlign: `inherit` }}>{label}</button>
            )
        default:
            return null
    }
}

const CtaSplitComponent = ({
    background,
    introTitle,
    introDescription,
    introCta,
    ctaTitle,
    ctaDescription,
    ctaGroup,
    slug,
}) => {
    return (
        <Section>
            <Wrapper>
                <Item>
                    <ItemContainer>
                        {background && 
                        <FeaturedWrapper>
                            <FeaturedWrapperContainer>
                                <FeaturedImageWrapper>
                                    <FeaturedImage
                                        fluid={background.localFile.childImageSharp.fluid}
                                        alt={background.altText || background.title}
                                        style={{
                                            position: `absolute`
                                        }}
                                        objectFit={`contain`}
                                    />
                                </FeaturedImageWrapper>
                            </FeaturedWrapperContainer>
                            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 400">
                                <path d="M430.479 49.595c21.495 42.911-2.887 114.326-16.04 165.694-12.833 51.369-14.437 82.378-26.307 112.447-11.87 30.069-34.006 59.199-62.88 68.596-28.552 9.083-64.162-1.253-116.775-3.759-52.614-2.193-122.23 3.759-163.936-25.684-41.706-29.756-55.18-94.907-35.931-146.275 19.249-51.368 71.22-89.268 120.947-127.481 49.405-38.213 96.564-77.053 153.99-88.955C340.972-8.038 408.664 6.37 430.479 49.595z">
                                </path>
                            </svg>
                        </FeaturedWrapper>
                        }
                        <Header>
                            <h1 className={`sm:text--2xl lg:text--5xl`}>{introTitle}</h1>
                            <ContentWrapper>{parseContent(introDescription)}</ContentWrapper>
                        </Header>
                        <CtaButton
                            type={introCta.type}
                            label={introCta.label}
                            linkInternal={introCta.linkInternal}
                            linkExternal={introCta.linkExternal}
                            scopeExternal={introCta.scopeExternal}
                        />
                    </ItemContainer>
                </Item>
                <Item className={`column-alt`}>
                    <ItemContainer>
                        <Header>
                            <h2 className={`sm:text--2xl lg:text--4xl`}>{ctaTitle}</h2>
                            {ctaDescription && <p className={`sm:text--xl`}>{ctaDescription}</p>}
                            <Logo fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315 341">
                                <path d="M315 57.3c0-32.5-27.1-58.7-60-57.2-29.3 1.4-53.2 25.2-54.5 54.5-1.5 32.9 24.7 60 57.2 60h1.3l.9 41.6c.1 4.1 5.5 5.4 7.5 1.8 0 0 37.3-70.3 37.6-70.9 7.1-14.3 10-18.4 10-29.8zM175.7 185h-.1v.2L84.6 0H0l136.5 265.4 38.5 74.9 39.1-76.2-38.4-79.1z" fill="currentColor"/>
                            </Logo>
                        </Header>
                        <FormWrapper>
                            {ctaGroup.type === `form` ?
                                <FormBuilder
                                    id={ctaGroup.hubspotFormId}
                                    ctaLabel={ctaGroup.label}
                                    slug={slug}
                                    redirect={ctaGroup.confirmationPage}
                                />
                            : ctaGroup.type === `calendly` ?
                                <Calendly 
                                    url={ctaGroup.calendlyUrl} 
                                    slug={slug}
                                />
                            : 
                                null
                            }
                        </FormWrapper>
                    </ItemContainer>
                </Item>
            </Wrapper>
        </Section>
    )
}

export default CtaSplitComponent

// Styled Components
const Section = styled.section`
    position: relative;
    overflow: hidden;
    z-index:1;
    background: linear-gradient(0deg, ${props => props.theme.color.grey[50]}, #fff)
`
const Logo = styled.svg`
    position:absolute;
    top:-3rem;
    right:-2rem;
    width:15rem;
    color:rgba(255,255,255,0.2);
    @media (min-width:992px) {
        top:-4.5rem;
        right:-7.5rem;
        width:20rem;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    text-align:left;
    position:relative;
`
const ContentWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const FeaturedWrapper = styled.div`
    width: 100%;
    position:relative;
    & > svg {
        position:absolute;
        bottom:0;
        z-index:-1;
        color:${props => props.theme.color.teal[50]};
        transform: rotate(53deg);
        width: 475px;
        left: -8rem;
    }
`
const FeaturedWrapperContainer = styled.div`
    max-width: 350px;
    width:100%;
`
const FeaturedImageWrapper = styled.div`
    border-radius:50%;
    background-color:#fff;
    padding-top:100%;
    position:relative;
    overflow:hidden;
`
const FeaturedImage = styled(GatsbyImage)`
    height:100%;
    width:100%;
    top:0;
    left:0;
`
const FormWrapper = styled.div`
    width:100%;
    position:relative;
    z-index:1;
`
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    min-height:calc(100vh - 70px);
    @media (min-width:992px) {
        min-height:calc(100vh - 100px);
        grid-template-columns:repeat(2,minmax(0,1fr));
    }
`
const Item = styled.div`
    padding:3rem;
    display:flex;
    align-items:start;
    &.column-alt {
        background-color:${props => props.theme.color.primary.dark};
        header, label {
            color:#fff;
        }
        form {
            input, select {
                height:3rem;
            }
            button {
                background-image: linear-gradient(to right, ${props => props.theme.color.teal[500]} 50%, ${props => props.theme.color.purple[500]} 0);
                min-width: 255px;
                margin-left:auto;
                margin-right:auto;
            }
        }
    }
    @media (min-width:992px) {
        padding:4.5rem;
    }
`
const ItemContainer = styled.div`
    width:100%;
    max-width: 30rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    margin-left:auto;
    margin-right:auto;
    @media (min-width:992px) {
        max-width:45rem;
        grid-row-gap:3rem;
        justify-items:start;
    }
`