import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantSix'

const TeamComponent = ({
    title = `Meet the team`,
    description = ` Egg whites, turkey sausage, wheat toast, water.`,
    items
}) => {
    const imageRef = useRef(null)
    const contentRef = useRef(null)

    const [ active, setActive ] = useState(0)
    const [ height, setHeight ] = useState([])

    const handleSlide = (count) => {
        let activeSlide = active + count

        const lastSlide = items.length - 1

        // If target slide is < first slide, reset to last slide
        if (activeSlide < 0) {
            activeSlide = lastSlide
        }

        // If target slide is > last slide, reset to first slide
        if (activeSlide > lastSlide) {
            activeSlide = 0
        }
        
        // Get height of the target slide
        const newHeight = [
            imageRef.current.children.item(activeSlide).offsetHeight,
            contentRef.current.children.item(activeSlide).offsetHeight
        ]

        setActive(activeSlide)
        setHeight(newHeight)
    }

    useEffect(() => {
        if (height.length === 0) {
            const newHeight = [
                imageRef.current.children.item(active).offsetHeight,
                contentRef.current.children.item(active).offsetHeight
            ]

            setHeight(newHeight)
        }

        const handleResize = () => {
            const newHeight = [
                imageRef.current.children.item(active).offsetHeight,
                contentRef.current.children.item(active).offsetHeight
            ]

            setHeight(newHeight)
        }

        window.addEventListener(`resize`, handleResize)

        return () => {
            window.removeEventListener(`resize`, handleResize)
        }
    }, [ height, imageRef, contentRef, active ])

    return (
        <Section>
            <Container
                sm={`
                    grid-row-gap:2rem;
                `}
                lg={`
                    grid-row-gap:5rem;
                `}
            >
                <Header
                    title={title}
                    description={description}
                />
                <Wrapper>
                    <Background 
                        ref={imageRef}
                        style={{
                            height: height.length > 0 && height[0]
                        }}
                    >
                        {items.map(({
                            background
                        }, index) => (
                            <Image 
                                fluid={background.localFile.childImageSharp.fluid}
                                alt={background.altText || background.title}
                                className={index === active && `feature__background--active`}
                                style={{
                                    position: ``
                                }}
                                key={index}
                            />
                        ))}
                    </Background>
                    <Content 
                        ref={contentRef}
                        style={{
                            height: height.length > 1 && height[1]
                        }}
                    >
                        {items.map(({
                            title = `Sales`,
                            description = `The listeners who provide you with personalized solutions`
                        }, index) => (
                            <Item 
                                className={index === active && `feature__item--active`}
                                key={index}
                            >
                                <h3 className={`sm:text--xl lg:text--2xl`}>{title}</h3>
                                <Description className={`sm:text--lg lg:text--xl`}>{description}</Description>
                            </Item>
                        ))}
                        <Controls>
                            <Button className={`button`} onClick={() => handleSlide(-1)} aria-label={`Go to previous slide`}>
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                                    <path d="M5.962.32l1.411 1.446-3.27 3.323 13.605.014-.002 2.041L4.138 7.13l3.215 3.298-1.417 1.44L.292 6.08 5.962.32z" fill="#fff"/>
                                </svg>
                            </Button>
                            <Button className={`button`} onClick={() => handleSlide(1)} aria-label={`Go to next slide`}>
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12">
                                    <path d="M12.038.32l-1.411 1.446 3.27 3.323-13.605.014.002 2.041 13.568-.014-3.215 3.298 1.417 1.44 5.644-5.788-5.67-5.76z" fill="#fff"/>
                                </svg>
                            </Button>
                        </Controls>
                    </Content>
                </Wrapper>
            </Container>
        </Section>
    )
}

export default TeamComponent

// Styled Components
const Section = styled.section`
    background-color:${props => props.theme.color.grey[50]};
    padding-top:3.75rem;
    padding-bottom:5.375rem;
    @media (min-width:992px) {
        padding-top:6.25rem;
        padding-bottom:7rem;
    }
`
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    position:relative;
    align-items: start;
    grid-row-gap:2rem;
    @media (min-width:992px) {
        max-width:59.375rem;
        width:100%;
        margin:0 auto;
        justify-content:space-between;
        grid-template-columns:minmax(0, 16.375rem) minmax(0, 35rem);
    }
`
const Item = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
    opacity:0;
    visibility:hidden;
    transition: all .2s;
    position:absolute;
    left:0;
    top:0;
    text-align:center;
    &.feature__item--active {
        position:relative;
        opacity:1;
        visibility:visible;
    }
    @media (min-width:992px) {
        text-align:left;
        grid-row-gap:1rem;
    }
`
const Content = styled.div`
    position:relative;
    transition: all .15s;
    @media (min-width:992px) {
        grid-column:1/2;
        grid-row:1;
    }
`
const Description = styled.p`
    padding-bottom:4.1375rem;
    min-height:10.5rem;
    @media (min-width:992px) {
        min-height:11.75rem;
    }
`
const Controls = styled.div`
    position:absolute;
    bottom:0;
    left:0;
    display:grid;
    grid-template-columns:repeat(2, minmax(0,max-content));
    grid-column-gap:0.75rem;
    width:100%;
    justify-content: center;
    @media (min-width:992px) {
        justify-content: start;
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
const Background = styled.div`
    position:relative;
    transition: all .15s;
    @media (min-width:992px) {
        grid-row:1;
        grid-column:2/3;
    }
`
const Image = styled(GatsbyImage)`
    opacity: 0;
    visibility:hidden;
    transition: all .15s;
    position:absolute;
    top:0;
    right:0;
    width: 100%;
    box-shadow: 0px 8px 32px rgba(103, 117, 139, 0.15);
    &.feature__background--active {
        opacity:1;
        visibility:visible;
        position:relative;
    }
`