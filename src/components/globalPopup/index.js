import React, { useState, useEffect } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Modal from 'react-modal'
import styled from 'styled-components'
import GatsbyBackgroundImage from 'gatsby-background-image'

// Utils
import parseContent from '../../utils/parseContent'

const GlobalPopupComponent =  ({
    settings
}) => {
    const {
        globalPopupTitle,
        globalPopupDescription,
        globalPopupBackground,
        globalPopupCta: cta,
    } = settings

    Modal.setAppElement(`#___gatsby`)

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

    useEffect(() => {
        const isDefined = () => typeof window !== `undefined`

        const isExistingUser = isDefined() && sessionStorage.getItem(`globalBanner`)

        if (!isExistingUser) {
            sessionStorage.setItem(`globalBanner`, `true`)

            setTimeout(() => {
                setOpen(true)
            }, 750)
        }
    }, [ setOpen ])
    return (
        <Modal
            style={styles}
            isOpen={open}
            portalClassName={`global-banner-modal`}
            closeTimeoutMS={300}
            onRequestClose={() => setOpen(false)}
        >
            <Close
                aria-label="Close Welcome Message"
                onClick={() => setOpen(false)}
            >
                <CloseIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path d="M15.736 17.536a1.273 1.273 0 001.8-1.8L10.8 9l6.736-6.736a1.273 1.273 0 00-1.8-1.8L9 7.2 2.264.464a1.273 1.273 0 00-1.8 1.8L7.2 9 .464 15.736a1.273 1.273 0 101.8 1.8L9 10.8l6.736 6.736z"/>
                </CloseIcon>
            </Close>
            <BackgroundImage fluid={globalPopupBackground.localFile.childImageSharp.fluid}>
                <Wrapper>
                    <span className={`sm:text--2xl lg:text--5xl`}>{globalPopupTitle}</span>
                    <Content>
                        {parseContent(globalPopupDescription)}
                    </Content>
                    {cta.type === `internal` ?
                        <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary sm:text--xl`}>
                            {cta.label}
                        </GatsbyLink>
                    :
                        <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary sm:text--xl`}>
                            {cta.label}
                        </a>
                    }
                </Wrapper>
            </BackgroundImage>
        </Modal>
    )
}

export default GlobalPopupComponent

// Styled Components
const BackgroundImage = styled(GatsbyBackgroundImage)`
    width:100%;
    height:100%;
    border-radius:1rem;
    overflow:hidden;
`
const Wrapper = styled.div`
    padding:1.5rem;
    width:100%;
    background-color:rgba(0,0,0,0.55);
    color:#fff;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    @media (min-width:992px) {
        padding:3rem;
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
    li:before {
        background-color:#fff;
    }
`