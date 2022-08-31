import React, { useState } from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink} from 'gatsby'
import useGoogleOptimize from '@react-hook/google-optimize'

// Component
import MenuItem from './menuItem'
import GlobalDropdown from './dropdown/global'

const NavButtonComponent = ({
    cta,
}) => {
    const variantList = cta.splitToggle ? 
        [ cta.label, ...cta.splitVariants.map(({ label }) => label) ] : []
    
    const splitId = cta.splitId ? cta.splitId : ``

    const HeaderVariant = useGoogleOptimize(splitId, variantList)

    return (
        cta.type === `internal` ?
            <GatsbyLink to={cta.linkInternal.link} className={`button button--secondary sm:text--lg lg:text--base 2xl:text--lg sm:d-none xl:d-block`} id={`header__cta`}>{HeaderVariant ? HeaderVariant : cta.label}</GatsbyLink>
        :
            <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--secondary sm:text--lg lg:text--base 2xl:text--lg sm:d-none xl:d-block`} id={`header__cta`}>{HeaderVariant ? HeaderVariant : cta.label}</a>
    )
}

const NavComponent = ({
    menuMain,
    menuCta,
}) => {
    const globalMenuItems = menuMain.filter((item) => item.type === `global`)

    const [ globalDropdownState, setGlobalDropdownState ] = useState(null)

    return (
        <React.Fragment>
            <Nav>
                <List>
                    {menuMain.map((options, index) => {
                        return (
                            <Item key={index}>
                                <MenuItem
                                    {...options}
                                    setGlobalDropdownState={setGlobalDropdownState}
                                >
                                    {options.icon && options.icon === `login` && <svg fill="none" xmlns="http://www.w3.org/2000/svg" height="24"  width="24" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"/>
                                        <path d="M16 15a1 1 0 00-1-1H9a1 1 0 00-1 1v6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-2v-6z"/>
                                    </svg>}
                                </MenuItem>
                            </Item>
                        )
                    })}
                </List>
            </Nav>
            <NavButtonComponent
                cta={menuCta[0]}
            />
            {globalMenuItems.length > 0 &&
                <GlobalDropdown
                    items={globalMenuItems}
                    open={globalDropdownState}
                    setOpen={setGlobalDropdownState}
                />
            }
        </React.Fragment>
    )
}

export default NavComponent

// Styled Components
const Nav = styled.nav`
    display:none;
    @media (min-width:1200px) {
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        justify-content:center;
        text-align:center;
        margin-left:auto;
        height:100%;
    }
`
const List = styled.ul`
    display:flex;
    flex-wrap:wrap;
    height:100%;
    align-items:center;
`
const Item = styled.li`
    display:flex;
    flex-wrap:wrap;
    height:100%;
    align-items:center;
`