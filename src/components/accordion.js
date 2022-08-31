import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

// Utils
import parseContent from '../utils/parseContent'

const AccordianComponent = ({
    items = [
        {
            title: `How many times do I need to pay per month? `,
            description:`<p>The navigation design should communicate the relationship between the links it contains so that users understand the options they have for navigating the site.</p>`
        }, {
            title: `How many times do I need to pay per month? `,
            description:`<p>The navigation design should communicate the relationship between the links it contains so that users understand the options they have for navigating the site.</p>`
        }, {
            title: `How many times do I need to pay per month? `,
            description:`<p>The navigation design should communicate the relationship between the links it contains so that users understand the options they have for navigating the site.</p>`
        }
    ],
    start = null
}) => {
    // If designated start slide is not valid, return closet match.
    // Else return start slide
    const initialSlide = start < 0 ? 0 : start > items.length - 1 ? items.length - 1 : start
    
    const [ active, setActive ] = useState(initialSlide)
    const [ height, setHeight ] = useState(null)

    const wrapper = useRef(null)

    const handleToggle = (target) => {
        const targetHeight = wrapper.current.children.item(target).querySelector(`.accordion__content`).offsetHeight

        // If target is already active, toggle the visibility
        if (target === active) {
            setActive(null)
            return setHeight(0)
        }
        
        setActive(target)
        setHeight(targetHeight)
    }

    useEffect(() => {
        const handleResize = () => {
            if (typeof active === `number`) {
                const targetHeight = document.querySelector(`.accordion--active .accordion__content`).offsetHeight

                if (targetHeight !== height) setHeight(targetHeight)
            }
        }

        // Set element height if there is a default active height
        // This is done to transition the height property
        if (typeof active === `number` && !height) handleResize()
        
        window.addEventListener(`resize`, handleResize)

        return () => {
            window.removeEventListener(`resize`, handleResize)
        }
    }, [ height, setHeight, active ])
    return (
        <List ref={wrapper}>
            {items.map(({
                title,
                description
            }, index) => (
                <Item 
                    className={index === active ? `accordion--active` : null} 
                    onClick={() => handleToggle(index)}
                    key={index}
                >
                    <Header>
                        <Title className={`sm:text--lg lg:text--xl`}>{title}</Title>
                        <Icon fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8">
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.707 1.707A1 1 0 0012.293.293L7 5.586 1.707.293A1 1 0 00.293 1.707l6 6a1 1 0 001.414 0l6-6z"/>
                        </Icon>
                    </Header>
                    <Content 
                        style={{
                            height: index === active ? height : null
                        }}
                    >
                        <ContentWrapper className={`accordion__content`}>
                            {parseContent(description)}
                        </ContentWrapper>
                    </Content>
                </Item>
            ))}
        </List>
    )
}

export default AccordianComponent

const List = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    border-radius:0.375rem;
    background-color:#fff;
    border-top:1px solid ${props => props.theme.color.grey[200]};
`
const Item = styled.li`
    width:100%;
    padding:1.75rem 0;
    cursor:pointer;
    border-bottom:1px solid ${props => props.theme.color.grey[200]};
    @media (min-width:992px) {
        padding:2rem 2.25rem;
        &:last-child {
            border-bottom:none;
        }
    }
`
const Header = styled.h3`
    width:100%;
    cursor:pointer;
    padding:0;
    display:grid;
    grid-template-columns:minmax(0,1fr) minmax(0,0.875rem);
    grid-column-gap:1rem;
    justify-content:space-between;
`
const Title = styled.span`
`
const Icon = styled.svg`
    width:0.875rem;
    height: 1.65rem;
    transition: all .2s;
    fill:${props => props.theme.color.grey[400]};
    .accordion--active & {
        transform:rotate(180deg);
    }
`
const Content = styled.div`
    height: 0;
    transition: all .2s;
    overflow:hidden;
    .accordion--active & {
        height:auto;
    }
`
const ContentWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    padding-top:1.6875rem;
    transition: all .2s;
    opacity:0;
    .accordion--active & {
        opacity:1;
    }
`