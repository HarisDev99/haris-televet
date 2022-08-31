import React, { useRef } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

const MenuItemComponent = ({
    children,
    type,
    label,
    linkInternal,
    linkExternal,
    scopeExternal,
    dropdown,
    iconColumns,
    imageColumns,
    logoColumns,
    setGlobalDropdownState,
}) => {
    const dropdownRef = useRef(null)

    switch (type) {
        case `external`:
            return (
                <React.Fragment>
                    <Link href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--lg lg:text--base 2xl:text--lg link--color`}>
                        {children}
                        {label}
                    </Link>
                </React.Fragment>
            )
        case `internal`:
            return (
                <React.Fragment>
                    <Link as={GatsbyLink} to={linkInternal.link} className={`sm:text--lg lg:text--base 2xl:text--lg link--color`}>
                        {children}
                        {label}
                    </Link>
                </React.Fragment>
            )
        case `dropdown`:
        case `icon`:
        case `image`:
        case `logo`:
        case `global`:
            return (
                <DropdownWrapper 
                    ref={dropdownRef} 
                    className={type === `dropdown` || type === `image` || type === `logo` ? `relative` : null}
                    onMouseEnter={() => {
                        if (type === `global`) {
                            return setGlobalDropdownState(label.toLowerCase())
                        }
                    }}
                    onMouseLeave={() => {
                        if (type === `global`) {
                            return setGlobalDropdownState(null)
                        }
                    }}
                >
                    <DropdownToggle className={`sm:text--lg lg:text--base 2xl:text--lg link--color`}>
                        {children}
                        <DropdownLabel>
                            {label}
                            <Chevron fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.707 1.707A1 1 0 0012.293.293L7 5.586 1.707.293A1 1 0 00.293 1.707l6 6a1 1 0 001.414 0l6-6z"/>
                            </Chevron>
                        </DropdownLabel>
                    </DropdownToggle>
                    {type === `dropdown` &&
                        <DropdownNav className={`dropdown-nav`}>
                            <DropdownMenu>
                                {dropdown.map(({
                                    type,
                                    label,
                                    linkInternal,
                                    linkExternal,
                                    scopeExternal
                                }, index) => (
                                    <DropdownMenuItem key={index}>
                                    {type === `internal` ?
                                        <DropdownMenuLink as={GatsbyLink} to={linkInternal.link} className={`sm:text--lg lg:text--base 2xl:text--lg`}>{label}</DropdownMenuLink>
                                    :
                                        <DropdownMenuLink href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--lg lg:text--base 2xl:text--lg`}>{label}</DropdownMenuLink>
                                    }
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenu>
                        </DropdownNav>
                    }
                    {type === `logo` &&
                        <LogoColumnNav className={`dropdown-nav`}>
                            <LogoColumnMenu>
                                {logoColumns.map(({
                                    image,
                                    type,
                                    label,
                                    linkInternal,
                                    linkExternal,
                                    scopeExternal
                                }, index) => (
                                    <LogoColumnItem key={index} className={`content-center`}>
                                        <LogoColumnImage fluid={image.localFile.childImageSharp.fluid} alt={image.title || image.altText} objectFit={`contain`}/>
                                        {type === `internal` ?
                                            <IconColumnLink as={GatsbyLink} to={linkInternal.link} className={`sm:text--lg lg:text--base 2xl:text--lg`} aria-label={`Navigate to ${label}`}></IconColumnLink>
                                        :
                                            <IconColumnLink href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--lg lg:text--base 2xl:text--lg`} aria-label={`Navigate to ${label}`}></IconColumnLink>
                                        }
                                    </LogoColumnItem>
                                ))}
                            </LogoColumnMenu>
                        </LogoColumnNav>
                    }
                    {type === `icon` &&
                        <IconColumnNav className={`dropdown-nav`}>
                            <IconColumnMenu>
                                {iconColumns.map(({
                                    image,
                                    type,
                                    label,
                                    description,
                                    linkInternal,
                                    linkExternal,
                                    scopeExternal
                                }, index) => (
                                    <IconColumnItem key={index}>
                                        <IconColumnImage src={image.localFile.publicURL} alt="" loading={`lazy`}/>
                                        <IconColumnHeader>
                                            <IconColumnTitle className={`sm:text--lg`}>{label}</IconColumnTitle>
                                            <IconColumnDescription className={`sm:text--sm`}>{description}</IconColumnDescription>
                                        </IconColumnHeader>
                                        {type === `internal` ?
                                            <IconColumnLink as={GatsbyLink} to={linkInternal.link} className={`sm:text--lg lg:text--base 2xl:text--lg`} aria-label={`Navigate to ${label}`}></IconColumnLink>
                                        :
                                            <IconColumnLink href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--lg lg:text--base 2xl:text--lg`} aria-label={`Navigate to ${label}`}></IconColumnLink>
                                        }
                                    </IconColumnItem>
                                ))}
                            </IconColumnMenu>
                        </IconColumnNav>
                    }
                    {type === `image` &&
                        <ImageColumnNav className={`dropdown-nav`}>
                            <ImageColumnMenu>
                                {imageColumns.map(({
                                    image,
                                    type,
                                    label,
                                    description,
                                    linkInternal,
                                    linkExternal,
                                    scopeExternal
                                }, index) => (
                                    <ImageColumnItem key={index}>
                                        <ImageColumnImage src={image.localFile.childImageSharp.resize.src} alt={image.title || image.altText} loading={`lazy`}/>
                                        <IconColumnTitle className={`sm:text--lg`}>{label}</IconColumnTitle>
                                        <ImageColumnContent>
                                            <p className={`sm:text--sm`}>{description}</p>
                                        </ImageColumnContent>
                                        {type === `internal` ?
                                            <IconColumnLink as={GatsbyLink} to={linkInternal.link} className={`sm:text--lg lg:text--base 2xl:text--lg`} aria-label={`Navigate to ${label}`}></IconColumnLink>
                                        :
                                            <IconColumnLink href={linkExternal} target={scopeExternal && `_blank`} className={`sm:text--lg lg:text--base 2xl:text--lg`} aria-label={`Navigate to ${label}`}></IconColumnLink>
                                        }
                                    </ImageColumnItem>
                                ))}
                            </ImageColumnMenu>
                        </ImageColumnNav>
                    }
                </DropdownWrapper>
            )
        default: return null
    }
}

