import { createGlobalStyle } from 'styled-components'

const font = `
    :text--xs {
        font-size:0.75rem;
        line-height:1.625;
        letter-spacing: 0.005em;
    }
    :text--sm {
        font-size:0.875rem;
        line-height:1.625;
        letter-spacing: 0.005em;
    }
    :text--base {
        font-size:1rem;
        line-height:1.625;
        letter-spacing: 0.005em;
    }
    :text--lg {
        font-size:1.125rem;
        line-height:1.625;
        letter-spacing: 0.005em;
    }
    :text--xl {
        font-size:1.25rem;
        line-height:1.625;
        letter-spacing: 0.005em;
    }
    :text--2xl {
        font-size:1.5rem;
        line-height:1.5;
        letter-spacing: 0.005em; 
    }
    :text--3xl {
        font-size:1.875rem;
        line-height:1.5;
        letter-spacing: 0.005em;
    }
    :text--4xl {
        font-size:2.25rem;
        line-height:1.375;
    }
    :text--5xl {
        font-size:3rem;
        line-height:1.3;
    }
    :text--6xl {
        font-size:3.5rem;
        line-height:1.3;
    }
`

const visibility = `
    :d-none {
        display:none;
    }
    :d-block {
        display:block;
    }
    :d-flex {
        display:flex;
    }
    :d-grid {
        display:grid;
    }
`

export default createGlobalStyle`
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, code,
del, dfn, em, img, q, dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td, figure, input, button {
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: inherit;
  font-style: inherit;
  font-size: 100%;
  font-family: inherit;
}
html {
    box-sizing: border-box;
}
* {
    box-sizing: inherit;
}
*:before {
    box-sizing: inherit;
}
*:after {
    box-sizing: inherit;
}
em {
	font-style: italic;
}
strong {
	font-weight: bold;
}
html,
body {
	margin:0;
	padding:0;
	height:100%;
}
body {
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    color:${props => props.theme.color.primary.dark};
    font-size: 16px;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-feature-settings: 'kern' 1, 'dlig' 1, 'opbd' 1, 'ss01' 1;
    text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
    .font-ready & {
        font-family: Linear Sans;
    }
}
p {
    .font-ready & {
        font-family: Linear Sans;
    }
}
*, :after, :before {
    box-sizing: border-box;
}
ul {
    list-style:none;
    margin:0;
    padding:0;
}
img {
    max-width:100%;
}
svg {
    display: inline-block;
}
a img {
	border: none;
	outline: none;
}
a {
    color: inherit;
	outline: none;
    text-decoration: none;
    line-height: inherit;
}
a,
a:active,
a:visited,
a img {
	outline: none;
}
button {
    outline:0;
    border:none;
    -webkit-appearance:none;
}
input {
    color:${props => props.theme.color.primary.dark};
}
h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-weight:600;
}
.relative {
    position:relative;
}
.button--underline {
    font-weight:bold;
    text-decoration:underline;
    background-color:transparent;
    cursor:pointer;
    transition: color .15s;
    color: ${props => props.theme.color.primary.dark};
    &:hover {
        color: ${props => props.theme.color.purple[500]};
    }
    &.teal {
        color: ${props => props.theme.color.teal[500]};
        &:hover {
            color: ${props => props.theme.color.primary.dark};
        }
    }
}
.button {
    transition: all .15s;
    background-image: linear-gradient(to right, ${props => props.theme.color.primary.dark} 50%, ${props => props.theme.color.purple[500]} 0);
    background-size: 200% 100%;
    background-position: 100% 0;
    background-repeat: no-repeat;
    color:#fff;
    font-weight:600;
    width:max-content;
    max-width: 100%;
    &:hover {
        background-position: 0 0;
    }
}
.button--alt {
    transition: all .15s;
    background-image: linear-gradient(to right, ${props => props.theme.color.purple[500]} 50%, transparent 0);
    background-size: 200% 100%;
    background-position: 100% 0;
    background-repeat: no-repeat;
    color:${props => props.theme.color.purple[500]};
    border:2px solid ${props => props.theme.color.purple[500]};
    font-weight:600;
    width:max-content;
    max-width: 100%;
    &:hover {
        color:#fff;
        background-position: 0 0;
    }
}
.button--primary {
    border-radius:2.25rem;
    box-shadow: 0px 4px 16px rgba(103, 117, 139, 0.15);
    padding:0.75rem 1.5rem;
    width:100%;
    max-width:fit-content;
    @media (min-width:992px) {
        padding:1rem 2.7rem;
    }
}
.button--secondary {
    border-radius:2.75rem;
    padding:0.6875rem 2.25rem;
}
.button--xs {
    border-radius:2.75rem;
    padding:0.6875rem 1.25rem;
}
.button--icon {
    display: grid;
    grid-template-columns: repeat(2,minmax(0,max-content));
    grid-column-gap: 1rem;
    align-items: center;
    justify-content:center;
}
.button--arrow {
    color:${props => props.theme.color.teal[500]};
    font-weight:600;
    .button--arrow__icon {
        position:relative;
        left:0;
        transition: left .15s;
    }
    &:hover {
        .button--arrow__icon {
            left:0.35rem;
        }
    }
}
.link--color {
    color:${props => props.theme.color.primary.dark};
    transition: all .1s;
}
.link--color:hover {
    color:${props => props.theme.color.teal[500]};
}
.link--underline {
    display: inline-block;
}
.link--underline:hover {
    text-decoration: underline;
}
.sm\\ {
    ${font}
    ${visibility}
}
.md\\ {
    @media(min-width:768px) {
        ${font}
        ${visibility}
    }
}
.lg\\ {
    @media(min-width:992px) {
        ${font}
        ${visibility}
    }
}
.xl\\ {
    @media(min-width:1200px) {
        ${font}
        ${visibility}
    }
}
.2xl\\ {
    @media(min-width:1536px) {
        ${font}
        ${visibility}
    }
}
.ReactModal__Overlay {
    opacity: 0;
    transition: all 0.1s ease-in-out;
}
.ReactModal__Overlay--after-open {
    opacity: 1;
}
.ReactModal__Overlay--before-close {
    opacity: 0;
}
.ReactModal__Body--open {
    overflow: hidden;
}
.rc-pagination {
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
}
.rc-pagination-item {
    margin:0 0.25rem;
    border-radius:50%;
    outline:0;
}
.rc-pagination-prev, .rc-pagination-next {
    outline:0;
}
.rc-pagination-disabled {

}
.grecaptcha-badge {
    width: 70px !important;
    overflow: hidden !important;
    transition: all 0.3s ease !important;
    left: -2px !important;
    bottom: 20px !important;
}
    
.grecaptcha-badge:hover {
    width: 256px !important;
}
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}
`