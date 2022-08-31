import React, { useEffect } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { Link as GatsbyLink } from 'gatsby'
import useGoogleOptimize from '@react-hook/google-optimize'

// Components
import Nav from './nav'

const NavButtonComponent = ({
    cta,
}) => {
    const variantList = cta.splitToggle ? 
        [ cta.label, ...cta.splitVariants.map(({ label }) => label) ] : []
    
    const splitId = cta.splitId ? cta.splitId : ``

    const HeaderVariant = useGoogleOptimize(splitId, variantList)

    return (
        cta.type === `internal` ?
            <GatsbyLink to={cta.linkInternal.link} className={`button button--primary button--icon sm:text--xl`} id={`header__cta`}>
                {HeaderVariant ? HeaderVariant : cta.label}
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                    <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                </svg>
            </GatsbyLink>
        :
            <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary button--icon sm:text--xl`} id={`header__cta`}>
                {HeaderVariant ? HeaderVariant : cta.label}
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                    <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                </svg>
            </a>
    
    )
}

const MobileNavComponent = ({
    open,
    setOpen,
    menuMain,
    menuLogin,
    menuCta,
    cta
}) => {
    Modal.setAppElement(`#___gatsby`)

    const styles = {
        overlay: {
            position: `fixed`,
            left: `0`,
            right: `0`,
            bottom: `0`,
            top: `0`,
            background: `#fff`,
            zIndex: `5600000`,
            height: `100%`,
            overflowY: `scroll`
        },
        content: {
            position: ``,
            maxWidth: ``,
            width: ``,
            margin: ``,
            border: ``,
            padding: `1.5rem 0 4.5rem 0`,
            outline: `0`,
            borderRadius: ``,
            background: ``,
            left: ``,
            right: ``,
            bottom: ``,
            top: ``,
            overflow: ``,
            display: `grid`,
            gridRowGap: `2rem`,
            gridTemplateColumns: `minmax(0,1fr)`,
        },
    }

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 992

            if (!isMobile) setOpen(false)
        }

        window.addEventListener(`resize`, handleResize)

        return () => {
            window.removeEventListener(`resize`, handleResize)
        }
    }, [ open, setOpen ])
    return (
        <React.Fragment>
            <OpenButton 
                aria-label="Open Primary Navigation Menu"
                onClick={() => setOpen(true)}
            >
                <Icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 18" height="18" width="24">
                    <path fillRule="evenodd" d="M.545 1.364C.545.66 1.115.09 1.818.09h20.364a1.273 1.273 0 110 2.545H1.818c-.703 0-1.273-.57-1.273-1.272zm0 15.272c0-.703.57-1.272 1.273-1.272h20.364a1.273 1.273 0 110 2.545H1.818c-.703 0-1.273-.57-1.273-1.273zm1.273-8.909a1.273 1.273 0 100 2.546h20.364a1.273 1.273 0 100-2.546H1.818z" clipRule="evenodd"/>
                </Icon>
            </OpenButton>
            <Modal
                style={styles}
                isOpen={open}
                portalClassName={`nav-modal`}
                closeTimeoutMS={300}
            >
                <Wrapper>
                    <Close
                        aria-label="Close Primary Navigation Menu"
                        onClick={() => setOpen(false)}
                    >
                        <Icon xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                            <path fillRule="evenodd" d="M15.736 17.536a1.273 1.273 0 001.8-1.8L10.8 9l6.736-6.736a1.273 1.273 0 00-1.8-1.8L9 7.2 2.264.464a1.273 1.273 0 00-1.8 1.8L7.2 9 .464 15.736a1.273 1.273 0 101.8 1.8L9 10.8l6.736 6.736z" clipRule="evenodd"/>
                        </Icon>
                    </Close>
                    <Nav
                        menuMain={menuMain}
                        menuLogin={menuLogin}
                    />
                    <NavButtonComponent
                        cta={menuCta[0]}
                    />
                </Wrapper>
                <Separator/>
            </Modal>
        </React.Fragment>
    )
}

export default MobileNavComponent

// Styled Components
const OpenButton = styled.button`
    cursor: pointer;
    background-color:transparent;
    padding:0;
    margin-left:auto;
    z-index: 11;
    position: relative;
    @media (min-width:1200px) {
        display:none;
    }
`
const Icon = styled.svg`
    fill: ${props => props.theme.color.grey[900]};
`
const Wrapper = styled.div`
    background-color:#fff;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    justify-items:start;
    max-width: 30rem;
    width: calc(100% - 3rem);
    align-items:center;
    margin:0 auto;
`
const Close = styled.button`
    cursor: pointer;
    background-color:transparent;
    padding:0;
    margin-left:auto;
`
const Separator = styled.div`
    width:100%;
    height:1px;
    background-color:${props => props.theme.color.grey[300]};
`