import React, { useState } from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantTwo'

const AboutComponent = ({
    title,
    description,
    cta,
    items,
}) => {
    const [ active, setActive ] = useState(0)

    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2rem;
                `}
                lg={`
                    grid-row-gap:4rem;
                `}
            >
                <Header
                    title={title}
                    description={description}
                    cta={cta}
                />
                <Features>
                    <List>
                        {items.map(({
                            tabTitle: title,
                            tabDescription: description,
                            tabBackground: background,
                            tabIcon: icon
                        }, index) => (
                            <Item 
                                key={index} 
                                className={index === active ? `tab--active` : null}
                            >
                                <Background 
                                    fluid={background.localFile.childImageSharp.fluid} 
                                    style={{
                                        position: ``
                                    }}
                                    objectFit="contain"
                                    alt={background.altText || background.title}
                                />
                                <Content onClick={() => setActive(index)}>
                                    <IconWrapper>
                                        <img src={icon.localFile.publicURL} alt={icon.altText || icon.title}/>
                                    </IconWrapper>
                                    <ItemHeader>
                                        <h3 className={`sm:text--xl`}>{title}</h3>
                                        <p className={`sm:text--lg`}>{description}</p>
                                    </ItemHeader>
                                </Content>
                            </Item>
                        ))}
                    </List>
                </Features>
            </Container>
        </Section>
    )
} 

export default AboutComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Features = styled.div`
    @media (min-width:992px) {
        display:grid;
        grid-template-columns:minmax(0,1fr) minmax(0,26rem);
        grid-column-gap:5rem;
        position:relative;
    }
`
const List = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:3rem;
    max-width:26rem;
    margin:0 auto;
    @media (min-width:992px) {
        grid-column:2/3;
        max-width:100%;
    }
`
const Item = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    align-items:center;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    justify-items:center;
    @media (min-width:992px) {
        cursor:pointer;
        justify-items:start;
        align-items:start;
        grid-template-columns:minmax(0, 3.9rem) minmax(0,1fr);
        grid-column-gap:1.5rem;
    }
`
const IconWrapper = styled.div`
    max-width: 3.9rem;
    width:100%;
    display:none;
    @media (min-width:992px) {
        display:block;
    }
`
const Background = styled(GatsbyImage)`
    border-radius:0.375rem;
    width:100%;
    position:relative;
    @media (min-width:992px) {
        position:absolute;
        top:0;
        height:100%;
        left:0;
        width:calc(100% - 31rem);
        opacity:0;
        transition: all .2s;
        .tab--active & {
            opacity:1;
        }
    }
`
const ItemHeader = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
        transition: all .2s;
        opacity:0.3;
        ${Content}:hover & {
            opacity:0.6;
        }
        .tab--active ${Content} & {
            opacity:1;
        }
    }
`