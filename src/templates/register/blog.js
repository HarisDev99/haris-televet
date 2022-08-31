import React from 'react'
import styled from 'styled-components'

// Components
import Container from '../../components/container'
import PostCard from '../../components/postCard/index'

const BlogComponent = ({
    title,
    items
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2rem;
                `}
                lg={`
                    grid-row-gap:3rem;
                `}
            >
                <Header>
                    <h2 className="sm:text--4xl">{title}</h2>
                </Header>
                <List>
                    {items.map((item, index) => (
                        <PostCard
                            key={index}
                            item={item}
                        />
                    ))}
                </List>
            </Container>
        </Section>
    )
}

export default BlogComponent

const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    background-color:${props => props.theme.color.teal[50]};
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const List = styled.div`
    display:grid;
    align-items:start;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:3rem;
    @media (min-width:992px) {
        grid-template-columns:repeat(3,minmax(0,1fr));
        grid-column-gap:2.25rem;
        grid-row-gap:2.25rem;
    }
`
const Header = styled.header`
    text-align:center;
`