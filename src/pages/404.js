import React from 'react'
import styled from 'styled-components'

// Layout Components
import Layout from '../components/layout/index'
import Seo from '../components/seo'
import Container from '../components/container'

// Hooks
import use404 from '../hooks/use404'

const NotFoundComponent = () => {
    const {
        title,
        description
    } = use404()

    return (
        <Layout
            theme={`secondary`}
        >
            <Seo
                title={`404: Not found`}
                noindex
            />
            <Section>
                <Container
                    sm={`grid-row-gap:1rem;`}
                >
                    <h1 className={`sm:text--3xl lg:text--5xl`}>{title}</h1>
                    <p className={`sm:text--lg`}>{description}</p>
                </Container>
            </Section>
        </Layout>
    )
}

export default NotFoundComponent

// Styled Components
const Section = styled.section`
    min-height:50vh;
    padding-top:4.5rem;
    padding-bottom:4.5rem;
    text-align:center;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`