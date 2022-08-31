import React from 'react'
import styled from 'styled-components'

const TitleComponent = ({
    title = `Page Title`,
    description = `This is a description`
}) => {
    return (
        <Header>
            <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
            <p className={`sm:text--lg`}>{description}</p>
        </Header>
    )
}

export default TitleComponent

const Header = styled.header`
    margin:0 auto;
    max-width:47rem;
    text-align:center;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    margin:0 auto;
    z-index:1;
    @media (min-width:992px) {
        grid-row-gap:1.375rem;
    }
`