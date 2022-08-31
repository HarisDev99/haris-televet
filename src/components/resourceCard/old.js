import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Utils
import parseContent from '../../utils/parseContent'

export default ({
    title,
    description,
    background,
    uri,
    seoDescription
}) => {
    return (
        <Wrapper>
            <BackgroundWrapper>
                <Background
                    alt={background.altText || background.title}
                    fixed={background.localFile.childImageSharp.fixed}
                    style={{
                        width: ``,
                        height: ``,
                        position: ``
                    }}
                />
            </BackgroundWrapper>
            <Header>
                <Title className={`sm:text--xl lg:text--2xl`}>{title}</Title>
                <Content>
                    {description.includes(`[&hellip;]`) ?
                        <p className={`sm:text--lg`}>{seoDescription}</p>
                    :
                        parseContent(description)
                    }
                </Content>
            </Header>
            <Button as={GatsbyLink} aria-label={`Read more about ${title}`} to={`${uri}`}></Button>
        </Wrapper>
    )
}

const Wrapper = styled.article`
    display:flex;
    flex-wrap:wrap;
    row-gap:1rem;
    position:relative;
    flex-direction: column;
    align-items:start;
    height:100%;
`
const Header = styled.header`
    padding:0 1.5rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    text-align:center;
    width:100%;
`
const Title = styled.h3`
    transition: color .2s;
    ${Wrapper}:hover & {
        color:${props => props.theme.color.purple[500]};
    }
`
const Content = styled.div`

`
const Button = styled.a`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
`
const BackgroundWrapper = styled.div`
    width:100%;
    padding-top:75%;
    position:relative;
    overflow:hidden;
    border-radius:1rem;
`
const Background = styled(GatsbyImage)`
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
`