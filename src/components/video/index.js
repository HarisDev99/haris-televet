import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import ReactPlayer from "react-player"

const PlayIcon = () => {
  return (
    <PlayButton>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </svg>
    </PlayButton>
  )
}

const VideoComponent = ({ url, placeholder, playing, setPlaying }) => {
  const handleOnReady = () => setPlaying(true)

  const wrapper = useRef(null)

  useEffect(() => {
    const domNode = wrapper.current

    let observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && playing) {
        setPlaying(false)
      }
    })

    observer.observe(domNode)

    return () => {
      observer.disconnect()
    }
  }, [wrapper, playing, setPlaying])
  return (
    <Wrapper ref={wrapper}>
      <Video
        className={`video-responsive`}
        url={url}
        light={placeholder}
        width={`100%`}
        height={`100%`}
        onReady={handleOnReady}
        onPlay={() => setPlaying(true)}
        playIcon={<PlayIcon />}
        controls={true}
        playing={playing}
        config={{
          file: {
            attributes: {
              onContextMenu: e => e.preventDefault(),
            },
          },
          youtube: {
            playerVars: {
              rel: 0,
              showinfo: 0,
              controls: true,
              color: `white`,
              modestbranding: 1,
              listType: "playlist",
              autoplay: 1,
              enablejsapi: 1,
              playsinline: 1,
            },
          },
          vimeo: {
            playerOptions: {
              controls: true,
              color: `9046CF`,
            },
          },
        }}
      />
    </Wrapper>
  )
}

export default VideoComponent

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`
const Video = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const PlayButton = styled.div`
  width: 9rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  position: relative;
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: ${props => props.theme.color.primary.dark};
    opacity: 0.9;
    transition: opacity 0.2s;
  }
  .product__video:hover &:before {
    opacity: 0.75;
  }
  & svg {
    height: 90%;
    z-index: 1;
  }
`
