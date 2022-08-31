import React, { useState, useRef, useEffect } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Utils
import parseContent from '../../utils/parseContent'

// Components
import Container from '../../components/container'

const PlayIcon = () => {
    return (
        <PlayButton>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
        </PlayButton>
    )
}

const IntroComponent = ({
    logo,
    title,
    description,
    cta,
    videoUrl,
    videoPlaceholder,
    videoBannerType
}) => {
    const [ playing, setPlaying ] = useState(false)

    const handleOnReady = () => setPlaying(true)

    const wrapper = useRef(null)

    useEffect(() => {
        if (videoBannerType) {
            const domNode = wrapper.current

            let observer = new IntersectionObserver(([entry]) => {
                if (!entry.isIntersecting && playing) {
                    setPlaying(false)
                }
            }, {
                threshold: 0.1
            })
    
            observer.observe(domNode)
    
            return () => {
                observer.disconnect()
            }
        }
    }, [ wrapper, playing, videoBannerType])
    return (
        <Section>
            <Container>
                <Wrapper>
                    <Header>
                        <GatsbyImage fixed={logo.localFile.childImageSharp.fixed} alt={logo.altText || logo.title} objectFit={`contain`} style={{ maxWidth: `100%` }}/>
                        <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
                        <Content>
                            {parseContent(description)}
                        </Content>
                        {cta.type === `internal` ?
                            <GatsbyLink to={cta.linkInternal.uri} className={`button button--primary sm:text--xl`}>
                                {cta.label}
                            </GatsbyLink>
                        :
                            <a href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button button--primary sm:text--xl`}>
                                {cta.label}
                            </a>
                        }
                    </Header>
                    {videoBannerType && <VideoWrapper ref={wrapper}>
                        <Video
                            className={`product__video`}
                            url={videoUrl}
                            light={videoPlaceholder.localFile.childImageSharp.fluid.srcWebp}
                            width={`100%`}
                            height={`100%`}
                            onReady={handleOnReady}
                            onPlay={() => setPlaying(true)}
                            playIcon={<PlayIcon/>}
                            controls={true}
                            playing={playing}
                            config={{
                                file: { 
                                    attributes: {
                                        onContextMenu: e => e.preventDefault()
                                    } 
                                }, 
                                youtube: {
                                    playerVars: {
                                        rel: 0,
                                        showinfo: 0,
                                        controls: true,
                                        color: `white`,
                                        modestbranding: 1,
                                        listType: 'playlist',
                                        autoplay: 1,
                                        enablejsapi: 1,
                                        playsinline: 1
                                    }
                                },
                                vimeo: {
                                    playerOptions: {
                                        controls: true,
                                        color: `9046CF`
                                    }
                                }
                            }} 
                        />
                    </VideoWrapper>}
                </Wrapper>
            </Container>
        </Section>
    )
}

export default IntroComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:2rem;
    padding-bottom:0;
    position:relative;
    overflow:hidden;
    .theme--dark & {
        background-color:${props => props.theme.color.primary.dark};
    }
    @media (min-width:992px) {
        padding-top:4rem;
    }
`
const Wrapper = styled.div`
    max-width:55rem;
    width: 100%;
    margin:0 auto;
    display:grid;
    grid-template-columns:minmax(0,1fr);
`
const Header = styled.header`
    text-align:center;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    justify-items:center;
    grid-row-gap:1.5rem;
    max-width:50rem;
    margin:0 auto 4rem auto;
    .theme--dark & {
        color:#fff;
    }
`
const Content = styled.div`
    max-width:42rem;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const VideoWrapper = styled.div`
    position:relative;
    padding-top:56.25%;
    width:100%;
    overflow:hidden;
    border-top-right-radius:0.5rem;
    border-top-left-radius:0.5rem;
    box-shadow:0 30px 40px 0 rgba(0,10,63,.2);
`
const Video = styled(ReactPlayer)`
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
`
const PlayButton = styled.div`
    width: 9rem;
    height: 5rem;
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    position:relative;
    &:before {
        content: '';
        display:block;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:0;
        background-color:${props => props.theme.color.primary.dark};
        opacity:0.9;
        transition: opacity .2s;
    }
    .product__video:hover &:before {
        opacity:0.75;
    }
    & svg {
        height:90%;
        z-index:1;
    }
`