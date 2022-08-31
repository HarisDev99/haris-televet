import React from 'react'
import styled from 'styled-components'

// Layout Components
import Container from '../../components/container'

const TableComponent = ({
    items,
}) => {
    const titles = [
        `State`,
        `Link to Practice Act`,
        `VCPR must be established in-person`,
        `Scope of VCPR`,
        `Where telemedicine occurs`,
        `Brief Summary of Guidelines/Restrictions`
    ]

    return (
        <Section>
            <Container>
                <TableContainer>
                    <Table className={`sm:text--xs lg:text--sm`}>
                        <Header>
                            <Row>
                                {titles.map((title) => (
                                    <Title>{title}</Title>
                                ))}
                            </Row>
                        </Header>
                        <Body>
                            {items.map(({
                                state,
                                practiceAct,
                                inPerson,
                                scope,
                                location,
                                summary,
                            }, index) => (
                                <Row key={index}>
                                    <Item>{state}</Item>
                                    <Item>
                                        <Link href={practiceAct} target={`_blank`} rel={`nofollow`}>{`${state} Practice Act`}</Link>
                                    </Item>
                                    <Item>{inPerson ? `Yes` : `No`}</Item>
                                    <Item>{scope}</Item>
                                    <Item>{location}</Item>
                                    <Item>{summary}</Item>
                                </Row>
                            ))}
                        </Body>
                    </Table>
                </TableContainer>
            </Container>
        </Section>
    )
}

export default TableComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-bottom:5rem;
        padding-top:5rem;
    }
`
const TableContainer = styled.div`
    width:100%;
    overflow-x:scroll;
    box-shadow:0px 8px 32px rgba(103,117,139,0.15);
    @media (min-width:992px) {
        overflow-x:auto;
        box-shadow:none;
    }
`
const Table = styled.table`
    border-spacing: 0;
    width:100%;
    text-align:left;
`
const Header = styled.thead`
`
const Body = styled.tbody`
`
const Title = styled.th`
    border-bottom:1px solid ${props => props.theme.color.grey[300]};
    padding:0.5rem;
    line-height:1.25;
    min-width:7rem;
    &:last-child {
        max-width:20rem;
    }
    @media (min-width:992px) {
        padding:1rem;
    }
`
const Row = styled.tr`
    &:nth-child(odd) {
        background-color:${props => props.theme.color.grey[50]};
    }
    ${Header} &:first-child {
        background-color:#fff;
    }
`
const Item = styled.td`
    border-bottom:1px solid ${props => props.theme.color.grey[200]};
    padding:0.5rem;
    @media (min-width:992px) {
        padding:1rem;
    }
    &:last-child {
        max-width:25rem;
    }
`
const Link = styled.a`
    text-decoration:underline;
`