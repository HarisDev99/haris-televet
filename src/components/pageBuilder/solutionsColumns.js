import React, { useState } from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'

// Components
import Container from '..//container'

const SolutionsColumnsComponent = ({
    title,
    items,
    buttons
}) => {
    const [ active, setActive ] = useState(null)

    const handleClick = (index) => {
        setActive(index)
    }
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
                {title && <Header>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                </Header>}
                <List>
                    {items.map(({
                        icon,
                        title,
                        description,
                        cta
                    }, index) => (
                        <Item key={index} onClick={() => handleClick(index)} className={index === active ? 'column-active' : ''}>
                            <Icon src={icon.localFile.publicURL} alt={icon.altText || icon.title}/>
                            <Title className={`sm:text--lg`}>{title}</Title>
                            <Content>
                                <Body className={`sm:text--base`}>{description}</Body>
                                {cta.type === `internal` ?
                                <ItemButton aria-label={`Learn More About Our ${title} Solutions`} as={GatsbyLink} to={cta.linkInternal.uri}>
                                </ItemButton>
                                : cta.type === `external` ?
                                    <ItemButton href={cta.linkExternal} target={cta.scopeExternal && `_blank`}>
                                    </ItemButton>
                                : null}
                            </Content>
                        </Item>
                    ))}
                </List>
                {buttons && buttons.length > 0 &&
                    <ButtonContainer className={buttons.length > 1 ? `alternate` : ``}>
                        {buttons.map((cta, index) => (
                            <React.Fragment key={index}>
                                {cta.type === `internal` ?
                                    <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary sm:text--xl`}>
                                        {cta.label}
                                    </GatsbyLink>
                                :
                                    <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary sm:text--xl`}>
                                        {cta.label}
                                    </a>
                                }
                                {index === 0 && buttons.length > 1 && <span className={`sm:text--xl`}>{`or`}</span>}
                            </React.Fragment>
                        ))}
                    </ButtonContainer>
                }
            </Container>
        </Section>
    )
}

export default SolutionsColumnsComponent

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
    margin:0 auto;
    max-width:50rem;
    text-align:center;
`
const ItemButton = styled.a`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:2;
`
const List = styled.ul`
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    grid-column-gap:1.5rem;
    grid-row-gap:1.5rem;
    @media (min-width:992px) {
        grid-column-gap:3rem;
        grid-row-gap:3rem;
        grid-template-columns:repeat(4,minmax(0,1fr));
    }
`
const Item = styled.li`
    position:relative;
    border-radius:0.5rem;
    background-color:${props => props.theme.color.grey[50]};
    overflow:hidden;
    padding:0.5rem;
    display:flex;
    flex-wrap:wrap;
    text-align:center;
    box-shadow: 0px 8px 16px rgba(103,117,139,0.05);
    @media (min-width:992px) {
        padding:1.5rem;
    }
`
const Title = styled.h3`
    line-height:1.25;
    width:100%;
`
const Icon = styled.img`
    height:5rem;
    margin:0 auto 1rem auto;
    @media (min-width:992px) {
        height:8rem;
    }
`
const Content = styled.div`
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width:100%;
    visibility:hidden;
    opacity:0;
    background-color:${props => props.theme.color.grey[50]};
    transition: all .2s;
    padding:1rem;
    align-items:center;
    display:flex;
    @media (min-width:992px) {
        ${Item}:hover & {
            opacity:1;
            visibility:visible;
        }
    }
    @media (max-width:991px) {
        ${Item}.column-active & {
            opacity:1;
            visibility:visible;
        }
    }
`
const Body = styled.p`
    max-height:100%;
    position:relative;
    overflow-y:auto;
    width:100%;
`
const ButtonContainer = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    justify-items:center;
    @media (min-width:992px) {
        &.alternate {
            display:inline-grid;
            grid-template-columns:minmax(0,1fr) minmax(0,max-content) minmax(0,1fr);
            grid-column-gap:1.25rem;
            align-items:center;
            width: fit-content;
            margin: 0 auto;
            justify-content:center;
            > *:first-child, > *:last-child {
                min-width: 100%;
                text-align: center;
            }
        }
    }
`