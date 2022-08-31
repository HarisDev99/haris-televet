import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

// Assets
import Empathy from '../images/icons/empathy.svg'

const FeaturesComponent = ({
    items = [
        {
            title: `Ease`,
            description: `Since wireframe renderings are relatively simple and`,
        }
    ],
    align,
    size,
}) => {
    const className = classNames({
        'feature--center': align === `center`,
        'feature--large': size === `large`
    })

    return (
        <List>
            {items.map(({
                title = `Ease`,
                description = `Since wireframe renderings are relatively simple and`,
                icon = <Empathy/>
            }, index) => (
                <Item
                    key={index}
                    className={className}
                >
                    <Icon>{icon}</Icon>
                    <h3 className={`sm:text--xl`}>{title}</h3>
                    <p className={`sm:text--lg`}>{description}</p>
                </Item>
            ))}
        </List>
    )
}

export default FeaturesComponent

// Styled Components
const List = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    justify-content:space-between;
    grid-row-gap:3.875rem;
    @media (min-width:992px) {
        align-items: start;
        grid-column-gap:1rem;
        grid-template-columns:repeat(3,minmax(0,max-content));
    }
`
const Item = styled.li`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    text-align:center;
    justify-items:center;
    @media (min-width:992px) {
        max-width:16.5rem;
        margin:0 auto;
        text-align:left;
        justify-items:start;
        &.feature--center {
            text-align:center;
            justify-items:center;
        }
        &.feature--large {
            max-width:17.75rem;
        }
    }
`
const Icon = styled.div`
    svg {
        height:3.5rem;
    }
`