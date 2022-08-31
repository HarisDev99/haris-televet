import React, { useState, useEffect } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Modal from 'react-modal'
import GatsbyBackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

// Utils
import parseContent from '../../utils/parseContent'

// Components
import FormBuilder from '../formBuilder/index'

const HigherOrderComponent = ({
    type,
    background,
    backgroundColumn,
    children,
}) => {
    return (
        type === `background` || type === null ?
            background ? (
                <BackgroundImage fluid={background.localFile.childImageSharp.fluid}>
                    {children}
                </BackgroundImage>
            )
            : children
        : type === `column` ?
            <RowWrapper>
                {children}
                <BackgroundImage fluid={backgroundColumn.localFile.childImageSharp.fluid} style={{
                    backgroundSize: `contain`
                }}/>
            </RowWrapper>
        : children
    )
}

const PagePopupComponent = ({
    settings
}) => {
    Modal.setAppElement(`#___gatsby`)

    const [ formOpen, setFormOpen ] = useState(false)

    const [ open, setOpen ] = useState(false)

    const styles = {
        overlay: {
            position: `fixed`,
            left: `0`,
            right: `0`,
            bottom: `0`,
            top: `0`,
            background: `rgba(0,0,0,0.3)`,
            zIndex: `6000000`,
            height: ``,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`
        },
        content: {
            position: `relative`,
            margin: ``,
            border: ``,
            padding: ``,
            borderRadius: ``,
            background: ``,
            left: ``,
            right: ``,
            bottom: ``,
            top: ``,
            overflow: ``,
            outline: `0`,
            width: `calc(100% - 3rem)`,
            maxWidth: `50rem`,
        },
    }

    const {
        slug,
        title,
        type: layoutType,
        description,
        background,
        backgroundColumn,
        cta,
        displaySettings
    } = settings

    useEffect(() => {
        const {
            delay,
            type,
        } = displaySettings

        const isDefined = () => typeof window !== `undefined`

        if ( isDefined() && !open) {
            const id = `${slug}PagePopup`
            const isExistingUser = sessionStorage.getItem(id)

            if (type === `time`) {
                const timeout = delay * 1000
                
                if (!isExistingUser) {
                    sessionStorage.setItem(id, `true`)
        
                    setTimeout(() => {
                        setOpen(true)
                    }, timeout)
                }
            }

            if (type === `exit`) {
                if (!isExistingUser) {
                    
                    const handleExitIntent = (e) => {
                        const shouldShowExitIntent = 
                        !e.toElement && 
                        !e.relatedTarget &&
                        e.clientY < 10
                
                        if (shouldShowExitIntent) {
                            window.removeEventListener(`mouseout`, handleExitIntent)
                            
                            sessionStorage.setItem(id, `true`)
                            setOpen(true)
                        }
                    }

                    window.addEventListener(`mouseout`, handleExitIntent)
                }
            }
        }
    }, [ setOpen, open, slug, displaySettings ])
    return (
        <Modal
            style={styles}
            isOpen={open}
            closeTimeoutMS={300}
            onRequestClose={() => setOpen(false)}
        >
            <Close
                aria-label="Close Modal"
                onClick={() => setOpen(false)}
            >
                <CloseIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path d="M15.736 17.536a1.273 1.273 0 001.8-1.8L10.8 9l6.736-6.736a1.273 1.273 0 00-1.8-1.8L9 7.2 2.264.464a1.273 1.273 0 00-1.8 1.8L7.2 9 .464 15.736a1.273 1.273 0 101.8 1.8L9 10.8l6.736 6.736z"/>
                </CloseIcon>
            </Close>
            <HigherOrderComponent
                type={layoutType}
                background={background}
                backgroundColumn={backgroundColumn}
            >
                <ContentWrapper>
                    <span className={`sm:text--2xl`}>{title}</span>
                    {description && <Content className={background && `color--white`}>
                        {parseContent(description)}
                    </Content>}
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
                    : cta.type === `form` ?
                        <>
                        {cta.formToggle ?
                            <>
                            {!formOpen && <button onClick={() => setFormOpen(true)} className={`button button--primary button--icon sm:text--xl`}>
                                {cta.label}
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                                    <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                                </svg>
                            </button>}
                            {formOpen && <FormWrapper>
                                <FormBuilder
                                    id={cta.hubspotFormId}
                                    ctaLabel={cta.formLabel}
                                    redirect={cta.confirmationPage}
                                    slug={slug}
                                    successCallback={() => {
                                        setTimeout(() => {
                                            setOpen(false)
                                        }, 1000)
                                    }}
                                />
                            </FormWrapper>}
                            </>
                        :
                            <FormWrapper>
                                <FormBuilder
                                    id={cta.hubspotFormId}
                                    ctaLabel={cta.label}
                                    redirect={cta.confirmationPage}
                                    slug={slug}
                                    successCallback={() => {
                                        setTimeout(() => {
                                            setOpen(false)
                                        }, 1000)
                                    }}
                                />
                            </FormWrapper>
                        }
                        </>
                    : null
                    }
                </ContentWrapper>
             </HigherOrderComponent>
        </Modal>
    )
}

export default PagePopupComponent

// Styled Components
const RowWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    background-color:${props => props.theme.color.grey[50]};
    @media (min-width:992px) {
        grid-template-columns:minmax(0,2fr) minmax(0,1.25fr);
    }
`
const BackgroundImage = styled(GatsbyBackgroundImage)`
    width:100%;
    height:100%;
    overflow:hidden;
    position:relative;
`
const ContentWrapper = styled.div`
    padding:1.5rem 1.5rem 0 1.5rem;
    width:100%;
    background-color:${props => props.theme.color.grey[50]};
    ${BackgroundImage} & {
        background-color:rgba(0,0,0,0.55);
        color:#fff;
        & select {
            color:${props => props.theme.color.primary.dark};
        }
    }
    display: flex;
    flex-direction: column;
    row-gap:2rem;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    justify-items:center;
    height:100%;
    & > *:last-child {
        margin-bottom:1.5rem;
    }
    @media (min-width:992px) {
        padding:3rem 3rem 0 3rem;
        & > *:last-child {
            margin-bottom:3rem;
        }
        max-height: calc(100vh - 10rem);
    }
`
const Close = styled.button`
    cursor: pointer;
    background-color:${props => props.theme.color.purple[500]};
    padding:0;
    height:2rem;
    width:2rem;
    position:absolute;
    top:-3rem;
    right:0;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    z-index: 1;
    @media (min-width:992px) {
        top:-1rem;
        right:-1rem;
    }
`
const CloseIcon = styled.svg`
    fill: #fff;
    width:0.75rem;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    text-align:left;
    &.color--white li:before {
        background-color:#fff;
    }
`
const FormWrapper = styled.div`
    width: 100%;
`