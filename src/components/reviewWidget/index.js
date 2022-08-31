import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'

const ReviewComponent = ({
    items,
    title
}) => {

    const settings = {
        infinite:true,
        speed:600,
        autoplaySpeed: 5000,
        slidesToShow:1,
        slidesToScroll:1,
        autoplay:true,
        fade:true,
        arrows:false,
        pauseOnHover:false,
        adaptiveHeight: true,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1810,
                settings: {
                    autoplay:false
                }
            }
        ]
    }
    return (
        <Wrapper>
            <ReviewWrapper>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 22">
                    <path fill="currentColor" fillRule="evenodd" d="M8.256 0c.397 0 .767.207.985.549.191.3.244.67.15 1.01l-.05.145-2.835 6.852h2.93c.604 0 1.103.47 1.171 1.08l.008.142v11c0 .627-.455 1.143-1.042 1.214L9.436 22H1.179c-.604 0-1.103-.471-1.171-1.08L0 20.778.001 9.769c.001-.14.033-.276.08-.41l.057-.145.018-.042L4.874.616c.186-.339.515-.562.884-.607L5.898 0h2.358zm13.385 0c.396 0 .767.207.985.549.19.3.244.67.149 1.01l-.05.145-2.834 6.852h2.93c.604 0 1.103.47 1.171 1.08l.008.142v11c0 .627-.456 1.143-1.042 1.214l-.137.008h-8.257c-.604 0-1.103-.471-1.171-1.08l-.008-.142V9.774c.002-.144.034-.281.081-.415l.056-.145.018-.042L18.258.616c.187-.339.516-.562.884-.607l.14-.009h2.359z"/>
                </svg>
                <Items>
                    <Slider {...settings}>
                        {items.map((description, index) => (
                            <React.Fragment key={index}>
                                <Body>{description}</Body>
                            </React.Fragment>
                        ))}
                    </Slider>
                </Items>
            </ReviewWrapper>
            <Label>{title}</Label>
        </Wrapper>
    )
}

export default ReviewComponent

const Wrapper = styled.div`
    display:none;
    @media (min-width:1810px) {
        display:grid;
        position:absolute;
        top:1.5rem;
        right:1.5rem;
        z-index:2;
        grid-template-columns:minmax(0,1fr);
        grid-row-gap:1rem;
        max-width:calc(50% - 30rem);
        width:18.5rem;
    }
`
const ReviewWrapper = styled.div`
    background-color:#fff;
    border-radius:0.5rem;
    width:100%;
    box-shadow:0 10px 18px 0 rgba(0,10,63,.15);
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.5rem;
    .slick-list {
        transition: height .3s;
    }
    svg {
        width:1.5rem;
        color:${props => props.theme.color.teal[400]};
        margin:1.5rem 1.5rem 0 1.5rem
    }
`
const Items = styled.div`
    overflow:hidden;
    position:relative;
`
const Body = styled.p`
    padding:0.5rem 1.5rem 1.5rem 1.5rem;
    line-height:1.45rem;
`
const Label = styled.span`
    text-align:right;
`