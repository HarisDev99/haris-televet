import React from "react"
import styled from "styled-components"

const IconComponent =  ({ invert }) => {
  return (
    <Svg
      invert={invert}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 13L1 7L7 1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconComponent

// Styled Components
const Svg = styled.svg`
  stroke: ${props => props.theme.color.grey[400]};
  &:hover {
    stroke: ${props => props.theme.color.grey[400]};
  }
  ${props =>
    props.invert
      ? `
        transform: rotate(180deg);
    `
      : ``}
`
