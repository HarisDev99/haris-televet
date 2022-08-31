import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

const PopupComponent = ({
    children,
    open = false,
    setOpen
}) => {

    Modal.setAppElement(`#___gatsby`)

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
            <Wrapper>
                {children}
            </Wrapper>
        </Modal>
    )
}

export default PopupComponent

// Styled Components
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
const Wrapper = styled.div`
    background-color:#fff;
    width:100%;
    height:100%;
    padding:1.5rem;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    position:relative;
    @media (min-width:992px) {
        padding:3rem;
        max-height: calc(100vh - 10rem);
    }
`