import React, { useState } from 'react'
import styled from 'styled-components'
import { Link as ScrollLink } from 'react-scroll'
import { Link as GatsbyLink } from 'gatsby'

const LinkComponent = ({
    sections,
    item,
    index,
    activeIndex,
    setActiveIndex,
    currentId,
    setOpen
}) => {
    const {
        category,
        linkInternal,
        linkExternal,
        scopeExternal,
        label,
        type
    } = item

    const isDefined = typeof window !== `undefined`

    let offset = -120

    if ( isDefined && window.innerWidth < 992 ) {
        offset = -70
    }

    switch(type) {
        case `category`:
        case `internal`:
            const targetNode = type === `category` ? category : linkInternal

            const hasSection = sections.length > 0 && sections.find((id) => id === targetNode.id)

            if ( hasSection ) {
                return (
                    <Link 
                        as={ScrollLink}
                        className={`${activeIndex === index ? `active ` : ``} sm:text--base lg:text--lg`}
                        onSetActive={() => { 
                            setActiveIndex(index)
                        }}
                        onClick={() => setOpen(false)}
                        to={targetNode.slug} 
                        smooth={true} 
                        spy={true} 
                        aria-label={`Navigate to ${label} section`} 
                        offset={offset}
                    >
                        {label}
                    </Link>
                )
            }

            const isActivePage = !sections.length && currentId === targetNode.id ? ` active sm:text--base lg:text--lg` : `sm:text--base lg:text--lg`

            return <Link as={GatsbyLink} className={isActivePage} to={targetNode.uri} aria-label={`Navigate to ${label}`}>{label}</Link>
        case `external`:
            return <Link className={`sm:text--base lg:text--lg`} href={linkExternal} aria-label={`Navigate to ${label}`} target={scopeExternal ? `_blank` : ``}>{label}</Link>
        default:
            return null
        
    }
}

const NavComponent = ({
    items,
    currentId,
    sections = []
}) => {
    const [ activeIndex, setActiveIndex ] = useState(0)

    const [ isOpen, setOpen ] = useState(false)

    let activeItem = items[activeIndex].label

    if ( !sections.length ) {
        for ( const targetItem of items ) {
            const {
                type,
                category,
                linkInternal,
                label
            } = targetItem

            const isCat = type === `category`
            const targetNode = isCat ? category : linkInternal

            if ( targetNode.id === currentId ) {
                activeItem = label
                break
            }
        }
    }

    return (
        <>
        <Nav role={`navigation`} aria-label={`Resource Section Menu`} className={isOpen ? `nav-active` : ``}>
            <Toggle onClick={() => setOpen(!isOpen)}>
                {activeItem}
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.707 1.707A1 1 0 0012.293.293L7 5.586 1.707.293A1 1 0 00.293 1.707l6 6a1 1 0 001.414 0l6-6z"/>
                </svg>
            </Toggle>
            <List>
                {items.map((item, index) => {
                    return (
                        <Item key={index}>
                            <LinkComponent
                                item={item}
                                sections={sections}
                                index={index}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                                currentId={currentId}
                                isOpen={isOpen}
                                setOpen={setOpen}
                            />
                        </Item>
                    )
                })}
            </List>
        </Nav>
        </>
    )
}

export default NavComponent

const Toggle = styled.button`
    height:3rem;
    padding:0 1.5rem;
    background-color:transparent;
    cursor:pointer;
    diplay:flex;
    flex-wrap:wrap;
    align-items:center;
    svg {
        margin-left:0.45rem;
        height:0.35rem;
        position:relative;
        top:-2px;
        transition: all .15s;
        .nav-active & {
            transform:rotate(-180deg);
        }
    }
    width:100%;
    @media (min-width:992px) {
        display:none;
    }
`
const Nav = styled.div`
    width: 100%;
    background-color:${props => props.theme.color.grey[100]};
    z-index:6;
    position:sticky;
    top:70px;
    transition:all .1s;
    display:block;
    @media (min-width:992px) {
        top:100px;
        display:block;
        overflow-x:auto;
    }
`
const List = styled.ul`
    display:grid;
    max-height:0;
    overflow:hidden;
    transition: all .2s;
    position:absolute;
    top:100%;
    left:0;
    width:100%;
    background-color:${props => props.theme.color.grey[50]};
    padding:0 1.5rem;
    .nav-active & {
        max-height:1000px;
    }
    @media (min-width:992px) {
        max-height:initial;
        .nav-active & {
            max-height:initial;
        }
        position:relative;
        top:auto;
        left:auto;
        justify-content:center;
        display:flex;
        column-gap:1rem;
    }
`
const Item = styled.li`
    flex: 0 0 auto;
`
const Link = styled.a`
    cursor:pointer;
    display:flex;
    background:transparent;
    outline:0;
    padding:0 0 1rem 0;
    li:first-child & {
        margin-top:1rem;
    }
    justify-content:center;
    @media (min-width:992px) {
        li:first-child & {
            margin-top:0;
        }
        justify-content:start;
        color:${props => props.theme.color.primary.dark};
        box-shadow:none;
        transition: all .2s;
        padding:1rem 1rem;
        font-weight:bold;
        &.active {
            box-shadow: inset 0px -4px 0px 0px ${props => props.theme.color.teal[400]};
        }
    }
`