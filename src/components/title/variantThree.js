import React from 'react'
import styled from 'styled-components'

const TitleComponent = ({
    title = `Spread the word`,
    description = `Enjoy automated email templates, social media posts, print marketing materials, and more to notify clients of your added services.`
}) => {
    return (
        <Header>
            <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
            <p className={`sm:text--lg`}>{description}</p>
        </Header>
    )
}

export default TitleComponent

// Styled Components
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2.25rem;
`