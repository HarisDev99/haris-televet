import React, { useEffect } from 'react'
import styled from 'styled-components'
import noUiSlider from 'nouislider'

import SliderSvg from '../../images/slider.svg'

const SliderComponent = ({
    range,
    format,
    value,
    setValue,
    sliderRef,
    setTextValue,
}) => {
    useEffect(() => {
        const isDefined = typeof window !== `undefined`
        if ( !isDefined ) return () => {}

        const domNode = sliderRef.current

        if ( !domNode.noUiSlider ) {
            noUiSlider.create(domNode, {
                start: value,
                range,
                format,
                animate: true,
                tooltips: [ true ],
            })

            domNode.noUiSlider.on('change',  (values, handle, raw) => {
                const payload = Math.round( raw[0] )

                setValue(payload)
            })
        }
    }, [
        sliderRef,
        setValue,
        setTextValue,
        value,
        format,
        range
    ])
    return (
        <Wrapper ref={sliderRef} className={`.noUi-target`}></Wrapper>
    )
}

export default SliderComponent

const Wrapper = styled.div`
    position: relative;
    margin:3rem auto 0 auto;
    width: 100%;
    max-width:800px;
    display:block;
    z-index: 1;
    --slider-color: ${props => props.theme.color.purple[600]};
    .noUi-base, .noUi-connects {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }
    .noUi-base {
        height: 10px;
        @media (min-width:992px) {
            height:25px;
        }
    }
    .noUi-connects {
        overflow: hidden;
        z-index: 0;
        background-size: cover;
        height:10px;
        background-repeat: no-repeat;
        background-image: url(${SliderSvg});
        background-position: 50%;
        @media (min-width:992px) {
            height:25px;
            background-size: 100% 100%;
        }
    }
    .noUi-connect, .noUi-origin {
        will-change: transform;
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        -ms-transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        -webkit-transform-style: preserve-3d;
        transform-origin: 0 0;
        transform-style: flat;
    }
    .noUi-connect {
        height: 100%;
        width: 100%;
    }
    .noUi-origin {
        height: 10%;
        width: 10%;
    }
    .noUi-txt-dir-rtl.noUi-horizontal .noUi-origin {
        left: 0;
        right: auto;
    }
    .noUi-horizontal .noUi-origin {
        height: 0;
    }
    .noUi-handle {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        position: absolute;
    }
    .noUi-touch-area {
        height: 100%;
        width: 100%;
    }
    &.noUi-state-tap .noUi-connect,
    &.noUi-state-tap .noUi-origin {
        -webkit-transition: transform 0.3s;
        transition: transform 0.3s;
    }
    .noUi-txt-dir-rtl.noUi-horizontal .noUi-handle {
        left: -17px;
        right: auto;
    }
    .noUi-connects {

    }
    .noUi-connect {

    }
    .noUi-draggable {
        cursor: ew-resize;
    }
    .noUi-vertical .noUi-draggable {
        cursor: ns-resize;
    }
    .noUi-handle {
        border-radius: 50%;
        background-color: #FFF;
        cursor: default;
        border: 6px solid var(--slider-color);
        width: 28px;
        height: 28px;
        right: -14px;
        top: -9px;
        cursor:pointer;
        outline:0;
        box-shadow: 0px 2px 18px rgba(79, 37, 114, 0.4);
        @media (min-width:992px) {
            top: -2px;
        }
    }
    .noUi-pips {
        position: relative;
        height:36px;
        width:100%;
    }
    .noUi-value {
        position: absolute;
        white-space: nowrap;
        text-align: center;
        color: #7D90B8;
        bottom: 0;
        -webkit-transform: translate(-50%);
        transform: translate(-50%);
        font-size:12px;
    }
    .noUi-tooltip {
        display: block;
        position: absolute;
        border-radius: 4px;
        background-color: var(--slider-color);
        color: #fff;
        min-width:32px;
        font-weight: 700;
        font-size: 13px;
        letter-spacing: 1px;
        line-height: 1.05;
        text-align: center;
        white-space: pre-wrap;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
        left: 50%;
        bottom: 28px;
        padding: 5px;
        &:before {
            content: "";
            width: 6px;
            height: 6px;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -3px;
            position: absolute;
            background: inherit;
            transform: rotate(45deg);
        }
    }
    .noUi-tooltip-subtitle {
        font-size:12px;
    }
    @media (min-width:992px) {
        margin:0 auto 0 auto;
        .noUi-tooltip-subtitle {
            font-size:13px;
        }
        .noUi-value {
            font-size:13px;
        }
        .noUi-tooltip {
            white-space: nowrap;
        }
    }
`