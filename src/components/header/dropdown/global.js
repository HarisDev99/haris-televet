import React, { useEffect } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

const GlobalDropdown = ({
    items,
    open,
    setOpen,
}) => {
    useEffect(() => {
        const handleClose = (e) => {
            if (open) {
                setOpen(null)
            }
        }

        document.addEventListener(`scroll`, handleClose)

        return () => {
            document.removeEventListener(`scroll`, handleClose)
        }
    }, [ open, setOpen ])

    const mappedItems = []

    items.forEach(({
        globalDropdownColums,
        label
    }) => {
        globalDropdownColums.forEach((item) => {
            mappedItems.push({
                ...item,
                label: label.toLowerCase()
            })
        })
    })

    return (
        <Nav className={open ? `dropdown__nav--open` : ``} onMouseEnter={() => setOpen(open)} onMouseLeave={() => open && setOpen(null)}>
            <Wrapper style={{
                gridTemplateColumns: `repeat(${mappedItems.length}, minmax(0,1fr))`
            }}>
                {mappedItems.map(({
                    background,
                    links,
                    footer,
                    label
                }, index) => {

                    return (
                        <Column key={index} className={open === label ? `active` : ``} onMouseEnter={() => setOpen(label)}>
                            <ImageContainer>
                                <Banner
                                    fluid={background.localFile.childImageSharp.fluid}
                                    style={{
                                        position: ``
                                    }}
                                    objectFit={`cover`}
                                />
                            </ImageContainer>
                            <List>
                                {links.map(({
                                    type,
                                    label,
                                    linkInternal,
                                    linkExternal,
                                    scopeExternal
                                }, index) => {
                                    return (
                                        <ListItem key={index}>
                                            {type === `internal` ?
                                                <ListLink as={GatsbyLink} to={linkInternal.link} className={`sm:text--base`}>{label}</ListLink>
                                            : type === `external` ?
                                                <ListLink href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--base`}>{label}</ListLink>
                                            : null
                                            }
                                        </ListItem>
                                    )
                                })}
                            </List>
                            {footer && footer.length > 0 && <List style={{
                                marginTop: `auto`,
                            }}>
                                {footer.map(({
                                    type,
                                    label,
                                    linkInternal,
                                    linkExternal,
                                    scopeExternal
                                }, index) => {

                                    return (
                                        <ListItem key={index}>
                                            {type === `internal` ?
                                                <FooterLink as={GatsbyLink} to={linkInternal.link} className={`sm:text--sm`}>{label}</FooterLink>
                                            : type === `external` ?
                                                <FooterLink href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--sm`}>{label}</FooterLink>
                                            : null
                                            }
                                        </ListItem>
                                    )
                                })}
                            </List>}
                        </Column>
                    )
                })}
            </Wrapper>
        </Nav>
    )
}

export default GlobalDropdown

const Nav = styled.nav`
    position:absolute;
    top:100%;
    right:0;
    left:0;
    margin:0 auto;
    background-color:#fff;
    width:100%;
    max-width:1200px;
    opacity:0;
    visibility: hidden;
    transition: all .1s;
    box-shadow:0px 8px 34px rgba(103,117,139,0.27);
    border-radius:1rem;
    overflow:hidden;
    &.dropdown__nav--open {
        visibility: visible;
        opacity:1;
        z-index:2;
    }
`
const Wrapper = styled.div`
    display:grid;
`
const Column = styled.div`
    padding:1.65rem;
    display:flex;
    flex-wrap:wrap;
    flex-direction: column;
    height:100%;
    background-color:#fff;
    transition: background-color .2s;
    &.active {
        background-color:${props => props.theme.color.teal[50]};
    }
`
const List = styled.ul`
    width:100%;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    padding-top:1rem;
`
const ListItem = styled.li`
`
const ListLink = styled.a`
    font-weight:bold;
    &:hover {
        opacity:0.65;
    }
    ${Column}:last-child & {
        text-decoration: underline;
    }
    ${Column}:last-child ${ListItem}:nth-child(odd) & {
        color:${props => props.theme.color.purple[500]};
    }
`
const FooterLink = styled.a`
    color:${props => props.theme.color.purple[500]};
    font-weight:bold;
    text-decoration:underline;
    &:hover {
        opacity:0.65;
    }
`
const Banner = styled(GatsbyImage)`
    height:100%;
    width:100%;
    position:absolute;
    top:0;
    left:0;
`
const ImageContainer = styled.div`
    padding-top:100%;
    position:relative;
    border-radius:1rem;
    overflow:hidden;
    width:100%;
`