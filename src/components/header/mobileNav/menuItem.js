import React, { useState, useRef, useEffect } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'

const NavMenuItemComponent = ({
    children,
    type,
    label,
    linkInternal,
    linkExternal,
    dropdown,
    iconColumns,
    imageColumns,
    logoColumns,
    globalDropdownColums,
    scopeExternal
}) => {
    const [ open, setOpen ] = useState(false)
    const [ height, setHeight ] = useState(0)

    const dropdownRef = useRef(null)
    const menuRef = useRef(null)

    const handleToggle = (e) => {
        setOpen(!open)

        if (!open) {
            const height = menuRef.current.clientHeight

            setHeight(height)
        } else {
            setHeight(0)
        }
    }

    useEffect(() => {
        const handleClick = (e) => {
            if (open) {
                const isParent = dropdownRef.current.contains(e.target)

                if (!isParent) {
                    setHeight(0)
                    setOpen(false)
                }
            }
        }

        const handleScroll = (e) => {
            if (open) {
                setHeight(0)
                setOpen(false)
            }
        }

        document.addEventListener(`mousedown`, handleClick)
        document.addEventListener(`scroll`, handleScroll)

        return () => {
            document.removeEventListener(`mousedown`, handleClick)
            document.removeEventListener(`scroll`, handleScroll)
        }
    },[ dropdownRef, open, setOpen ])

    switch (type) {
        case `external`:
            return (
                <React.Fragment>
                    <Link href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--xl link--color`}>
                        {children}
                        {label}
                    </Link>
                </React.Fragment>
            )
        case `internal`:
            return (
                <React.Fragment>
                    <Link as={GatsbyLink} to={linkInternal.link} className={`sm:text--xl link--color`}>
                        {children}
                        {label}
                    </Link>
                </React.Fragment>
            )
        default:
            let targetItems

            switch (type) {
                case `dropdown`:
                    targetItems = dropdown
                    break
                case `icon`:
                    targetItems = iconColumns
                    break
                case `image`:
                    targetItems = imageColumns
                    break
                case `logo`:
                    targetItems = logoColumns
                    break
                case `global`:
                    let globalItems = []
                    let footerItems = []

                    globalDropdownColums.forEach(({
                        links,
                        footer
                    }) => {
                        const targetLinks = links ? links : []
                        const targetFooter = footer ? footer : []
                        
                        globalItems = [
                            ...globalItems,
                            ...targetLinks,
                        ]

                        footerItems = [
                            ...footerItems,
                            ...targetFooter
                        ]
                    })

                    targetItems = [
                        ...globalItems,
                        ...footerItems
                    ]
                    break
                default:
                    targetItems = []
            }

            return (
                <DropdownWrapper ref={dropdownRef}>
                    <DropdownToggle onClick={handleToggle} className={`sm:text--xl link--color`}>
                        {children}
                        <DropdownLabel>
                            {label}
                            <Chevron fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.707 1.707A1 1 0 0012.293.293L7 5.586 1.707.293A1 1 0 00.293 1.707l6 6a1 1 0 001.414 0l6-6z"/>
                            </Chevron>
                        </DropdownLabel>
                    </DropdownToggle>
                    <DropdownNav style={{
                        height: `${height}px`
                    }}>
                        <DropdownMenu ref={menuRef}>
                            {targetItems.map(({
                                type,
                                label,
                                linkInternal,
                                linkExternal,
                                scopeExternal
                            }, index) => (
                                <DropdownMenuItem key={index}>
                                {type === `internal` ?
                                    <DropdownMenuLink as={GatsbyLink} to={linkInternal.link} className={`sm:text--lg`}>{label}</DropdownMenuLink>
                                :
                                    <DropdownMenuLink href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--lg`}>{label}</DropdownMenuLink>
                                }
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenu>
                    </DropdownNav>
                </DropdownWrapper>
            )
    }
}

export default NavMenuItemComponent

// Styled Components
const Link = styled.a`
    font-weight:600;
    display:flex;
    flex-wrap:flex-wrap;
    align-items:center;
    svg {
        margin-right:1rem;
        fill:${props => props.theme.color.primary.dark};
    }
`
const DropdownWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    position:relative;
    overflow:hidden;
`
const DropdownToggle = styled.div`
    font-weight:600;
    height:100%;
    display: grid;
    grid-template-columns:repeat(2, minmax(0, max-content));
    grid-column-gap:1rem;
    align-items:center;
    cursor:pointer;
    svg {
        transition: all .1s;
        fill:${props => props.theme.color.primary.dark};
    }
    &:hover svg {
        fill:${props => props.theme.color.teal[500]};
    }
`
const Chevron = styled.svg`
    width:0.5rem;
`
const DropdownLabel = styled.span`
    display: grid;
    grid-template-columns:repeat(2, minmax(0, max-content));
    align-items:center;
    grid-column-gap:0.5rem;
`
const DropdownNav = styled.nav`
    position:relative;
    transition: height .15s;
    width:100%;
`
const DropdownMenu = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    text-align: left;
    padding-top:1rem;
`
const DropdownMenuItem = styled.li`
`
const DropdownMenuLink = styled.a`
    width:100%;
    font-weight:600;
    display:flex;
    padding-left:1rem;
    background-color:transparent;
    transition: background-color .15s;
    &:hover {
        background-color:${props => props.theme.color.grey[50]};
    }
`