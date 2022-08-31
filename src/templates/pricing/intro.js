import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantFour'

const IntroComponent = ({
    title,
    description,
    pricing,
    cta,
    features,
    membershipLabel,
    membershipNotice,
}) => {
    const priceMonthly = parseInt(pricing.monthly).toFixed(0)

    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2rem;
                `}
                lg={`
                    grid-row-gap:5rem;
                `}
            >
                <Header
                    title={title}
                    description={description}
                />
                <Wrapper>
                    <ItemWrapper>
                        <Content>
                            <Title>
                                <h3 className={`sm:text--2xl lg:text--3xl`}>{pricing.title}</h3>
                                <p className={`sm:text--lg`}>{pricing.description}</p>
                            </Title>
                            {pricing.monthly && <Price>
                                <span className={`sm:text--5xl`}>
                                    {`$${priceMonthly}`}
                                </span>
                                <span className={`sm:text--base`}>{`/ month`}</span>
                            </Price>}
                            {cta[0].type === `internal` ?
                                <Button as={Link} to={cta[0].linkInternal.link} className={`button button--primary button--icon sm:text--xl`}>
                                    {cta[0].label}
                                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                                    </svg>
                                </Button>
                            :
                            <Button href={cta[0].linkExternal} target={cta[0].scopeExternal && `_blank`} className={`button button--primary button--icon sm:text--xl`}>
                                {cta[0].label}
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                                    <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#fff"></path>
                                </svg>
                            </Button>
                            }
                        </Content>
                        <Features>
                            <h4 className={`sm:text--lg`}>{membershipLabel}</h4>
                            <List>
                                {features.map(({
                                    title
                                }, index) => (
                                    <ListItem className={`sm:text--lg`} key={index}>
                                        <Icon fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.614.21a1 1 0 01.175 1.404l-7.774 10a1 1 0 01-1.477.112l-4.225-4a1 1 0 111.375-1.452l3.424 3.242L12.21.386a1 1 0 011.404-.175z" fill="#39ADC3"/>
                                        </Icon>
                                        {title}
                                    </ListItem>
                                ))}
                            </List>
                        </Features>
                    </ItemWrapper>
                    {membershipNotice && <Notice>*{membershipNotice}</Notice>}
                </Wrapper>
            </Container>
        </Section>
    )
}

export default IntroComponent

// Styled Components
const Section = styled.section`
    ${props => `background: linear-gradient(0deg, #fff 26rem, ${props.theme.color.grey[50]} 26rem);`}
    padding-top:5rem;
    padding-bottom:5rem;
    @media (min-width:992px) {
        ${props => `background: linear-gradient(0deg, #fff 18rem, ${props.theme.color.grey[50]} 18rem);`}
        padding-bottom:7.5rem;
    }
`
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    @media (min-width:992px) {
        grid-row-gap:1.75rem;
    }
`
const ItemWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    background-color:#fff;
    box-shadow: 0px 8px 32px rgba(103, 117, 139, 0.15);
    width:100%;
    border-radius: 0.375rem;
    overflow:hidden;
    @media (min-width:992px) {
        grid-template-columns:repeat(2,minmax(0,1fr));
        align-items:start;
        margin:0 auto;
        width:max-content;
        max-width:50.5rem;
    }
`
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 100%;
    align-items: start;
    padding:3.75rem 1.75rem;
    @media (min-width:992px) {
        padding:4.125rem 1.75rem 3.75rem 4.25rem;
    }
`
const Button = styled.a`
    padding-left:1.5rem;
    padding-right:1.5rem;
    @media (min-width:992px) {
        padding-left:2.7rem;
        padding-right:2.7rem;
    }
`
const Title = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    max-width:18.375rem;
    margin-bottom:1rem;
    @media (min-width:992px) {
        grid-row-gap:0.375rem;
    }
`
const Price = styled.div`
    display:flex;
    flex-wrap:wrap;
    align-items:flex-end;
    margin-bottom:2rem;
`
const Notice = styled.span`
    max-width:50.5rem;
    margin:0 auto;
    width:100%;
    font-style:italic;
    color:${props => props.theme.color.teal[500]};
`
const Features = styled.div`
    background-color:${props => props.theme.color.teal[50]};
    height:100%;
    align-items:start;
    padding:3.75rem 2rem;
    @media (min-width:992px) {
        padding:4.125rem 2.875rem 3.75rem 3.375rem;
    }
`
const List = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    margin-top:1.75rem;
    grid-row-gap:0.5rem;
    @media (min-width:992px) {
        grid-row-gap:0.875rem;
    }
`
const ListItem = styled.li`
    display:inline-block;
`
const Icon = styled.svg`
    margin-right:0.75rem;
`