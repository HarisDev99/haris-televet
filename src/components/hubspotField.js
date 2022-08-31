import React from 'react'
import styled from 'styled-components'

const HubspotFieldComponent = () => {
    return (
        <Wrapper>
            <label htmlFor="cc-num">{`credit card HubspotCollectedFormsWorkaround https://community.hubspot.com/t5/APIs-Integrations/How-to-stop-collected-forms-from-collecting-a-form/m-p/299172#M28102`}</label>
            <input name="cc-num" required="" id="cc-num"></input>
        </Wrapper>
    )
}

export default HubspotFieldComponent

// Styled Components
const Wrapper = styled.div`
    display:none;
`