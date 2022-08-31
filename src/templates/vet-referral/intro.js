import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Components
import Container from '../../components/container'
// import Form from './form'
import Form from '../../components/formBuilder/index'

// Utils
import parseContent from '../../utils/parseContent'

const IntroComponent = ({
    title,
    description,
    background,
    confirmation_page,
    cta_label,
    formId,
    items,
    slug
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2.5rem;
                `}
                lg={`
                    grid-row-gap:5rem;
                `}
            >
                <Image fluid={background.localFile.childImageSharp.fluid} alt={background.alt_text || background.title}/>
                <Wrapper>
                    <FormContainer>
                        <Header>
                            <Title className={`sm:text--base`}>
                                <Subtitle className={`sm:text--xl lg:text--2xl`}>{title}</Subtitle>
                                <span>{description}</span>
                            </Title>
                        </Header>
                        <div>
                            <Form
                                id={formId}
                                ctaLabel={cta_label}
                                redirect={{
                                    type: `internal`,
                                    linkInternal: confirmation_page
                                }}
                                slug={slug}
                            />
                        </div>
                    </FormContainer>
                    <ContentContainer>
                        {items.map(({
                            title,
                            description,
                        }, index) => (
                            <Item key={index}>
                                <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                                <Content>
                                    {parseContent(description)}
                                </Content>
                            </Item>
                        ))}
                    </ContentContainer>
                </Wrapper>
            </Container>
        </Section>
    )
}

export default IntroComponent

// Styled Components
const Section = styled.section`
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    background:linear-gradient(180deg,${props => props.theme.color.grey[50]} 8rem, #fff 8rem);
    @media (min-width:992px) {
        background:linear-gradient(180deg,${props => props.theme.color.grey[50]} 20rem, #fff 20rem);
        padding-top: 2.5rem;
        padding-bottom:5rem;
    }
`
const Header = styled.header`
    text-align: center;
`
const Subtitle = styled.span`
`
const Title = styled.h1`
    display: grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap: 1rem;
    @media (min-width:992px) {
        grid-row-gap: 1rem;
    }
`
const FormContainer = styled.div`
    background-color:${props => props.theme.color.grey[50]};
    border-radius:0.5rem;
    max-width:50rem;
    margin:0 auto;
    width:100%;
    box-shadow:0px 8px 32px rgba(103,117,139,0.15);
    overflow:hidden;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    padding:2rem;
    grid-row-gap:1.5rem;
    @media (min-width:992px) {
        grid-column:2/3;
        grid-row:1;
    }
`
const Image = styled(GatsbyImage)`
    width:100%;
    border-radius:0.5rem;
    box-shadow:0px 8px 32px rgba(103,117,139,0.15);
`
const Wrapper = styled.div`
    display:grid;
    align-items:start;
    grid-row-gap:2.5rem;
    @media (min-width:992px) {
        grid-template-columns:repeat(2,minmax(0,1fr));
        grid-column-gap:6rem;
    }
`
const ContentContainer = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:3rem;
    @media (min-width:992px) {
        grid-column:1/2;
        grid-row:1;
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2.5rem;
    max-width:30rem;
`
const Item = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2.5rem;
`