import React from 'react'
import styled from 'styled-components'

// Components
import Header from '../../components/review/header'

const ReviewComponent = ({
    display,
    name,
    role,
    description = `Amazing experience i love it a lot. Thanks to the team that dreams come true, great! I really appreciate there approach`,
    background
}) => {
    return (
        <Wrapper className={display}>
            <Header
                name={name}
                role={role}
                background={background}
            />
            <Description className={`sm:text--lg`}>{`“${description}”`}</Description>
        </Wrapper>
    )
}

export default ReviewComponent

// Styled Components
const Wrapper = styled.div`
    grid-template-columns:minmax(0,1fr);
    align-items:start;
    padding:3rem 0;
    grid-row-gap:1.75rem;
    max-width:22.5rem;
    margin:0 auto;
    @media (min-width:992px) {
        padding:0;
        grid-row-gap:3rem;
        margin:2.5rem 0 0 0;
        max-width:30rem;
    }
`
const Description = styled.p`
    grid-row:1;
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
    }
`