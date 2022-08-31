import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import { Link as GatsbyLink } from 'gatsby'

const Background = ({
    image,
    cta,
    uri,
    category,
    title
}) => {
    const ariaLabel = `${category.resourceCategorySettings.resourceCategoryCtaLabel}: ${title}`

    return (
        <ImageWrapper>
        {!image ? 
            null
        :
        image.localFile.childImageSharp ? 
            <Logo as={GatsbyImage} fluid={image.localFile.childImageSharp.fluid} alt={image.altText || image.title} object-fit="contain" style={{
                
            }}/>
        : 
            <Logo src={image.localFile.publicURL} loading={`lazy`} alt={image.altText || image.title}/>
        }
            {cta.type === `external` ? 
                <ImageCta className="sm:text--lg" href={cta.linkExternal} target={cta.scopeExternal ? `_Blank` : ``} aria-label={ariaLabel}></ImageCta>
            : cta.type === `internal` ? 
                <ImageCta as={GatsbyLink} className="sm:text--lg" to={uri} aria-label={ariaLabel}></ImageCta>
            : 
                <ImageCta as={GatsbyLink} className="sm:text--lg" to={uri} aria-label={ariaLabel}></ImageCta>
            }
        </ImageWrapper>
    )
}

const ResourceCardComponent = ({
    title,
    category,
    uri,
    featuredImage,
    resourcePostSettings = {}
}) => {
    const background = resourcePostSettings.resourcePostGridBanner ? resourcePostSettings.resourcePostGridBanner
    : featuredImage ? featuredImage.node
    : null

    const cta = resourcePostSettings.resourceCta ? resourcePostSettings.resourceCta : { type: `internal` }

    return (
        <Item>
            <Background
                image={background}
                cta={cta}
                uri={uri}
                category={category}
                title={title}
            />
            <ItemTitle className={`sm:text--xl`}>{title}</ItemTitle>
            {cta.type === `external` ? 
                <Cta className="sm:text--lg" href={cta.linkExternal} target={cta.scopeExternal ? `_Blank` : ``}>{category.resourceCategorySettings.resourceCategoryCtaLabel}</Cta>
            : cta.type === `internal` ? 
                <Cta as={GatsbyLink} className="sm:text--lg" to={uri}>{category.resourceCategorySettings.resourceCategoryCtaLabel}</Cta>
            : 
                <Cta as={GatsbyLink} className="sm:text--lg" to={uri}>{category.resourceCategorySettings.resourceCategoryCtaLabel}</Cta>
            }
        </Item>
    )
}

export default ResourceCardComponent

// Styled Components
const ImageWrapper = styled.div`
    position:relative;
    overflow:hidden;
    width:100%;
    border-radius:1rem;
`
const ImageCta = styled.a`
    display:block;
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    z-indeX:1;
`
const Logo = styled.img`
    width: 100%;
`
const ItemTitle = styled.h3`
    margin:1.5rem 0;
`

const Item = styled.article`
    height:100%;
    transition: all .2s;
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items: start;
    width: 100%;
    padding:1.25rem;
    box-shadow:0 2px 8px 0 rgba(0,0,0,0.12);
    background-color:#fff;
    border-radius:0.25rem;
`
const Cta = styled.a`
    margin-top:auto;
    align-self: center;
    color:${props => props.theme.color.purple[600]};
    font-weight:bold;
    font-size: 1.500rem;
    text-decoration:underline;
    display:block;
    z-index:4;
    position:relative;
`