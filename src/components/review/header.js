import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

const HeaderComponent = ({
    name = `Jim Lawman Dr. Tom Wootton, DVM`,
    role = `Art Director`,
    background
}) => {
    return (
        <Header>
            <Image fixed={background.localFile.childImageSharp.fixed} alt={background.altText || background.title}/>
            <Title className={`sm:text--lg`}>{name}<Subtitle>{role}</Subtitle></Title>
        </Header>
    )
}

export default HeaderComponent

// Styled Components
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    align-items: start;
    justify-items: center;
    grid-row-gap:1.75rem;
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
        justify-items: start;
        grid-column-gap:1.5rem;
        grid-row:2;
        grid-template-columns:minmax(0, 4rem) minmax(0,1fr);
    }
`
const Image = styled(GatsbyImage)`
    border-radius:50%;
`
const Subtitle = styled.span`
    display:block;
    font-weight:400;
`
const Title = styled.h3`
    max-width:18rem;
`