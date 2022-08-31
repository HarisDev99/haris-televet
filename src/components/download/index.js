import React from 'react'
import styled from 'styled-components'

// Hooks
import useDownloads from '../../hooks/useDownloads'

// Components
import Logos from './logos'

export default () => {
    const {
        pets,
        vets
    } = useDownloads()

    const items = [
        {
            title: `For veterinarians`,
            appStore: vets.app_store,
            playStore: vets.play_store
        }, {
            title: `For pet owners`,
            appStore: pets.app_store,
            playStore: pets.play_store
        }
    ]
    return (
        <Wrapper>
            <h2 className={`sm:text--lg`}>{`Download the app`}</h2>
            {items.map(({
                title,
                appStore,
                playStore
            }, index) => (
                <InnerWrapper key={index}>
                    <p className={`sm:text--base`}>{title}</p>
                    <Logos
                        appStore={appStore}
                        playStore={playStore}
                    />
                </InnerWrapper>
            ))}
        </Wrapper>
    )
}

// Styled Components
const Wrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:1rem;
    justify-items:start;
    @media (min-width:1200px) {
        grid-template-columns:repeat(3,minmax(0,max-content));
        justify-content:space-between;
        align-items:center;
    }
`
const InnerWrapper = styled.div`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.3125rem;
    @media (min-width:1200px) {
        grid-template-columns:repeat(2,minmax(0,max-content));
        align-items:center;
        grid-column-gap:1.25rem;
    }
`