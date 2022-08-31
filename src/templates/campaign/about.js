import React from 'react'
import styled from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'
import GatsbyImage from 'gatsby-image/withIEPolyfill'

// Components
import Container from '../../components/container'

// Utils
import parseContent from '../../utils/parseContent'

const AboutComponent = ({
    items,
}) => {
    return (
        items.map(({
            title,
            description,
            background,
            cta
        }, index) => {
            const idOdd = index % 2

            const sectionClass = idOdd ? `secondary` : `primary`
            return (
                <Section className={`feature__section--${sectionClass}`} key={index}>
                    <Container
                        sm={`
                            grid-row-gap:1.5rem;
                        `}
                        lg={`
                            grid-column-gap:7.25rem;
                            grid-template-columns:repeat(2,minmax(0,1fr));
                            align-items:center;
                        `}
                    >
                        <Header className={`feature__header--${sectionClass}`}>
                            <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                            <Content>
                                {parseContent(description)}
                                {cta.type === `internal` ? 
                                    <Button as={GatsbyLink} to={cta.linkInternal.uri} className={`button--icon button--arrow sm:text--lg`}>
                                        {cta.label}
                                        <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="currentColor"/>
                                        </svg>
                                    </Button>
                                : cta.type === `external` ? 
                                    <Button href={cta.linkExternal} target={cta.scopeExternal && `_blank`} className={`button--icon button--arrow sm:text--lg`}>
                                        {cta.label}
                                        <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="currentColor"/>
                                        </svg>
                                    </Button>
                                : null
                                }
                            </Content>
                        </Header>
                        {background.localFile.extension === `gif` || background.localFile.extension === `svg` ?
                            <ImageLocal src={background.localFile.publicURL} alt={background.altText || background.title}/>
                        :
                            <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title} objectFit={`contain`}/>
                        }
                    </Container>
                </Section>
            )
        })
    )
}

export default AboutComponent

// Styled Components
const Section = styled.section`
    padding-top:2.5rem;
    padding-bottom:2.5rem;
    @media (min-width:992px) {
        padding-top:7.5rem;
        padding-bottom:7.5rem;
    }
    &.feature__section--secondary {
        background-color:${props => props.theme.color.grey[50]};
    }
`
const ImageLocal = styled.img`
    width:100%;
`
const Image = styled(GatsbyImage)`
    height: 100%;
    z-index:1;
`
const Header = styled.header`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    @media (min-width:992px) {
        grid-row-gap:3rem;
        &.feature__header--secondary {
            grid-column:2/3;
            grid-row:1;
        }
    }
`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    max-width:30rem;
`
const Button = styled.a`
    justify-self: start;
`