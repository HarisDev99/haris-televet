import React from 'react'
import styled from 'styled-components'

// Components
import TooltipComponent from '../tooltip'

const TableComponent = ({
    items,
    alt = false
}) => {
    return (
        <Table className={alt ? `alt` : ``}>
            {items.map(({
                title,
                description,
                value,
                label
            }, index) => {
                return (
                    <TableItem key={index}>
                        <TableHeader>
                            <TooltipTitle className="sm:text--base lg:text--lg">{title}</TooltipTitle>
                            {description && <TooltipComponent
                                alignRight
                                message={description}
                            />}
                        </TableHeader>
                        <TablePrice>
                            <span className="sm:text--base lg:text--xl" style={{ fontWeight: 'bold' }}>{value}</span>
                            {label && <span className="sm:text--sm">{label}</span>}
                        </TablePrice>
                    </TableItem>
                )
            })}
        </Table>
    )
}

export default TableComponent

const Table = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
`
const TableItem = styled.div`
    display:grid;
    grid-template-columns:repeat(2,minmax(0,1fr));
    align-items:center;
    border-bottom: 1px solid;
    border-color:${props => props.theme.color.teal[300]};
    .alt & {
        border-color:rgba(255,255,255,0.3);
    }
    padding:0.75rem 0;
    &:first-child {
        padding-top:0;
    }
    &:last-child {
        border-bottom:none;
        padding-bottom:0;
    }
    @media (min-width:992px) {
        grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);
    }
`
const TableHeader = styled.h3`
    font-weight:normal;
    display:inline;
    line-height:1.1;
    color:${props => props.theme.color.primary.dark};
    .alt & {
        color:#fff;
    }
`
const TablePrice = styled.div`
    text-align:right;
    color:${props => props.theme.color.primary.dark};
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.25rem;
    & > * {
        line-height: 1;
    }
    .alt & {
        color:#fff;
        font-size:1.15rem;
    }
    @media (min-width:992px) {
        .alt & {
            font-size:1.75rem;
        }
    }
`
const TooltipTitle = styled.span`
    display:inline;
    line-height:1.2;
    margin-right:0.5rem;
`
