import React from 'react'
import styled from 'styled-components'
import GatbsbyImage from 'gatsby-image/withIEPolyfill'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantSix'

// Utils
import parseContent from '../../utils/parseContent'

const IconColumnsComponent = ({
    title,
    description,
    columnCount,
    columns,
    bgColor
}) => {
    return (
        <Section bgColor={bgColor}>
            <Container 
                sm={`
                    grid-row-gap:4rem;
                `}
            >
                <Header
                    title={title}
                    description={description}
                />
                <Row columns={columnCount}>
                    {columns.map(({
                        title,
                        description,
                        icon
                    }, index) => (
                        <Column key={index}>
                            <Icon fixed={icon.localFile.childImageSharp.fixed} alt={icon.altText || icon.title}/>
                            <h3 className={`sm:text--xl`}>{title}</h3>
                            <Content>
                                {parseContent(description)}
                            </Content>
                        </Column>
                    ))}
                </Row>
            </Container>
        </Section>
    )
}

export default IconColumnsComponent

// Styled Components
const Section = styled.section`
    ${props => props.bgColor ? `background-color:${props.theme.color.grey[50]};` : ``}
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-bottom:5rem;
        padding-top:5rem;
    }
`
const Row = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-column-gap:3rem;
    grid-row-gap:3rem;
    justify-content:space-between;
    align-items: start;
    @media (min-width:992px) {
        grid-template-columns: repeat(${props => props.columns ? props.columns : 3}, minmax(0,1fr));
    }
`
const Column = styled.div`
    display:grid;
    grid-row-gap:1.5rem;
    align-items:start;
    text-align:center;
`
const Icon = styled(GatbsbyImage)`
    height:3rem;
    margin:0 auto;
`

const Content = styled.div`

`