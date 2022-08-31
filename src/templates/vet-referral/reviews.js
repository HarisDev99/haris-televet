import React from 'react'
import styled from 'styled-components'

// Components
import Container from '../../components/container'
import ReviewHeader from '../../components/review/header'

const ReviewsComponent = ({
    title,
    items
}) => {
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:1.5rem;
                `}
                lg={`
                    grid-row-gap:5rem;
                `}
            >
                <Header>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                </Header>
                <ReviewsWrapper>
                    {items.map(({
                        reviewContent: {
                            reviewAuthor: name,
                            reviewContent: description,
                            reviewRole: role,
                            reviewAvatar: background
                        }
                    }, index) => (
                        <ReviewItem key={index}>
                            <ReviewHeader
                                background={background}
                                name={name}
                                role={role}
                                description={description}
                            />
                            <ReviewDescription className={`sm:text--lg`}>{`“${description}”`}</ReviewDescription>
                        </ReviewItem>
                    ))}
                </ReviewsWrapper>
            </Container>
        </Section>
    )
}

export default ReviewsComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:5rem;
    }
`
const Header = styled.header`
    text-align:center;
    margin:0 auto;
    max-width:35rem;
`
const ReviewsWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2.5rem;
    @media (min-width:992px) {
        grid-template-columns:repeat(3,minmax(0,1fr));
        grid-column-gap:4.5rem;
    }
`
const ReviewItem = styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    @media (min-width:992px) {
        justify-content:start;
    }
`
const ReviewDescription = styled.p`
    margin-top:1.5rem;
    text-align:center;
    @media (min-width:992px){
        text-align:left;
    }
`