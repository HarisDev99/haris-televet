import React from 'react'
import styled from 'styled-components'

// Utils
import parseContent from '../../utils/parseContent'

// Layout Components
import Container from '../../components/container'

// Components
import Form from '../../components/formBuilder/index'

const TrialComponent = ({
    title,
    description,
    formTitle,
    formId,
    ctaLabel,
    redirect,
    slug,
    sectionId
}) => {
    return (
        <div id={sectionId}>
            <Section>
                <Container>
                    <Header>
                        <Title className={`sm:text--3xl lg:text--5xl`}>{title}</Title>
                        <Content>
                            {parseContent(description)}
                        </Content>
                    </Header>
                </Container>
            </Section>
            <FormSection>
                <Container>
                    <FormWrapper>
                        <FormTitle>{formTitle}</FormTitle>
                        <Form
                            id={formId}
                            ctaLabel={ctaLabel}
                            redirect={redirect}
                            slug={slug}
                        />
                    </FormWrapper>
                </Container>
            </FormSection>
        </div>
    )
}

export default TrialComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:5rem;
    }
`
const Title = styled.h1`
    margin-bottom:0.5rem;
`
const Header = styled.header`
    text-align:center;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
`

const FormSection = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:6.25rem;
        padding-bottom:6.25rem;
    }
`
const FormWrapper = styled.div`
    width:100%;
    max-width: 50.5rem;
    margin:0 auto;
`
const FormTitle = styled.h2`
    margin-bottom:2.875rem;
    text-align:center;
`