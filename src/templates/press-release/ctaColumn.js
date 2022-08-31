import React from "react"
import styled from "styled-components"

// Layout Components
import Container from "../../components/container"

// Components

const CtaColumn = ({ title, ctaLink, ctaLabel }) => {
  return (
    <Section>
      <Container>
        <Wrapper>
          <Title>{title}</Title>
          <Button
            href={ctaLink}
            className="button button--secondary sm:text--lg lg:text--base 2xl:text--lg sm:d-none xl:d-block"
          >
            {ctaLabel}
          </Button>
        </Wrapper>
      </Container>
    </Section>
  )
}

export default CtaColumn

// Styled Components
const Section = styled.section`
  background-color: ${props => props.theme.color.grey[50]};
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 4rem;
  display: block;
  position: sticky;
  top: 70px;
  z-index: 2;
  @media (min-width: 992px) {
    top: 100px;
  }
`

const Title = styled.h2`
  font-size: 1.125rem;
  width: auto;
  @media (min-width: 992px) {
    font-size: 2rem;
  }
`

const Button = styled.a`
  font-size: 0.95rem;
  display: inline-flex;
  white-space: nowrap;
  margin-left: 1rem;
  @media (min-width: 992px) {
    font-size: 1.25rem;
  }
  @media (max-width: 991px) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 992px) {
    flex-wrap: nowrap;
  }
`
