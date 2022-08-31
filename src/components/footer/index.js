import React from 'react'
import styled from 'styled-components'

// Components
import Top from './top/index'
import Bottom from './bottom/index'

// Hooks
import useFooter from '../../hooks/useFooter'

const FooterComponent = () => {
    const {
        columns,
        social: {
            twitter,
            facebook,
            linkedin
        },
        legal: {
            terms,
            privacy,
            notice
        },
    } = useFooter()
    
    return (
        <Footer>
            <Top
                columns={columns}
            />
            <Bottom
                twitter={twitter}
                facebook={facebook}
                linkedin={linkedin}
                privacy={privacy.link}
                terms={terms.link}
                notice={notice}
            />
        </Footer>
    )
}

export default FooterComponent

// Styled Components
const Footer = styled.footer`
    background-color:${props => props.theme.color.teal[50]};
    border-top:1px solid ${props => props.theme.color.grey[200]};
`