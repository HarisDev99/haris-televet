import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

import TooltipComponent from './tooltip'

const ToggleComponent = ({
    active,
    setActive,
    items
}) => {
    return (
        <ToggleWrapper>
            <ToggleLabel className={classNames(
                'sm:text--base',
                {
                    'pricing__tab--active': active === 0,
                    'pricing__tab--tooltip': items[0].tooltip && items[0].tooltip.enable
                }
            )} onClick={() => setActive(0)}>
                {items[0].label}
                {items[0].tooltip && items[0].tooltip.enable && <TooltipComponent message={items[0].tooltip.description}/>}
            </ToggleLabel>
                <ToggleButton className={active === 0 && `pricing__toggle-active`} onClick={() => setActive(active === 0 ? 1 : 0)} aria-label={`Toggle billing periods`}/>
            <ToggleLabel className={classNames(
                'sm:text--base',
                {
                    'pricing__tab--active': active === 1,
                    'pricing__tab--tooltip': items[1].tooltip && items[1].tooltip.enable
                }
            )} onClick={() => setActive(1)}>
                {items[1].label}
                {items[1].tooltip && items[1].tooltip.enable && <TooltipComponent message={items[1].tooltip.description}/>}
            </ToggleLabel>
        </ToggleWrapper>
    )
}

export default ToggleComponent

const ToggleWrapper = styled.div`
    display:grid;
    grid-column-gap:0.875rem;
    align-items:center;
    grid-template-columns: minmax(0,100px) minmax(0,max-content) minmax(0,100px);
    justify-content: center;
    @media (min-width:992px) {
        justify-content: start;
        grid-column-gap:1rem;
        grid-template-columns:repeat(3,minmax(0,max-content));
    }
`
const ToggleLabel = styled.span`
    cursor:pointer;
    text-align:center;
    line-height:1.25;
    color:${props => props.theme.color.grey[600]};
    &.pricing__tab--tooltip > div  {
        margin-left:0.5rem;
    }
    &.pricing__tab--active {
        color:${props => props.theme.color.primary.dark};
    }
`
const ToggleButton = styled.button`
    width:2.5rem;
    height:1rem;
    background-color:${props => props.theme.color.grey[300]};
    position:relative;
    border-radius:1.375rem;
    cursor:pointer;
    transition: all .15s;
    &:after {
        display:block;
        position:absolute;
        content:'';
        height:22px;
        width:22px;
        background-color:#fff;
        border-radius:50%;
        border:1px solid ${props => props.theme.color.grey[400]};
        box-shadow: 0px 4px 16px rgba(103, 117, 139, 0.15);
        right:-1px;
        top:-3px;
        transition: all .15s;
    }
    &.pricing__toggle-active {
        background-color:${props => props.theme.color.teal[500]};
        &:after {
            right:calc(100% - 20px);
        }
    }
`