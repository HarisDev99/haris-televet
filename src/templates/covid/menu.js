import React from 'react'
import styled from 'styled-components'
import { Link as ScrollLink } from 'react-scroll'

const MenuComponent = ({
    items = [{
        label: ``,
        id: ``,
    }]
}) => {
    return (
        <Nav role={`navigation`} aria-label={`Covid-19 Section Menu`}>
            <List>
                {items.map(({
                    label,
                    id
                }, index) => (
                    <Item key={index}>
                        <Link to={id} smooth={true} spy={true} aria-label={`Navigate to ${label} section`} offset={-152}>{label}</Link>
                    </Item>
                ))}
            </List>
        </Nav>
    )
}

export default MenuComponent

// Styled Components
const Nav = styled.div`
    width: 100%;
    overflow-x:auto;
    background-color:${props => props.theme.color.grey[100]};
    @media (min-width:992px) {
        position:sticky;
        top:100px;
        z-index:3;
    }
`
const List = styled.ul`
    display:flex;
    column-gap:1rem;
    @media (min-width:992px) {
        justify-content:center;
    }
`
const Item = styled.li`
    flex: 0 0 auto;
`
const Link = styled(ScrollLink)`
    color:${props => props.theme.color.primary.dark};
    box-shadow:none;
    transition: all .2s;
    cursor:pointer;
    padding:1rem 1.25rem;
    font-weight:700;
    background:transparent;
    outline:0;
    display:flex;
    &:hover {
        box-shadow: inset 0px -3px 0px 0px ${props => props.theme.color.primary.dark};
    }
`