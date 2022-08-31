import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import GatsbyImage from "gatsby-image"

// Layout Components
import Container from "../../components/container"

const IntroComponent = ({ banners }) => {
  return (
    <Section>
      <Container>
        <Wrapper>
          {banners &&
            banners.length &&
            banners.map((banner, index) => {
              return (
                <ImageWrapper>
                  <GatsbyImage
                    key={index}
                    fluid={banner}
                    style={{
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  />
                </ImageWrapper>
              )
            })}
        </Wrapper>
      </Container>
    </Section>
  )
}

export default IntroComponent

// Styled Components
const Section = styled.section`
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media (min-width: 992px) {
    padding-top: 4rem;
    padding-bottom: 6rem;
  }
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-row-gap: 2rem;
  @media (min-width: 992px) {
    grid-column-gap: 4rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 275px;
  margin: 0 auto;
  @media (min-width: 992px) {
    max-width: 100%;
    margin: 0;
  }
`
