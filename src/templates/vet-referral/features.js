import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'

// Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const FeaturesComponent = ({
    items,
}) => {
    return (
        items.map(({
            title,
            description,
            background
        }, index) => {
            const idOdd = index % 2

            const sectionClass = idOdd ? `secondary` : `primary`

            return (
                <Section className={`feature__section--${sectionClass}`}>
                    <Container
                        sm={`
                            grid-row-gap:1.5rem;
                        `}
                        lg={`
                            grid-column-gap:7.25rem;
                            grid-template-columns:repeat(2,minmax(0,1fr));
                        `}
                    >
                        <Header className={`feature__header--${sectionClass}`}>
                            <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                            <Content>
                                {parseContent(description)}
                            </Content>
                        </Header>
                    </Container>
                </Section>
            )
        })
    )
}

export default FeaturesComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:7.5rem;
        padding-bottom:10rem;
    }
    &.feature__section--secondary {
        background-color:${props => props.theme.color.grey[50]};
    }
`
const Background = styled.div`
    height:100%;
    .feature__image--primary {
    }
    .feature__image--secondary {
        grid-column:1/2;
        grid-row:1;
    }
    @media (min-width:992px) {
        min-height:25rem;
    }
`
const Shape = styled.svg`
    display:none;
    @media (min-width:992px) {
        width:27.5rem;
        position:absolute;
        bottom: -2.5rem;
        display:block;
        &.feature__shape--primary {
            right: -3.5rem;
            fill: ${props => props.theme.color.purple[200]};
        }
        &.feature__shape--secondary {
            left:-3.5rem;
            fill: ${props => props.theme.color.orange[200]};
        }
    }
`
const Image = styled(GatsbyImage)`
    height: 100%;
    z-index:1;
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    @media (min-width:992px) {
        grid-row-gap:3rem;
        &.feature__header--secondary {
            grid-column:2/3;
            grid-row:1;
        }
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    max-width:30rem;
`