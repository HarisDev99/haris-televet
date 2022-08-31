import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Utils
import parseContent from '../../utils/parseContent'

// Components
import Container from '../../components/container'

const BenefitsComponent =({
    title,
    items
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:1.5rem;
                `}
                lg={`
                    grid-row-gap:3rem;
                `}
            >
                <Header>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                </Header>
                <List>
                    {items.map(({
                        title,
                        description,
                        icon
                    }, index) => (
                        <Item key={index}>
                            <Icon>
                                {icon.localFile.extension === `svg` ?
                                    <Image src={icon.localFile.publicURL} alt={icon.localFile.altText || icon.localFile.title}/>
                                :
                                    <Image as={GatsbyImage} fixed={icon.localFile.childImageSharp.fixed} alt={icon.localFile.altText || icon.localFile.title}/>
                                }
                            </Icon>
                            <h3 className={`sm:text--lg`}>{title}</h3>
                            {description &&
                            <Content>
                                {parseContent(description)}
                            </Content>}
                        </Item>
                    ))}
                </List>
            </Container>
        </Section>
    )
}

export default BenefitsComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Header = styled.header`
    text-align:center;
    max-width:50rem;
    margin:0 auto;
`
const List = styled.ul`
    display:grid;
    grid-row-gap:3rem;
    list-style:none;
    align-items:start;
    @media (min-width:992px) {
        grid-column-gap:3rem;
        grid-row-gap:3rem;
        grid-template-columns:repeat(3,minmax(0,1fr));
    }
`
const Item = styled.li`
    text-align:center;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    justify-items:center;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
`
const Icon = styled.div`
    height:6rem;
`
const Image = styled.img`
    width:100%;
    height:100%;
`