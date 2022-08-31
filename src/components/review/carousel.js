import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const CarouselComponent = ({
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
        const height = slider.current.children.item(activeSlide).offsetHeight

        setActive(activeSlide)
        setHeight(height)
    }


    useEffect(() => {
        const handleResize = () => {
            // Get height of current slide
            const curHeight = document.querySelector('.slide--active').offsetHeight

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
                    <Slide key={index} className={index === active ? `slide--active` : ``}>
                        {React.cloneElement(child, {
                            key: index,
                        })}
                    </Slide>
                ))}
            </List>
            {children.length > 1 &&
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
            </Controls>}
        </React.Fragment>
    )
}

export default CarouselComponent

// Styled Components
const List = styled.div`
    transition: all .1s;
    height:auto;
    margin: 0 auto;
    position:relative;
    @media (min-width:992px) {
        transition: all .2s;
        max-width:47rem;
    }
`
const Controls = styled.div`
    display:grid;
    grid-template-columns:repeat(2, minmax(0,max-content));
    color:inherit;
    margin:2rem auto 0 auto;
    justify-content:center;
    grid-column-gap:3rem;
    width:calc(100% - 3rem);
    @media (min-width:992px) {
        grid-column-gap:0;
        justify-content:space-between;
        position:absolute;
        top:0;
        max-width:100%;
        margin:0 auto;
        height:100%;
        align-items:center;
        left:0;
        right:0;
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
    @media (min-width:992px) {
        opacity:0.6;
        transition: all .2s;
        &:hover {
            opacity:1;
        }
    }
`
const ControlIcon = styled.svg`
    display:block;
    fill: currentColor;
    width:1.375rem;
    &.invert {
        transform:rotate(180deg);
    }
`
const Slide = styled.figure`
    visibility:hidden;
    opacity:0;
    top: 0;
    left: 0;
    position: absolute;
    transition: all .2s;
    width: 100%;
    &.slide--active {
        visibility:visible;
        opacity:1;
        position:relative;
    }
    @media (min-width:992px) {
        transition: all .2s;
    }
`