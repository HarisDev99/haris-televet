import React, { useRef, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

// Utils
import parseContet from '../utils/parseContent'

const TooltipComponent = ({
    message,
}) => {
    const [ active, setActive ] = useState(false)

    const tooltipRef = useRef()

    const handleClickOutside = useCallback((e) => {
        if ( !tooltipRef.current.contains(e.target) ) {
            setActive(false)
          }
    }, [ tooltipRef, setActive ])

    useEffect(() => {
        if ( typeof window === `undefined` ) return
        
        const screenCenter = window.innerWidth / 2
        const tooltipPos = tooltipRef.current.getBoundingClientRect().left

        if ( screenCenter > tooltipPos ) {
            tooltipRef.current.className = `${tooltipRef.current.className} tooltip-right`
        }

        if ( screenCenter < tooltipPos ) {
            tooltipRef.current.className = `${tooltipRef.current.className} tooltip-left`
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [ handleClickOutside, tooltipRef ])

    return (
        <TableTooltip ref={tooltipRef}>
            <svg onClick={() => setActive(!active)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <TableTooltipMessage className={active ? 'active' : ``}>
                {parseContet(message)}
            </TableTooltipMessage>
        </TableTooltip>
    )
}

export default TooltipComponent

const TableTooltip = styled.div`
    display:inline;
    line-height:1;
    vertical-align: middle;
    position:relative;
    text-align:left;
    & > svg {
        width:1.25rem;
        cursor:pointer;
    }
`
const TableTooltipMessage = styled.div`
    color:${props => props.theme.color.primary.dark};
    background-color:#fff;
    padding:1rem;
    position:absolute;
    width:12rem;
    box-shadow: 0px 4px 16px rgb(103 117 139 / 20%);
    border-radius:0.5rem;
    bottom:2rem;
    opacity:0;
    visibility:hidden;
    transition: all .2s;
    left:-8px;
    right:auto;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    z-index:9;
    &.active {
        opacity:1;
        visibility:visible;
    }
    &:before {
        content: "";
        width: 10px;
        height: 10px;
        margin: auto;
        left: 13px;
        right: auto;
        bottom: -2px;
        position: absolute;
        background: inherit;
        transform: rotate(45deg);
        background-color:#fff;
        display:block;
    }
    .tooltip-right & {
        left:-8px;
        right:auto;
        &:before {
            left: 13px;
            right: auto;
        }
    }
    .tooltip-left & {
        left:auto;
        right:-8px;
        &:before {
            left: auto;
            right: 13px;
        }
    }
    & * {
        font-size:1rem;
        line-height:1.25;
    }
`