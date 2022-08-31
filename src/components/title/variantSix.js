import React from 'react'
import styled from 'styled-components'

const TitleComponent = ({
    title,
    description,
}) => {
    return (
        <Header>
            <h2 className={`sm:text--2xl lg:text--4xl`}>
                {title}
            </h2>
            {description && <p className={`sm:text--lg`}>
                {description}
            </p>}
        </Header>
    )
}

export default TitleComponent

// Styled Components
const Header = styled.header`
    text-align:center;
    max-width:47rem;
    margin:0 auto;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.625rem;
`