export default MenuItemComponent

// Styled Components
const Link = styled.a`
    font-weight:600;
    height:100%;
    min-width:5.25rem;
    display: flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content: center;
    padding:0 0.5rem;
    svg {
        transition: all .1s;
        fill:${props => props.theme.color.primary.dark};
        margin-right:1rem;
    }
    &:hover svg {
        fill:${props => props.theme.color.teal[500]};
    }
    @media (min-width:1200px) {
        padding:0 1rem;
    }
`
const DropdownWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    height:100%;
    align-items:center;
    .dropdown-nav:hover {
        visibility: visible;
        opacity:1;
        z-index:2;
    }
`
const DropdownToggle = styled.div`
    font-weight:600;
    height:100%;
    min-width:5.25rem;
    padding:0 0.5rem;
    display: grid;
    grid-template-columns:repeat(2, minmax(0, max-content));
    grid-column-gap:1rem;
    align-items:center;
    justify-content: center;
    cursor:pointer;
    svg {
        transition: all .1s;
        fill:${props => props.theme.color.primary.dark};
    }
    &:hover svg {
        fill:${props => props.theme.color.teal[500]};
    }
    &:hover ~ .dropdown-nav {
        visibility: visible;
        opacity:1;
        z-index:2;
    }
    @media (min-width:1200px) {
        padding:0 1rem;
    }
`
const Chevron = styled.svg`
    width:0.5rem;
`
const LogoColumnNav = styled.nav`
    position:absolute;
    top:100%;
    right:0;
    left:-240px;
    margin:0 auto;
    background-color:${props => props.theme.color.grey[50]};
    width:600px;
    opacity:0;
    visibility: hidden;
    transition: all .1s;
    box-shadow:0px 8px 34px rgba(103,117,139,0.27);
    border-radius:1rem;
    overflow:hidden;
`
const LogoColumnImage = styled(GatsbyImage)`
    width:100%;
    height:4rem;
