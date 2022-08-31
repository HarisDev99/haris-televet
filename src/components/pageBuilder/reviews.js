import React from 'react'
import styled from 'styled-components'

// Components
import Container from '../../components/container'
import Review from '../../components/review/index'

const ReviewsComponent = ({
    type,
    items
}) => {
    switch (type) {
        default:
            const featured = items[0]
            return (
                <Section>
                    <Container>
                        <Wrapper>
                            <Review
                                name={featured.reviewAuthor}
                                role={featured.reviewRole}
                                description={featured.reviewContent}
                                background={featured.reviewAvatar}
                            />
                        </Wrapper>
                    </Container>
                </Section>
            )
    }
}

export default ReviewsComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:4.375rem;
        padding-bottom:4.375rem;
    }
`
const Wrapper = styled.div`
    background-color:${props => props.theme.color.grey[50]};
    border-radius:1.5rem;
    padding-top:3.75rem;
    padding-bottom:3.75rem;
    @media (min-width:992px) {
        padding-top:5.25rem;
        padding-bottom:5.25rem; 
    }
`