import React from 'react'
import styled from 'styled-components'
import GatsbyImage from 'gatsby-image'
import { Link as GatsbyLink } from 'gatsby'

// Hooks
import useDownloads from '../../hooks/useDownloads'

// Layout Components
import Container from '../../components/container'

// Components
import AppStore from '../../components/download/logos'

// Utils
import parseContent from '../../utils/parseContent'

const AppDownloadComponent = ({
    title,
    background,
    rows
}) => {
    const {
        pets
    } = useDownloads()
    
    return (
        <Section id={`owners`}>
            <Container
                sm={`
                    grid-row-gap:4.75rem;
                `}
                lg={`
                    grid-template-columns:minmax(0,1.125fr) minmax(0,1fr);
                    grid-column-gap:6.6875rem;
                    align-items: center;
                `}
            >
                <Background>
                    <Image fluid={background.localFile.childImageSharp.fluid} alt={background.altText || background.title}/>
                    <Shape viewBox="0 0 439 335" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M367.48 20.5187C410.046 40.9578 447.012 88.2759 437.49 126.354C427.969 164.153 371.681 192.712 329.395 233.31C287.109 273.908 258.545 326.826 222.979 334.106C187.414 341.385 144.288 303.027 98.9217 262.429C53.2752 221.83 4.82828 178.712 0.347643 131.394C-4.133 84.0761 35.3526 32.2782 80.9992 11.8391C126.646 -8.32012 178.453 2.87942 228.02 5.11932C277.867 7.07924 325.194 0.359522 367.48 20.5187Z"/>
                    </Shape>
                </Background>
                <Content>
                    <h2 className={`sm:text--2xl lg:text--4xl`}>{title}</h2>
                    {rows.map(({
                        title,
                        description,
                        appDownloadCta,
                    }, index) => (
                        <Row key={index}>
                            <h3 className={`sm:text--xl`}>{title}</h3>
                            <Description>
                                {parseContent(description)}
                            </Description>
                            {!appDownloadCta.type ? null
                            : appDownloadCta.type === `internal` ?
                                appDownloadCta.button && appDownloadCta.button === `arrow` ?
                                    <GatsbyLink to={appDownloadCta.linkInternal.uri} className={`button--icon button--arrow sm:text--lg`}>
                                        {appDownloadCta.label}
                                        <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                                        </svg>
                                    </GatsbyLink>
                                :
                                    <GatsbyLink to={appDownloadCta.linkInternal.uri} className={`button button--secondary sm:text--lg`}>{appDownloadCta.label}</GatsbyLink>
                            : appDownloadCta.type === `external` ?
                                    appDownloadCta.button && appDownloadCta.button === `arrow` ?
                                    <a href={appDownloadCta.linkExternal} target={appDownloadCta.scopeExternal && `_blank`} className={`button--icon button--arrow sm:text--lg`}>
                                        {appDownloadCta.label}
                                        <svg className={`button--arrow__icon`} fill="none" xmlns="http://www.w3.org/2000/svg" height="18" width="12" viewBox="0 0 18 12">
                                            <path d="M12.038.343l-1.411 1.418 3.27 3.255-13.605.013.002 2 13.568-.013-3.215 3.23 1.417 1.41 5.644-5.67-5.67-5.643z" fill="#39ADC3"/>
                                        </svg>
                                    </a>
                                :
                                    <a href={appDownloadCta.linkExternal} className={`button button--secondary sm:text--lg`} target={appDownloadCta.scopeExternal && `_blank`}>{appDownloadCta.label}</a>
                            :
                                <AppStore
                                    appStore={pets.app_store}
                                    playStore={pets.play_store}
                                />
                            }
                        </Row>
                    ))}
                </Content>
            </Container>
        </Section>
    )
}

export default AppDownloadComponent

// Styled Components
const Section = styled.section`
    padding-bottom:3.75rem;
    padding-top:2.5rem;
    @media (min-width:992px) {
        padding-top:5rem;
        padding-bottom:9rem;
    }
`
const Row = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1.5rem;
    justify-items: center;
    @media (min-width:992px) {
        justify-items: start;
    }
`
const Description = styled.div`

`
const Content = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:2.5rem;
    text-align:center;
    justify-items:center;
    @media (min-width:992px) {
        justify-items:start;
        text-align:left;
    }
`
const Background = styled.div`
    position:relative;
`
const Image = styled(GatsbyImage)`
    width:calc(100% - 1.5rem);
    margin:0 auto;
    box-shadow: 0px 8px 32px rgba(103, 117, 139, 0.15);
    @media (min-width:992px) {
        height:100%;
        min-height:31rem;
        border-top-right-radius:2rem;
    }
`
const Shape = styled.svg`
    fill:${props => props.theme.color.green[200]};
    z-index:-1;
    position:absolute;
    max-width:14.5rem;
    left:-1.25rem;
    bottom:-2.25rem;
    @media (min-width:992px) {
        max-width:27.5rem;
        left:-5rem;
        bottom:-4.375rem;
    }
`