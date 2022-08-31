import React from 'react'
import styled from 'styled-components'

// Components
import MenuItem from './menuItem'

const NavButtonComponent = ({
    menuMain,
}) => {
    return (
        <Menu>
            {menuMain.map((options, index) => (
                <Item key={index}>
                    <MenuItem
                        {...options}
                    >
                        {options.icon && options.icon === `login` && <svg fill="none" xmlns="http://www.w3.org/2000/svg" height="24"  width="24" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0z"/>
                            <path d="M16 15a1 1 0 00-1-1H9a1 1 0 00-1 1v6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-2v-6z"/>
                        </svg>}
                    </MenuItem>
                </Item>
            ))}
        </Menu>
    )
}

export default NavButtonComponent

// Styled Components
const Menu = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.75rem;
`
const Item = styled.li`

`