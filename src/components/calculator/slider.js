import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import noUiSlider from 'nouislider'

const SliderComponent = ({
    range,
    format,
    pipsFormat,
    itemValue,
    setItemValue,
    setTextValue,
    sliderRef
}) => {
    const initialOptions = useMemo(() => {
        return {
            start: itemValue,
            range,
            connect: 'lower',
            tooltips: [ true ],
            format,
            pips: {
                mode: 'positions',
                values: [0, 50, 100],
                density: 100,
                stepped: true,
                format: pipsFormat
            },
            animate: true
        }
    }, [ itemValue, range, format, pipsFormat ])

    useEffect(() => {
        const isDefined = typeof window !== `undefined`
        if ( !isDefined ) return () => {}

        const domNode = sliderRef.current

        if ( !domNode.noUiSlider ) {
            noUiSlider.create(domNode, {
                ...initialOptions,
            })
            domNode.noUiSlider.on('change',  (values, handle, raw) => {
                setItemValue( raw[0] )
                setTextValue( raw[0] )
            })
        }
    }, [
        sliderRef,
        itemValue,
        setItemValue,
        setTextValue,
        initialOptions,
    ])
    return (
        <Wrapper ref={sliderRef} className={`.noUi-target`}></Wrapper>
    )
}

export default SliderComponent

const Wrapper = styled.div`
    border-radius: 8px;
    position: relative;
    margin:52px auto 0 auto;
    width: calc(100% - 30px);
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
        height: 8px;
    }
    .noUi-connects {
        overflow: hidden;
        z-index: 0;
        background-color:${props => props.theme.color.purple[100]};
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
    .noUi-target {
        border-radius: 8px;
        position: relative;
        margin:52px auto 0 auto;
        width: calc(100% - 30px);
        max-width:800px;
        display:block;
        z-index: 1;
    }
    .noUi-connects {
        border-radius: 8px;
    }
    .noUi-connect {
        background-color: var(--slider-color);
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
        width: 32px;
        height: 32px;
        right: -16px;
        top: -12px;
        cursor:pointer;
        outline:0;
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
        font-weight: 500;
        font-size: 13px;
        line-height: 1.05;
        text-align: center;
        white-space: pre-wrap;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
        left: 50%;
        bottom: 36px;
        padding: 8px;
        &:before {
            content: "";
            width: 10px;
            height: 10px;
            margin: auto;
            left: 0;
            right: 0;
            bottom: -4px;
            position: absolute;
            background: inherit;
            transform: rotate(45deg);
        }
    }
    .noUi-tooltip-subtitle {
        font-size:12px;
    }
    @media (min-width:1200px) {
        margin:56px auto 0 auto;
        .noUi-tooltip-subtitle {
            font-size:16px;
        }
        .noUi-value {
            font-size:16px;
        }
        .noUi-tooltip {
            font-size: 16px;
            white-space: nowrap;
        }
    }
`