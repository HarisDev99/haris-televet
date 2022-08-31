import React, { useRef } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

import '../layout/slider.css'

// Layout Components
import Container from '../container'

const RenderLogo = ({
    image
}) => {
    const isFluid = image.localFile.childImageSharp
    return (
        <ImageWrapper>
        {isFluid ? 
            <Logo as={GatsbyImage} fluid={isFluid.fluid} objectFit={`contain`} objectPosition={`0`} alt={image.altText || image.title}/>
        :
            <Logo src={image.localFile.publicURL} loading={`lazy`} alt={image.altText || image.title}/>}
        </ImageWrapper>
    )
}

const NewsComponent = ({
    title = `TeleVet in the news`,
    items
}) => {
    const settings = {
        dots:false,
        arrows:false,
        speed: 250,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        draggable: false,
        swipe: false,
        responsive: [{
            breakpoint: 991,
            settings: {
                rows: 3,
                slidesToShow: 1,
                slidesPerRow: 1,
                infinite: false,
                swipeToSlide: false,
            }
        }]
    }

    const sliderRef = useRef(null)
    
    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2.5rem;
                `}
                lg={`
                    grid-row-gap:3.75rem;
                `}
            >
                <Header>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                </Header>
                <Carousel {...settings} ref={sliderRef}>
                    {items.map(({
                        logo,
                        title,
                        date,
                        link
                    }, index) => (
                        <React.Fragment key={index}>
                            <Item>
                                <Content>
                                    <RenderLogo
                                        image={logo}
                                    />
                                    <h3 className={`sm:text--2xl`}>{title}</h3>
                                    <span className={`sm:text--base`}>{date}</span>
                                </Content>
                                <Cta className={`button--icon button--arrow sm:text--lg`} href={link} target={`_blank`} aria-label={`Read more: ${title}`}>
                                    {`Read the article`}
                                    <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                        <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                                    </svg>
                                </Cta>
                            </Item>
                        </React.Fragment>
                    ))}
                </Carousel>
                {items.length > 3 &&
                    <Controls>
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
                }
            </Container>
        </Section>
    )
}

export default NewsComponent

// Styled Components
const Section = styled.section`
    padding-top:3rem;
    padding-bottom:3rem;
    @media (min-width:992px) {
        padding-top:3rem;
        padding-bottom:6rem;
    }
`
const Header = styled.header`
    text-align:center;
`
const Carousel = styled(Slider)`
    .slick-slide, &.slick-initialized .slick-slide {
        display:inherit;
    }
    @media (min-width:992px) {
        margin: 0 -1rem;
        &.slick-slider, .slick-list, .slick-track {
            display:flex;
        }
    }
`
const Item = styled.article`
    height:100%;
    margin:0 0 2rem 0;
    padding:2.5rem 2rem;
    border-radius:0.375rem;
    background-color:${props => props.theme.color.grey[50]};
    transition: all .2s;
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items: start;
    @media (min-width:992px) {
        margin:0 1rem;
    }
`
const Cta = styled.a`
    margin-top:auto;
`
const ImageWrapper = styled.div`
    height:4rem;
    display:flex;
    align-items:center;
    @media (min-width:992px) {
        margin-bottom:1.5rem;
    }
`
const Logo = styled.img`
    object-fit: contain;
    max-width: 12.5rem;
    object-position: 0;
    height: 100%;
    width: 100%;
`
const Content = styled.div`
    width:100%;
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    margin-bottom:3rem;
`
const Controls = styled.div`
    display:none;
    grid-template-columns:repeat(2, minmax(0,max-content));
    grid-column-gap:0.75rem;
    width:100%;
    justify-content: center;
    @media (min-width:992px) {
        display:grid;
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
`