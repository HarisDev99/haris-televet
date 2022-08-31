import React, { useState } from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import { Link as GatsbyLink } from 'gatsby'

// Utils
import parseContent from '../../utils/parseContent'

// Layout Components
import Container from '../../components/container'

// Components
import Popup from '../../components/popup/index'
import FormBuilder from '../../components/formBuilder'

const WhitepaperComponent = ({
    title,
    description,
    background,
    cta,
    slug
}) => {
    const [ open, setOpen ] = useState(false)
    const [ complete, setComplete ] = useState(false)

    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:1.5rem;
                `}
                lg={`
                    grid-template-columns:repeat(2,minmax(0,1fr));
                    grid-column-gap:6rem;
                `}
            >
                <Header>
                    <h2 className={`sm:text--3xl lg:text--5xl`}>{title}</h2>
                    <Content>{parseContent(description)}</Content>
                    {cta.type === `internal` ? 
                        <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary sm:text--xl`}>
                            {cta.label}
                        </GatsbyLink>
                    : cta.type === `external`?
                        <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary button--icon sm:text--xl`}>
                            {cta.label}
                        </a>
                    :
                        <React.Fragment>
                            <Popup
                                open={open}
                                setOpen={setOpen}
                            >
                                <PopupWrapper>
                                    <h1 className={`sm:text--2xl lg:text--4xl`}>{complete ? `Success!` : cta.popup.title}</h1>
                                    {complete ?
                                        <Content>{parseContent(cta.popup.confirmationPage.message)}</Content>
                                    :
                                        <>
                                            <Content>{parseContent(cta.popup.description)}</Content>
                                            <FormWrapper>
                                                <FormBuilder
                                                    id={cta.popup.hubspotFormId}
                                                    ctaLabel={cta.popup.ctaLabel}
                                                    redirect={cta.popup.confirmationPage}
                                                    slug={slug}
                                                    successCallback={setComplete}
                                                />
                                            </FormWrapper>
                                        </>
                                    }
                                </PopupWrapper>
                            </Popup>
                            <Button aria-label={`Open popup: ${title}`} onClick={() => setOpen(true)} className={`button button--primary button--icon sm:text--xl`}>
                                {cta.label}
                            </Button>
                        </React.Fragment>
                    }
                </Header>
                <Background
                    fixed={background.localFile.childImageSharp.fixed}
                    style={{
                        height: ``,
                        width: ``,
                        position: ``,
                    }}
                    objectFit={`contain`}
                    aspectRatio={`${(background.localFile.childImageSharp.fixed.height / background.localFile.childImageSharp.fixed.width) * 100}`}
                />
            </Container>
        </Section>
    )
}

export default WhitepaperComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    position:relative;
    overflow:hidden;
    background-color:${props => props.theme.color.teal[50]};
    @media (min-width:992px) {
        padding-top:3rem;
        padding-bottom:3rem;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Background = styled(GatsbyImage)`
    position:relative;
    height:100%;
    padding-top: ${props => props.aspectRatio}%;
    @media (min-width:992px) {
        padding-top:0;
    }
`
const PopupWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const FormWrapper = styled.div`

`
const Button = styled.button`
    cursor:pointer;
`