`
const LogoColumnMenu = styled.ul`
    display:grid;
    grid-template-columns:repeat(3,minmax(0,1fr));
    align-items:start;
`
const LogoColumnItem = styled.li`
    text-align:center;
    padding:1rem;
    background-color:transparent;
    transition: background .1s;
    position:relative;
    height: 100%;
    display:grid;
    justify-items: center;
    grid-row-gap:0.5rem;
    align-content: start;
    &.content-center {
        align-content: center;
    }
    &:hover {
        background-color: ${props => props.theme.color.teal[50]};
    }
`
const ImageColumnNav = styled.nav`
    position:absolute;
    top:100%;
    left:0;
    background-color:${props => props.theme.color.grey[50]};
    width:32rem;
    opacity:0;
    visibility: hidden;
    transition: all .1s;
    box-shadow:0px 8px 34px rgba(103,117,139,0.27);
    border-radius:1rem;
    overflow:hidden;
`
const ImageColumnMenu = styled.ul`
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    align-items:start;
`
const ImageColumnItem = styled.li`
    padding:1.5rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    align-items:start;
    transition: background .1s;
    background-color:transparent;
    position:relative;
    height: 100%;
    align-content: start;
    &:hover {
        background-color:${props => props.theme.color.teal[50]};
    }
`
const ImageColumnContent = styled.div`
    max-width:10rem;
    margin:0 auto;
    text-align:center;
`
const ImageColumnImage = styled.img`
    width:100%;
    height:190px;
    object-fit:contain;
`
const IconColumnNav = styled.nav`
    position:absolute;
    top:100%;
    right:0;
    left:0;
    margin:0 auto;
    background-color:${props => props.theme.color.grey[50]};
    max-width:1216px;
    width:100%;
    opacity:0;
    visibility: hidden;
    transition: all .1s;
    box-shadow:0px 8px 34px rgba(103,117,139,0.27);
    border-radius:1rem;
    overflow:hidden;
`
const IconColumnHeader = styled.div`
    width:100%;
`
const IconColumnTitle = styled.h3`
    line-height:1.2;
    margin:0.5rem 0;
`
const IconColumnDescription = styled.p`
    max-width:10rem;
`
const IconColumnMenu = styled.ul`
    display:grid;
    grid-template-columns:repeat(6,minmax(0,1fr));
    align-items:start;
`
const IconColumnItem = styled.li`
    text-align:left;
    padding:2rem 1rem 2rem 1rem;
    background-color:transparent;
    transition: background .1s;
    position:relative;
    height: 100%;
    grid-template-columns: minmax(0,1fr);
    align-content: start;
    &:hover {
        background-color: ${props => props.theme.color.teal[50]};
    }
`
const IconColumnImage = styled.img`
    height:4rem;
    margin-bottom:2.5rem;
`
const IconColumnLink = styled.a`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    padding: 0 1rem;
`
const DropdownLabel = styled.span`
    display: grid;
    grid-template-columns:repeat(2, minmax(0, max-content));
    align-items:center;
    grid-column-gap:0.5rem;
`
const DropdownNav = styled.nav`
    position:absolute;
    top:100%;
    right:0;
    background-color:#fff;
    width:13rem;
    opacity:0;
    visibility: hidden;
    transition: all .1s;
    box-shadow:0px 6px 24px rgba(103,117,139,0.15);
    &:before {
        content: "";
        display: block;
        position: absolute;
        top: -1rem;
        right: 1rem;
        border-left: 1rem solid transparent;
        border-right: 1rem solid transparent;
        border-bottom: 1rem solid ${props => props.theme.color.grey[200]};
    }
`
const DropdownMenu = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    text-align: left;
`
const DropdownMenuItem = styled.li`
    border-bottom:1px solid ${props => props.theme.color.grey[200]};
    &:last-child {
        border-bottom:none;
    }
`
const DropdownMenuLink = styled.a`
    width:100%;
    font-weight:600;
    display:flex;
    padding:1rem;
    background-color:transparent;
    transition: background-color .1s;
    &:hover {
        background-color:${props => props.theme.color.grey[50]};
    }
`