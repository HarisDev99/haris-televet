import React from 'react'
import styled from 'styled-components'

// Assets
import PlayStoreIcon from '../../images/store/play-store.svg'
import AppStoreIcon from '../../images/store/app-store.svg'

const LogosComponent = ({
    appStore,
    playStore
}) => {

    return (
        <List>
            <Link href={appStore}>
                <img src={AppStoreIcon} loading={`lazy`} alt={`Download on Apple App Store`}/>
            </Link>
            <Link href={playStore}>
                <img src={PlayStoreIcon} loading={`lazy`} alt={`Download on Google Play Store`}/>
            </Link>
        </List>
    )
}

export default LogosComponent

// Styled Components
const List = styled.div`
    display:grid;
    grid-template-columns:repeat(2,minmax(0,max-content));
    grid-column-gap:1rem;
`
const Link = styled.a`
    display: flex;
    border: 1px solid #A6A6A6;
    border-radius: 0.4375rem;
    overflow: hidden;
    background-color: #000;
`