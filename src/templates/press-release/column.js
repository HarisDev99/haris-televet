import React, { useState } from "react"
import styled from "styled-components"
import GatsbyImage from "gatsby-image/withIEPolyfill"
import parseContent from "../../utils/parseContent"

// Layout Components
import Container from "../../components/container"

// Components
import VideoComponent from "../../components/video"

const FeatureColumnComponent = ({
  align,
  title,
  description,
  bannerType,
  bannerSrc,
  bannerPlaceholder,
  bannerGif,
  bannerContain,
  bannerCaption,
}) => {
  const [playing, setPlaying] = useState(false)

  return (
    <Section>
      <Container>
        <Grid className={align === "left" ? "left-align" : "right-align"}>
          <Header>
            <Title>{title}</Title>
            <Description>{parseContent(description)}</Description>
          </Header>
          <Background>
            {bannerType === "image" && (
              <Image
                fluid={bannerPlaceholder}
                stlye={{ minHeight: "450px", height: "100%" }}
                objectFit={bannerContain ? "contain" : "cover"}
              />
            )}
            {bannerType === "video" && (
              <div
                style={{
                  display: "grid",
                  gridRowGap: "0.5rem",
                }}
              >
                <div
                  style={{
                    paddingTop: "56.25%",
                    zIndex: 2,
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    borderRadius: "1.25rem",
                    overflow: "hidden",
                  }}
                >
                  <VideoComponent
                    url={bannerSrc}
                    placeholder={bannerPlaceholder}
                    playing={playing}
                    setPlaying={setPlaying}
                  />
                </div>
                {bannerCaption && (
                  <BannerCaption style={{ textAlign: "center" }}>
                    {bannerCaption}
                  </BannerCaption>
                )}
              </div>
            )}
            {bannerType === "gif" && <img src={bannerGif} />}
          </Background>
        </Grid>
      </Container>
    </Section>
  )
}

export default FeatureColumnComponent

// Styled Components
const Section = styled.section`
  padding-top: 0rem;
  padding-bottom: 3rem;
  @media (min-width: 992px) {
    padding-bottom: 6rem;
  }
`
const BannerCaption = styled.div`
  color: ${props => props.theme.color.grey[600]};
`
const Header = styled.header`
  display: grid;
  grid-row-gap: 1rem;
`
const Title = styled.h2`
  font-size: 2rem;
  @media (min-width: 992px) {
    font-size: 2.5rem;
  }
`
const Description = styled.div`
  font-size: 1.25rem;
  line-height: 1.5;
  a {
    text-decoration: underline;
    font-weight: bold;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-row-gap: 2.5rem;
  align-items: center;
  @media (min-width: 992px) {
    justify-content: space-between;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 8rem;
  }
`
const Background = styled.div`
  position: relative;
  height: 100%;
  border-radius: 1.25rem;
  overflow: hidden;
  @media (min-width: 992px) {
    min-height: 350px;
    ${Grid}.right-align & {
      grid-column-start: 1;
      grid-row-start: 1;
    }
  }
`
const Image = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
`
