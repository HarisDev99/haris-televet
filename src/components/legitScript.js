import React from 'react'
import styled from 'styled-components'

const LegitScriptComponent = () => {
    return (
        <Button href="http://legitscript.com/pharmacy/televet.com" target="_blank" title="Verify LegitScript Approval">
            <Image src="https://static.legitscript.com/seals/7340508.png" alt="LegitScript approved" width="140" height="100" border="0" />
        </Button>
    )
}

export default LegitScriptComponent

// Styled Components
const Button = styled.a`
    display:block;
    margin:0 auto;
    width:8.75rem;
    @media (min-width:992px) {
        margin-bottom:5rem;
    }
`
const Image = styled.img`

`