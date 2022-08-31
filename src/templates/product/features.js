import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'
import LazyComponent from '../../components/lazyComponent'
import ReactPlayer from 'react-player'

// Utils
import parseContent from '../../utils/parseContent'

// Components
import Container from '../../components/container'

const Video = ({
    url
}) => {
    const [ playing, setPlaying ] = useState(false)

    const wrapper = useRef(null)

    useEffect(() => {
        const domNode = wrapper.current

        let observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !playing) {
                setPlaying(true)
            } else if (!entry.isIntersecting && playing) {
                setPlaying(false)
            }
        }, {
            threshold: 0.25
        })

        observer.observe(domNode)

        return () => {
            observer.disconnect()
        }
    }, [ wrapper, playing ])
    return (
        <VideoWrapper 
            ref={wrapper}
        >
            <ReactPlayer
                className={`product__video`}
                url={url}
                width={`100%`}
                height={`100%`}
                playing={playing}
                onReady={() => setPlaying(true)}
                muted
                loop={true}
                config={{
                    file: {
                        attributes: {
                            onContextMenu: e => e.preventDefault()
                        } 
                    }, 
                    youtube: {
                        playerVars: {
                            controls: 0,
                            autoplay: 1,
                            loop: 1,
                        }
                    },
                    vimeo: {
                        playerOptions: {
                            controls: false,
                            color: `9046CF`,
                            loop: true
                        }
                    }
                }}           
            />
        </VideoWrapper>
    )
}

const Feature = ({
    title,
    description,
    background,
    last,
    odd
}) => {
    const calcAspectRatio = ({
        width,
        height
    }) => {
        return `${((height/width) * 100).toFixed(2)}%`
    }
    
    return (
        <Section last={last} className={odd ? `feature__column--odd`: ``}>
            <Container
                sm={`
                    grid-row-gap:2rem;
                `}
                lg={`
                    grid-template-columns:repeat(2,minmax(0,1fr));
                    grid-column-gap:6rem;
                    align-items:center;
                    ${odd ? `
                        > *:first-child {
                            grid-column: 2;
                            grid-row:1;
                        }
                    ` : ``}
                `}
            >
                <Header>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                    <Content>
                        {parseContent(description)}
                    </Content>
                </Header>
                <Background>
                    {background.type === `static` ? 
                        <Image 
                            fluid={background.imageStatic.localFile.childImageSharp.fluid}
                            alt={background.imageStatic.altText || background.imageStatic.title}
                            objectFit="contain"
                        />
                    : background.type === `animated` ?
                        <UnsupportedWrapper style={{
                            paddingTop: calcAspectRatio({
                                width: background.imageAnimated.mediaDetails.width,
                                height: background.imageAnimated.mediaDetails.height,
                            })
                        }}>
                            <LazyComponent>
                                <UnsupportedImage 
                                    src={background.imageAnimated.localFile.publicURL} 
                                    alt={background.imageAnimated.altText || background.imageAnimated.title}
                                />
                            </LazyComponent>
                            <UnsupportedImage
                                style={{
                                    position: ``,
                                    zIndex: 0,
                                    objectFit: `cover`
                                }}
                                as={GatsbyImage} 
                                fluid={background.placeholder.localFile.childImageSharp.fluid}
                                alt={background.placeholder.altText || background.placeholder.title}
                            />
                        </UnsupportedWrapper>
                    : 
                        <UnsupportedWrapper style={{
                            paddingTop: calcAspectRatio({
                                width: background.placeholder.localFile.childImageSharp.fluid.presentationWidth,
                                height: background.placeholder.localFile.childImageSharp.fluid.presentationHeight,
                            })
                        }}>
                            <LazyComponent>
                                <Video
                                    url={background.video.type === `internal` ? background.video.videoInternal.localFile.publicURL : background.video.videoExternal}
                                />
                            </LazyComponent>
                            <UnsupportedImage
                                style={{
                                    position: ``,
                                    zIndex: 0,
                                    objectFit: `cover`
                                }}
                                as={GatsbyImage} 
                                fluid={background.placeholder.localFile.childImageSharp.fluid}
                                alt={background.placeholder.altText || background.placeholder.title}
                            />
                        </UnsupportedWrapper>
                    }
                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 400">
                        <path d="M430.479 49.595c21.495 42.911-2.887 114.326-16.04 165.694-12.833 51.369-14.437 82.378-26.307 112.447-11.87 30.069-34.006 59.199-62.88 68.596-28.552 9.083-64.162-1.253-116.775-3.759-52.614-2.193-122.23 3.759-163.936-25.684-41.706-29.756-55.18-94.907-35.931-146.275 19.249-51.368 71.22-89.268 120.947-127.481 49.405-38.213 96.564-77.053 153.99-88.955C340.972-8.038 408.664 6.37 430.479 49.595z"/>
                    </Shape>
                </Background>
            </Container>
        </Section>
    )
}

const FeaturesComponent = ({
    items
}) => {
    return (
        items.map(({
            title,
            description,
            background
        }, index) => (
            <Feature
                key={index}
                title={title}
                description={description}
                background={background}
                odd={index % 2 === 1}
                last={index === items.length - 1}
            />
        ))
    )
}

export default FeaturesComponent

// Styled Components
const Section = styled.section`
    ${props => props.last ? `padding-bottom:3rem;` : ``}
    padding-top:3rem;
    @media (min-width:992px) {
        padding-top:6rem;
        ${props => props.last ? `padding-bottom:6rem;` : `
            padding-bottom:2.5rem;
        `}
    }
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    text-align:center;
    @media (min-width:992px) {
        text-align:left;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Background = styled.div`
    position:relative;
`
const UnsupportedWrapper = styled.div`
    position:relative;
`
const UnsupportedImage = styled.img`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    object-fit:contain;
    z-index:1;
`
const Image = styled(GatsbyImage)`
    width:100%;
    height:100%;
`
const Shape = styled.svg`
    z-index:-1;
    position:absolute;
    fill:${props => props.theme.color.green[200]};
    width:27.5rem;
    bottom:-2.5rem;
    right:-4.375rem;
    display:none;
    .feature__column--odd & {
        right:auto;
        left:-4.375rem;
        fill:${props => props.theme.color.purple[200]};
    }
    @media (min-width:992px) {
        display:block;
    }
`
const VideoWrapper = styled.div`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    z-index:1;
`