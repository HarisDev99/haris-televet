import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import BackgroundImage from 'gatsby-background-image'
import { Link as GatsbyLink } from 'gatsby'

// Utils
import parseContent from '../../utils/parseContent'

const PostCardComponent = ({
    featured,
    item,
    basepath
}) => {
    const {
        title,
        featuredImage,
        slug,
        excerpt,
        author,
        seoInformation,
        date
    } = item

    return (
        <Item className={featured && `post__featured`}>
            <Header>
                <Title className={`sm:text--xl lg:text--2xl`}>{title}</Title>
                <span className={`sm:text--lg`}>{date}</span>
                <Excerpt>
                    {excerpt.includes(`[&hellip;]`) ?
                        <p className={`sm:text--lg`}>{seoInformation.seoDescription}</p>
                    :
                        parseContent(excerpt)
                    }
                </Excerpt>
                <Background>
                    {featuredImage.node ?
                        <BackgroundImage
                            alt={``}
                            fluid={featuredImage.node.localFile.childImageSharp.fluid}
                            style={{
                                position: ``
                            }}
                        /> : null
                    }
                </Background>
            </Header>
            <Author>
                {author.node.customAvatar.avatar && <Avatar alt={`Avatar`} fixed={author.node.customAvatar.avatar.localFile.childImageSharp.fixed}/>}
                <AuthorName className={`sm:text--sm`}>{author.node.firstName ? `${author.node.firstName}${author.node.lastName ? ` ${author.node.lastName}` : ``}` : `Anonymous`}</AuthorName>
            </Author>
            <Link to={`/${basepath ? basepath : `blog`}/${slug}`} aria-label={`Read more about ${title}`}></Link>
        </Item>
    )
}

export default PostCardComponent

// Styled Components
const Item = styled.article`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    height: 100%;
    position:relative;
    &.post__featured {
        @media (min-width:992px) {
            grid-column:1/3;
            grid-row:1;
        }
    }
`
const Link = styled(GatsbyLink)`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    align-content:start;
    position:relative;
`
const Title = styled.h2`
    transition: color .15s;
    ${Item}:hover & {
        color:${props => props.theme.color.purple[600]};
    }
`
const Excerpt = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
`
const Background = styled.div`
    grid-row:1;
    position:relative;
    padding-top:52.25%;
    width:100%;
    border-radius:0.65rem;
    overflow:hidden;
`
const Author = styled.div`
    margin-top:auto;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
`
const AuthorName = styled.span`
    text-transform:uppercase;
    font-weight:bold;
`
const Avatar = styled(GatsbyImage)`
    border-radius:50%;
    margin-right:1rem;
`