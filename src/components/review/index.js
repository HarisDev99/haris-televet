import React from 'react'
import styled from 'styled-components'

// Components
import Header from './header'

const ReviewComponent = ({
    name,
    role,
    description = `Very streamlined and efficient for vets. Has been hugely effective in providing care throughout the pandemic and I expect it will be a staple in our practice moving forward due to owner demand!`,
    background
}) => {
    return (
        <Item>
            <Header
                name={name}
                role={role}
                background={background}
            />
            <Description className={`sm:text--2xl lg:text--3xl`}>{`“${description}”`}</Description>
        </Item>
    )
}

export default ReviewComponent

// Styled Components
const Item = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:3.25rem;
    margin: 0 auto;
    max-width:26rem;
    justify-items: center;
    width: calc(100% - 1.5rem);
    @media (min-width:768px) {
        grid-row-gap:2.25rem;
        max-width:47rem;
    }
`
const Description = styled.p`
    font-weight:600;
    text-align:center;
    grid-row:1;
`