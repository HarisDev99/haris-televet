import React from "react"
import styled from "styled-components"
import parseContent from "../../utils/parseContent"

// Layout Components
import Container from "../../components/container"

const FooterComponent = ({
  title,
  description,
  ctaSubtitle,
  ctaTitle,
  ctaLabel,
  ctaLink,
  links,
}) => {
  return (
    <Section>
      <Container>
        <Grid>
          <Header>
            <Title>{title}</Title>
            <Description>{parseContent(description)}</Description>
            <Links>
              {links?.length &&
                links.map(({ label, link }, index) => {
                  return (
                    <LinkItem key={index}>
                      <svg
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        width="16"
                        viewBox="0 0 18 12"
                      >
                        <path
                          d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z"
                          fill="#39ADC3"
                        ></path>
                      </svg>
                      <a href={link}>{label}</a>
                    </LinkItem>
                  )
                })}
            </Links>
          </Header>
          <BgWrapper>
            <CtaSubTitle>{ctaSubtitle}</CtaSubTitle>
            <CtaTitle>{ctaTitle}</CtaTitle>
            <CtaButton
              href={ctaLink}
              className="button button--secondary sm:text--lg"
            >
              {ctaLabel}
            </CtaButton>
          </BgWrapper>
        </Grid>
      </Container>
    </Section>
  )
}

export default FooterComponent

// Styled Components
const Section = styled.section`
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: ${props => props.theme.color.grey[50]};
  @media (min-width: 992px) {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`

const Links = styled.div`
  display: grid;
  grid-row-gap: 0.5rem;
`
const LinkItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  svg {
    margin-right: 1rem;
  }
  a {
    text-decoration: underline;
  }
`

const BgWrapper = styled.div`
  background-color: #fff;
  border-radius: 1.25rem;
  overflow: hidden;
  padding: 2rem;
  box-shadow: 0px 6px 24px rgb(103 117 139 / 15%);
  text-align: center;
  display: grid;
`
const CtaSubTitle = styled.span`
  margin-bottom: 0.5rem;
`
const CtaTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`
const CtaButton = styled.a`
  width: 100%;
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
