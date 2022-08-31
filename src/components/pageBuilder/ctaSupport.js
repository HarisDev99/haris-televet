import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'
import { Link as GatsbyLink } from 'gatsby'

// Layout Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const CtaSupportComponent = ({
    title,
    description,
    background,
    ctaGroup
}) => {
    const toggleChat = () => {
        const isDefined = typeof window !== `undefined`

        const drift = isDefined && window.drift

        drift && drift.api.toggleChat()
    }
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2.5rem;
                `}
                lg={`
                    align-items:center;
                    grid-column-gap:1.5rem;
                    grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);
                `}
            >
                <Header>
                    <Wrapper>
                        <h2 className={`sm:text--2xl lg:text--5xl`}>{title}</h2>
                        <Content>
                            {parseContent(description)}
                        </Content>
                    </Wrapper>
                    <CtaWrapper>
                            {ctaGroup.map((item, index) => {
                                return (
                                    item.type === `internal` ?
                                        <GatsbyLink key={index} to={item.linkInternal.uri} className={`button button--secondary sm:text--lg`}>{item.label}</GatsbyLink>
                                    : item.type === `external` ?
                                        <a key={index} href={item.linkExternal} className={`button button--secondary sm:text--lg`} target={item.scopeExternal && `_blank`}>{item.label}</a>
                                    : item.type === `question` ?
                                        <SupportButton onClick={toggleChat} key={index} className={`sm:text--lg`}>{item.label}</SupportButton>
                                    : null
                                )
                            })}
                        </CtaWrapper>
                </Header>
                <Background>
                    <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title}/>
                </Background>
            </Container>
        </Section>
    )
}

export default CtaSupportComponent

// Styled Components
const Section = styled.section`
    position:relative;
    padding-bottom:2.5rem;
    padding-top:2.5rem;
    background-color:${props => props.theme.color.grey[50]};
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:5rem;
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    align-items:start;
`
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2rem;
    max-width:32rem;
    align-items:start;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const CtaWrapper = styled.div`
    display:flex;
    flex-wrap:wrap;
    & > :first-child {
        margin-bottom:1rem;
    }
    @media (min-width:992px) {
        & > :first-child {
            margin-right:1rem;
            margin-bottom:0;
        }
    }
`
const Background = styled.div`

`
const SupportButton = styled.button`
    font-weight:bold;
    text-decoration:underline;
    background-color:transparent;
    cursor:pointer;
    color: ${props => props.theme.color.primary.dark};
    transition: color .15s;
    &:hover {
        color: ${props => props.theme.color.purple[500]};
    }

`
const Image = styled(GatsbyImage)`
    height:100%;
    width:100%;
`