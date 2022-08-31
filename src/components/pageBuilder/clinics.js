import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Components
import Container from '../../components/container'

const ClinicsComponent = ({
    title,
    logos,
    bgColor
}) => {
    return (
        <Section bgColor={bgColor}>
            <Container
                sm={`
                    grid-row-gap:1.5rem;
                `}
                lg={`
                    grid-row-gap:3.25rem;
                `}
            >
                <h2 className={`sm:text--xl`}>{title}</h2>
                <List>
                    {logos.map(({
                        title,
                        altText,
                        localFile: {
                            childImageSharp: {
                                fluid
                            }
                        }
                    }, index) => (
                        <ImageWrapper key={index}>
                            <Image
                                fluid={fluid}
                                objectFit={`contain`}
                                alt={altText || title}
                            />
                        </ImageWrapper>
                    ))}
                </List>
            </Container>
        </Section>
    )
}

export default ClinicsComponent

// Styled Components
const Section = styled.section`
    ${props => props.bgColor ? `background-color:${props.theme.color.grey[50]};` : ``}
    padding-top:2rem;
    padding-bottom:2.375rem;
    text-align:center;
    @media (min-width:992px) {
        padding-top:4.4375rem;
        padding-bottom:4.4375rem;
    }
`
const List = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
`
const ImageWrapper = styled.div`
    box-shadow:0px 8px 32px rgba(103,117,139,0.15);
    background-color:#fff;
    border-radius:0.25rem;
    width:9.75rem;
    max-width:calc(50% - 1rem);
    height:5.625rem;
    margin:0.5rem;
    padding:0.5rem;
    overflow:hidden;
    @media (min-width:992px) {
        margin:1rem;
        width:10.375rem;
        height:5.9375rem;
        max-width:initial;
    }
`
const Image = styled(GatsbyImage)`
    height: 100%;
    width: 100%;
`   