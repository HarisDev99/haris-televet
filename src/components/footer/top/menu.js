import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

const MenuComponent = ({
    items
}) => {
    return (
        <List>
            {items.map(({
                label,
                linkExternal,
                linkInternal,
                type,
                scopeExternal,
            }, index) => (
                <Item key={index}>
                    {type === `internal` ?
                        <Link 
                            as={GatsbyLink} 
                            to={`${linkInternal.link}`}
                            className={`sm:text--lg link--underline`}
                        >
                            {label}
                        </Link>
                    :
                        <Link 
                            href={linkExternal}
                            className={`sm:text--lg link--underline`}
                            target={scopeExternal && `_blank`}
                        >
                            {label}
                        </Link>
                    }
                </Item>
            ))}
        </List>
    )
}

export default MenuComponent

// Styled Components
const List = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
`
const Item = styled.li`

`
const Link = styled.a`
`
