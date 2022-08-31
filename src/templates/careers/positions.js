import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

const PositionsComponent = ({
    title,
    items,
    email,
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2.5rem;
                `}
                lg={`
                    grid-row-gap:5rem;
                `}
            >
            <Header>
                <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
            </Header>
            <List>
            {items && items.length > 0 ?
                items.map(({
                    careerContent: {
                        title,
                        location: {
                            city,
                            state,
                        },
                        type,
                        link
                    }
                }, index) => (
                    <Item key={index}>
                        <Content>
                            <h3 className={`sm:text--lg lg:text--xl`}>{title}</h3>
                            <Meta className={`sm:text--base lg:text--lg`}>
                                <span>{`${city}, ${state}`}</span>
                                {` • `}
                                <span>{type.map((single, index) => index === type.length - 1 ? single : `${single} or `)}</span>
                            </Meta>
                        </Content>
                        <Icon fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 12">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.842.508a1.167 1.167 0 011.65 0l4.666 4.666v.001a1.162 1.162 0 01.254 1.27 1.154 1.154 0 01-.254.38l-4.666 4.667a1.167 1.167 0 01-1.65-1.65l2.675-2.675H1.667a1.167 1.167 0 110-2.334h15.85l-2.675-2.675a1.167 1.167 0 010-1.65z"/>
                        </Icon>
                        <Link href={link} target={`_blank`} aria-label={`Apply for ${title}`}></Link>
                    </Item>
                ))
            :
                    <Cta>
                        <h3 className={`sm:text--xl`}>{`No positions available at this time`}</h3>
                        <CtaLink className={`sm:text--lg`} href={`mailto:${email}`}>
                            {`Open to connecting? `}
                            <Strong>{`Send us an email`}</Strong>
                        </CtaLink>
                    </Cta>
            }
            </List>
            </Container>
        </Section>
    )
}

export default PositionsComponent

// Styled components
const Section = styled.section`
    padding-top:3.125rem;
    padding-bottom:2.375rem;
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:6.25rem;
    }
`
const Header = styled.header`
    text-align:center;
`
const List = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    @media (min-width:992px) {
        grid-row-gap:0.75rem;
    }
`
const Item = styled.li`
    display:grid;
    grid-template-columns:minmax(0,1fr);;
    align-items:center;
    position:relative;
    overflow:hidden;
    border:1px solid ${props => props.theme.color.grey[300]};
    border-radius:0.375rem;
    box-shadow:none;
    padding:1.875rem 1.25rem;
    transition: all .15s;
    &:hover {
        border-color:${props => props.theme.color.teal[500]};
        box-shadow: 0px 4px 16px rgba(103, 117, 139, 0.15);
    }
    @media (min-width:992px) {
        grid-template-columns:minmax(0,1fr) minmax(0,1.3125rem);
        padding:1.375rem 2.5rem;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
`
const Link = styled.a`
    position:absolute;
    left:0;
    top:0;
    height:100%;
    width:100%;
`
const Meta = styled.div`
    display:grid;
    grid-template-columns:repeat(3,minmax(0,max-content));
    align-items:center;
    grid-column-gap:0.5rem;
    color:${props => props.theme.color.grey[600]};;
`
const Icon = styled.svg`
    width:1.3125rem;
    fill:${props => props.theme.color.teal[500]};
    display:none;
    @media (min-width:992px) {
        display:block;
    }
`
const Cta = styled.li`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    background-color:${props => props.theme.color.grey[50]};
    border-radius:0.375rem;
    padding:1.75rem 1.25rem;
    text-align:center;
    grid-row-gap:0.625rem;
    @media (min-width:992px) {
        grid-row-gap:0;
        padding:1.75rem 2.5rem;
    }
`
const CtaLink = styled.a`
    color:${props => props.theme.color.grey[600]};
`
const Strong = styled.span`
    color:${props => props.theme.color.primary.dark};
    display: block;
    @media (min-width:992px) {
        display:inline-block;
    }
`