import React from 'react'
import styled from 'styled-components'

// Components
import Container from '../../components/container'
import ReviewHeader from '../../components/review/header'

const ReviewsComponent = ({
    items
}) => {
    return (
        <Section>
            <Container>
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
const ReviewsWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2.5rem;
    @media (min-width:992px) {
        grid-template-columns:repeat(2,minmax(0,1fr));
        grid-column-gap:4.5rem;
        max-width:60rem;
        margin:0 auto;
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