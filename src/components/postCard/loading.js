import React from 'react'
import styled from 'styled-components'

export const LoadingItem = () => {
    const titleStyle = {
        height: `1.75rem`,
        width: `100%`
    }

    const authorStyle = {
        height: `1.25rem`,
        width: `100%`
    }

    const descriptionStyle = {
        height: `0.85rem`,
        width: `100%`
    }
    return (
        <Wrapper>
            <Shape style={{
                paddingTop: `52.25%`,
                width: `100%`,
                borderRadius: '0.65rem'
            }} className="animate-pulse"/>
            <Title>
                <Shape style={titleStyle} className="animate-pulse"/>
                <Shape style={titleStyle} className="animate-pulse"/>
                <Shape style={titleStyle} className="animate-pulse"/>
            </Title>
            <Shape style={authorStyle} className="animate-pulse"/>
            <Description>
                <Shape style={descriptionStyle} className="animate-pulse"/>
                <Shape style={descriptionStyle} className="animate-pulse"/>
                <Shape style={descriptionStyle} className="animate-pulse"/>
                <Shape style={descriptionStyle} className="animate-pulse"/>
                <Shape style={descriptionStyle} className="animate-pulse"/>
                <Shape style={descriptionStyle} className="animate-pulse"/>
            </Description>
        </Wrapper>
    )
}

export const LoadingGroup = () => {
    return (
        <>
            <LoadingItem/>
            <LoadingItem/>
            <LoadingItem/>
        </>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(0,1fr);
    grid-row-gap: 1.75rem;
    align-content: start;
    position: relative;
}
`
const Shape = styled.div`
    background-color:${props => props.theme.color.grey[200]}
`
const Title = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
`
const Description = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
`