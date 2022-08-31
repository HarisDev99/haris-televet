import React, { useRef, useMemo } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { Link as GatsbyLink } from 'gatsby'

import './layout/slider.css'

const GridComponent = ({
    cta = {
        title: ``,
        label: ``,
        uri: ``
    },
    items,
    ItemComponent,
    category
}) => {
    const settings = useMemo(() => {
        return {
            dots:false,
            arrows:false,
            speed: 250,
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: items.length > 2,
            draggable: true,
            swipeToSlide: true,
            swipe: true,
            responsive: [{
                breakpoint: 991,
                settings: {
                    rows: 1,
                    slidesToShow: 1,
                    slidesPerRow: 1,
                    infinite: true,
                    swipeToSlide: true,
                }
            }]
        }
    }, [ items ])

    const sliderRef = useRef(null)

    return (
        <CarouselWrapper>
            <Carousel {...settings} ref={sliderRef}>
                {items.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <ItemComponent
                                {...item}
                                category={category}
                            />
                        </React.Fragment>
                    )
                })}
                <React.Fragment>
                    <CtaItem>
                        <h3 className={`sm:text--xl lg:text--3xl`}>{cta.title}</h3>
                        <Cta className="sm:text--lg" as={GatsbyLink} to={cta.uri}>{cta.label}</Cta>
                    </CtaItem>
                </React.Fragment>
            </Carousel>
            <Controls
                className={items.length < 3 ? `sm:d-grid lg:d-none`: `sm:d-grid`}
            >
                <Button className={`button`} onClick={() => sliderRef.current.slickPrev()} aria-label={`Go to previous slide`}>
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                        <path d="M5.962.32l1.411 1.446-3.27 3.323 13.605.014-.002 2.041L4.138 7.13l3.215 3.298-1.417 1.44L.292 6.08 5.962.32z" fill="#fff"/>
                    </svg>
                </Button>
                <Button className={`button`} onClick={() => sliderRef.current.slickNext()} aria-label={`Go to next slide`}>
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                        <path d="M12.038.32l-1.411 1.446 3.27 3.323-13.605.014.002 2.041 13.568-.014-3.215 3.298 1.417 1.44 5.644-5.788-5.67-5.76z" fill="#fff"/>
                    </svg>
                </Button>
            </Controls>
        </CarouselWrapper>
    )
}

export default GridComponent

// Styled Components
const CarouselWrapper = styled.div`
    position:relative;
    width:30rem;
    max-width:calc(100% - 3rem);
    margin:0 auto;
    @media (min-width:992px) {
        width:calc(1144px + 3rem);
    }
`
const Carousel = styled(Slider)`
    z-index:2;
    .slick-track {
        display:flex;
    }
    .slick-slide, &.slick-initialized .slick-slide {
        display:flex;
    }
    .slick-slide > div {
        padding: 0.65rem;
    }
    &.slick-slider, .slick-list, .slick-track, .slick-slide > div {
        width:100%;
        display:flex;
    }
    @media (min-width:992px) {
        .slick-slide {
            margin: 0 1rem;
        }
        &.slick-slider, .slick-list, .slick-track {
            display:flex;
        }
    }
`
const CtaItem = styled.div`
    height:100%;
    background-color:${props => props.theme.color.grey[50]};
    padding:2rem;
    display:grid;
    align-items: center;
    text-align: center;
    align-content: center;
    grid-row-gap:1rem;
    width:100%;
`
const Cta = styled.a`
    margin-top:auto;
    color:${props => props.theme.color.purple[600]};
    font-weight:bold;
    text-decoration:underline;
    display:block;
    z-index:4;
    position:relative;
`
const Controls = styled.div`
    grid-template-columns:repeat(2, minmax(0,max-content));
    grid-column-gap:0.75rem;
    width:100%;
    justify-content: center;
    position:relative;
    margin:1rem auto 0 auto;
    z-index:1;
    @media (min-width:1304px) {
        position:absolute;
        width:calc(100% + 6rem);
        top:0;
        right:0;
        left:-3rem;
        height:100%;
        align-items:center;
        justify-content: space-between;
        margin:0 auto;
    }
`
const Button = styled.button`
    width:3rem;
    height:3rem;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    cursor:pointer;
    z-index:2;
    position:relative;
`