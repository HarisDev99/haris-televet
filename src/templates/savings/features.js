import React, { useRef } from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Layout Components
import Container from '../../components/container'

// Components
import Header from '../../components/title/variantFive'

const FeaturesComponent = ({
    items,
    title
}) => {
    const curIndex = useRef(0)
    
    const handleIndex = (inputIndex) => {
        const labels = ['one', 'two', 'three', 'four']

        if (inputIndex % 4 === 0) {
            curIndex.current = 0
        } else {
            curIndex.current = curIndex.current + 1
        }

        return labels[curIndex.current]
    }

    return (
        <Section>
            <Container>
                <Title className="sm:text--2xl lg:text--4xl">{title}</Title>
                {items.map(({
                    title,
                    description,
                    background,
                    cta
                }, index) => {
                    const label = handleIndex(index)

                    return (
                        <Grid 
                            key={index}
                            className={`feature__column--${label}`}
                        >
                            <Header
                                title={title}
                                description={description}
                                cta={cta}
                            />
                            <Background>
                                {background.localFile.extension === `gif` ?
                                    <GifImage 
                                        src={background.localFile.publicURL}
                                        alt={background.altText || background.title}
                                    />
                                    :
                                    <Image 
                                        fluid={background.localFile.childImageSharp.fluid}
                                        alt={background.altText || background.title}
                                        objectFit="contain"
                                    />
                                }
                                {curIndex.current === 0 ?
                                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 400">
                                        <path d="M430.479 49.595c21.495 42.911-2.887 114.326-16.04 165.694-12.833 51.369-14.437 82.378-26.307 112.447-11.87 30.069-34.006 59.199-62.88 68.596-28.552 9.083-64.162-1.253-116.775-3.759-52.614-2.193-122.23 3.759-163.936-25.684-41.706-29.756-55.18-94.907-35.931-146.275 19.249-51.368 71.22-89.268 120.947-127.481 49.405-38.213 96.564-77.053 153.99-88.955C340.972-8.038 408.664 6.37 430.479 49.595z"/>
                                    </Shape>
                                : curIndex.current === 1 ?
                                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 335">
                                        <path d="M386.494 20.3c41.915 28.87 62.178 92.716 48.021 141.85-14.434 49.411-63.287 84.665-105.201 108.538-41.914 23.873-77.167 36.92-124.91 49.411-47.743 12.77-107.977 25.261-150.169 1.388-41.914-24.15-65.508-84.388-48.854-128.247 16.655-43.582 73.836-70.786 115.75-99.656 41.914-28.869 69.117-59.96 114.362-78.28C280.738-3.017 344.58-8.846 386.494 20.3z"/>
                                    </Shape>
                                : curIndex.current === 2 ?
                                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 335">
                                        <path d="M71.52 20.519C28.954 40.958-8.012 88.276 1.51 126.354c9.521 37.799 65.81 66.358 108.095 106.956 42.286 40.598 70.85 93.516 106.416 100.796 35.565 7.279 78.691-31.079 124.057-71.677 45.647-40.599 94.094-83.717 98.574-131.035 4.481-47.318-35.005-99.116-80.651-119.555-45.647-20.16-97.454-8.96-147.021-6.72-49.847 1.96-97.174-4.76-139.46 15.4z"/>
                                    </Shape>
                                :
                                    <Shape fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 469 452">
                                        <path d="M85.804 30.59C44.94 60.24 21.317 112.816 8.548 169.06c-12.45 55.938-14.047 115.851 14.046 156.506 27.774 40.655 85.556 62.358 145.254 86.506 59.698 24.149 121.311 51.048 166.004 35.153 44.694-16.201 72.787-75.502 97.687-129.912 24.582-54.411 46.29-104.236 33.84-144.279-12.451-39.738-59.06-69.695-101.838-99.04-42.778-29.344-81.725-58.078-130.249-69.082C184.768-6.092 126.666.939 85.804 30.59z"/>
                                    </Shape>
                                }
                            </Background>
                        </Grid>
                    )
                })}
            </Container>
        </Section>
    )
}

export default FeaturesComponent

// Styled Components
const Section = styled.section`
    @media (min-width:992px) {
        padding-bottom:7.125rem;
    }
`
const Title = styled.h2`
    padding-top:3rem;
    padding-bottom:3rem;
    text-align:center;
    @media (min-width:992px) {
        padding-top:6rem;
        padding-bottom:6rem;
    }
`
const Grid = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    padding-top:0;
    padding-bottom:3.75rem;
    grid-row-gap:2.5rem;
    @media (min-width:992px) {
        padding-top:5.625rem;
        padding-bottom:4.875rem;
        justify-content:space-between;
        align-items:center;
        &:nth-child(odd) {
            grid-template-columns:minmax(0,34.875rem) minmax(0,28.75rem);
        }
        &:nth-child(even) {
            grid-template-columns:minmax(0,28.75rem) minmax(0,34.875rem);
        }
    }
`
const Background = styled.div`
    position:relative;
    @media (min-width:992px) {
        ${Grid}:nth-child(odd) & {
            grid-column-start: 1;
            grid-row-start: 1;
        }
    }
`
const Image = styled(GatsbyImage)`
    margin:0 auto;
    width:calc(100% - 1.5rem);
    border-radius:0.5rem;
    @media (min-width:992px) {
        width:100%;
        height:100%;
    }
`
const GifImage = styled.img`
    margin:0 auto;
    width:calc(100% - 1.5rem);
    border-radius:0.5rem;
    object-fit:contain;
    @media (min-width:992px) {
        width:100%;
        height:100%;
    }
`
const Shape = styled.svg`
    z-index:-1;
    position:absolute;

    @media (min-width:992px) {
        .feature__column--one & {
            fill:${props => props.theme.color.green[200]};
            width:27.5rem;
            top:-2.5rem;
            left:-4.375rem;
        }
        .feature__column--two & {
            fill:${props => props.theme.color.purple[200]};
            width:27.5rem;
            right:-5.25rem;
            bottom:-1.5rem;
        }
        .feature__column--three & {
            fill:${props => props.theme.color.orange[200]};
            width:27.5rem;
            left:-4.625rem;
            bottom:-4.375rem;
        }
        .feature__column--four & {
            width:29.375rem;
            fill:${props => props.theme.color.blue[200]};
            right: -3.5rem;
            bottom:-1.25rem;
        }
    }
`