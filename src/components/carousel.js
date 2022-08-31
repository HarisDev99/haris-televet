import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

export default ({
    children,
    ...props
}) => {
    const slider = useRef(null)

    const [ active, setActive ] = useState(0)
    const [ height, setHeight ] = useState(false)

    const handleSlide = (count) => {
        let activeSlide = active + count

        const lastSlide = children.length - 1

        // If target slide is < first slide, reset to last slide
        if (activeSlide < 0) {
            activeSlide = lastSlide
        }

        // If target slide is > last slide, reset to first slide
        if (activeSlide > lastSlide) {
            activeSlide = 0
        }
        
        // Get height of the target slide
        const height = slider.current.children.item(activeSlide).clientHeight

        setActive(activeSlide)
        setHeight(height)
    }


    useEffect(() => {
        const handleResize = () => {
            // Get height of current slide
            const curHeight = document.querySelector('.slide--active').clientHeight

            // Only set height when we need to
            if (curHeight !== height) setHeight(curHeight)
        }

        if (typeof active === `number` && !height) {
            handleResize()
        }
        
        window.addEventListener(`resize`, handleResize)

        return () => {
            window.removeEventListener(`resize`, handleResize)
        }
    }, [ height, setHeight, active ])
    return (
        <React.Fragment>
            <List
                ref={slider}
                style={{
                    height: height ? height : null
                }}
            >
                {children.map((child, index) => (
                    <Slide className={index === active ? `slide--active` : ``}>
                        {React.cloneElement(child, {
                            key: index,
                        })}
                    </Slide>
                ))}
            </List>
            <Controls>
                <Control onClick={() => handleSlide(-1)}>
                    <ControlIcon className={`invert`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28">
                        <path fillRule="evenodd" d="M18.191 8.01a1.273 1.273 0 011.8 0l5.09 5.09a1.269 1.269 0 010 1.8l-5.09 5.091a1.273 1.273 0 01-1.8-1.8l2.918-2.918H3.82a1.273 1.273 0 110-2.546h17.29L18.191 9.81a1.273 1.273 0 010-1.8z" clipRule="evenodd"/>
                    </ControlIcon>
                    <span>{`Prev`}</span>
                </Control>
                <Control onClick={() => handleSlide(1)}>
                    <span>{`Next`}</span>
                    <ControlIcon xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28">
                        <path fillRule="evenodd" d="M18.191 8.01a1.273 1.273 0 011.8 0l5.09 5.09a1.269 1.269 0 010 1.8l-5.09 5.091a1.273 1.273 0 01-1.8-1.8l2.918-2.918H3.82a1.273 1.273 0 110-2.546h17.29L18.191 9.81a1.273 1.273 0 010-1.8z" clipRule="evenodd"/>
                    </ControlIcon>
                </Control>
            </Controls>
        </React.Fragment>
    )
}

// Styled Components
const List = styled.div`
    transition: all .1s;
    height:auto;
    margin: 0 auto;
    max-width:26rem;
    position:relative;
    @media (min-width:768px) {
        transition: all .2s;
        max-width:35rem;
    }
`
const Controls = styled.div`
    display:grid;
    grid-template-columns:repeat(2, minmax(0,max-content));
    justify-content:space-between;
    color:#fff;
    margin:2rem auto 0 auto;
    max-width:26rem;
    @media (min-width:768px) {
        position:absolute;
        top:0;
        width:100%;
        color:inherit;
        max-width:100%;
        margin:0;
        height:100%;
        align-items:center;
    }
`
const Control = styled.a`
    background-color:transparent;
    cursor:pointer;
    display:grid;
    grid-template-columns:repeat(2, minmax(0,max-content));
    grid-column-gap:1rem;
    align-items:center;
    height:100%;
    @media (min-width:768px) {
        opacity:0.6;
        transition: all .2s;
        &:hover {
            opacity:1;
        }
    }
`
const ControlIcon = styled.svg`
    display:block;
    fill:#fff;
    width:1.375rem;
    &.invert {
        transform:rotate(180deg);
    }
    @media (min-width:768px) {
        fill: ${props => props.theme.color.grey[900]};
    }
`
const Slide = styled.figure`
    visibility:hidden;
    opacity:0;
    top: 0;
    left: 0;
    position: absolute;
    &.slide--active {
        visibility:visible;
        opacity:1;
        position:relative;
    }
    @media (min-width:768px) {
        transition: all .2s;
    }
`