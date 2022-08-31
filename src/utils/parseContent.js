import React from 'react'
import styled from 'styled-components'
import parser, { domToReact } from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'
import ReactPlayer from 'react-player'
import HubspotForm from '../components/formBuilder/index'


const parseContentUtility = (content) => {
    if (typeof content !== `string`) {
        return content
    }

    const parserOptions = {
        replace: domNode => {
            const bodyElements = [
                `p`, `span`, `strong`,
                `div`, `section`, `h1`, `h2`, `h3`,
                `h4`, `h5`, `h6`, `ul`, `ol`, `li`
            ]

            const hasParent = domNode.parent
            const hasChildren = domNode.children && domNode.children.length > 0
            const hasData = domNode.data
            const bodyNode = domNode.name && bodyElements.includes(domNode.name)

            // Remove empty elements
            if (!hasParent && !hasChildren && !hasData && bodyNode) {
                return <React.Fragment />
            }

            // Handle children of blockquote
            if (hasChildren && hasParent && domNode.parent.name && domNode.parent.name === `blockquote`) {
                return (
                    <React.Fragment>
                        {`“`}{domToReact(domNode.children, parserOptions)}{`”`}
                    </React.Fragment>
                )
            }
            switch (domNode.name) {
                case `span`:
                case `section`:
                case `div`:
                    if (hasParent && domNode.parent.attribs && domNode.parent.attribs.class && domNode.parent.attribs.class.includes(`gatsby-image-wrapper`)) {
                        if (domNode.attribs && domNode.attribs.style && domNode.attribs["aria-hidden"]) {
                            return (
                                <ImageSpacer aria-hidden="true" customStyle={domNode.attribs.style}>
                                </ImageSpacer>
                            )
                        }
                    }

                    // Gatsby Image
                    if (domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes(`gatsby-image-wrapper`)) {
                        return (
                            <InlineImage styles={domNode.attribs && domNode.attribs.style ? domNode.attribs.style : ``}>
                                {domToReact(domNode.children, parserOptions)}
                            </InlineImage>
                        )
                    }

                    if (domNode.name === `span` && domNode.attribs && domNode.attribs.style && domNode.attribs.style.includes('text-decoration:underline')) {
                        return (
                            <span style={{
                                textDecoration: 'underline'
                            }}>{domToReact(domNode.children, parserOptions)}</span>
                        )
                    }

                    return <React.Fragment>{domToReact(domNode.children, parserOptions)}</React.Fragment>
                case `h1`:
                case `h2`:
                    return <h2 className={`sm:text--3xl`}>{domToReact(domNode.children, parserOptions)}</h2>
                case `h3`:
                    return <h3 className={`sm:text--2xl`}>{domToReact(domNode.children, parserOptions)}</h3>
                case `h4`:
                    return <h4 className={`sm:text--xl`}>{domToReact(domNode.children, parserOptions)}</h4>
                case `h5`:
                    return <h5 className={`sm:text--xl`}>{domToReact(domNode.children, parserOptions)}</h5>
                case `h6`:
                    return <h6 className={`sm:text--xl`}>{domToReact(domNode.children, parserOptions)}</h6>
                case `p`:
                    return <p className={`sm:text--lg`}>{domToReact(domNode.children, parserOptions)}</p>
                case `ul`:
                case `ol`:
                    return <List className={`sm:text--base lg:text--lg`}>{domToReact(domNode.children, parserOptions)}</List>
                case `li`:
                    return <ListItem className={`sm:text--lg`}>{domToReact(domNode.children, parserOptions)}</ListItem>
                case `br`:
                    return <Br />
                case `blockquote`:
                    return <Blockquote className={`sm:text--xl lg:text--2xl`}>{domToReact(domNode.children, parserOptions)}</Blockquote>
                case `b`:
                case `strong`:
                    return <Strong>{domToReact(domNode.children, parserOptions)}</Strong>
                case `textarea`:
                    return <Textarea>{domToReact(domNode.children, parserOptions)}</Textarea>
                case `iframe`:
                    domNode.attribs = {
                        ...domNode.attribs,
                        style: 'max-width:100%;'
                    }
                    return domNode
                case `video`:
                    return (
                        <WrapperResponsive>
                            {domNode.attribs && domNode.attribs.src ?
                                <ReactPlayer
                                    className="video-responsive"
                                    url={domNode.attribs.src}
                                    controls={true}
                                    width={`100%`}
                                    height={`100%`}
                                />
                                : null
                            }
                        </WrapperResponsive>
                    );
                case `x-hubspot-form`:
                    if (!domNode.attribs) return null;
                    if (!domNode.attribs.id) return null;

                    return (
                        <div>
                            <HubspotForm
                                id={domNode.attribs.id}
                            />
                        </div>
                    )
                default:
                    if (domNode.type === `text` && domNode.parent && domNode.parent.name === `textarea`) {
                        if (domNode.parent.attribs && domNode.parent.attribs.class && domNode.parent.attribs.class.includes('inforgraphic-wrapper')) {
                            const replacePdf = (html) => {
                                const stringToHTML = (str) => {
                                    var parser = new DOMParser()

                                    var doc = parser.parseFromString(str, 'text/html')

                                    const wrapper = doc.querySelector('.infographic-image')
                                    const dataNode = doc.querySelector('.infographic-data')

                                    const img = wrapper.lastChild

                                    const alt = dataNode.dataset.alt
                                    const style = dataNode.dataset.style
                                    const src = img.src

                                    const newNode = doc.createElement('img')
                                    newNode.src = src
                                    newNode.alt = alt
                                    newNode.style = style

                                    const container = doc.querySelector('.infographic-container')
                                    container.removeAttribute("class")
                                    container.replaceChild(newNode, wrapper)

                                    dataNode.remove()

                                    return doc.body.innerHTML
                                }

                                return stringToHTML(html)
                            }

                            domNode.data = replacePdf(domNode.data)

                            return domNode
                        }
                    }

                    return domNode
            }
        }
    }

    return parser(
        sanitizeHtml(content, {
            allowedTags: [
                "textarea",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "blockquote",
                "p",
                "a",
                "ul",
                "ol",
                "nl",
                "li",
                "b",
                "i",
                "strong",
                "em",
                "strike",
                "code",
                "hr",
                "br",
                "div",
                "table",
                "thead",
                "caption",
                "tbody",
                "tr",
                "th",
                "td",
                "pre",
                "iframe",
                "img",
                "span",
                "center",
                "video",
                "x-hubspot-form"
            ],
            disallowedTagsMode: "discard",
            allowedAttributes: {
                a: ["*"],
                div: ["*"],
                img: ["*"],
                iframe: ["*"],
                video: ["*"],
                span: ["*"],
                textarea: ["class"],
                'x-hubspot-form': ["id"]
            },
            selfClosing: [
                "img",
                "br",
                "hr",
                "area",
                "base",
                "basefont",
                "input",
                "link",
                "meta",
            ],
            allowedSchemes: ["http", "https", "ftp", "mailto"],
            allowedSchemesByTag: {},
            allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
            allowProtocolRelative: true,
        }),
        parserOptions
    )
}

export default parseContentUtility

const Textarea = styled.textarea`
    width:100%;
    padding:0.75rem;
    border:2px solid  ${props => props.theme.color.grey[300]};
    outline:0;
    border-radius:0.25rem;
    min-height:150px;
    &:focus {
        border:2px solid ${props => props.theme.color.primary.dark};
    }
`
const Blockquote = styled.blockquote`
    font-weight:bold;
    border-left:4px solid ${props => props.theme.color.grey[200]};
    padding-left:2rem;
`
const List = styled.ul`
    display:grid;
    grid-template-columns:minmax(0,1fr);
    grid-row-gap:0.75rem;
`
const ListItem = styled.li`
    display:inline-block;
    & > * {
        display:inline;
    }
    &:before {
        display:inline-block;
        content: '';
        background-color:${props => props.theme.color.primary.dark};
        height: 6px;
        width: 6px;
        border-radius: 100%;
        position: relative;
        top: -3px;
        margin-right:0.75rem;
        .content__theme--white & {
            background-color:#fff;
        }
    }
    ul, ol {
        margin-top:1rem;
        margin-left:1rem;
        display:grid;
    }
`
const Br = styled.br`
    display:block;
    width: 100%;
    height: 1rem;
    position: relative;
    content: '';
`
const Strong = styled.strong`
    font-weight:bold;
`
const InlineImage = styled.div`
    ${props => props.styles && props.styles.charAt(props.styles.length - 1) === `;` ? props.styles : `${props.styles};`}
    margin: 0px auto;
`
const ImageSpacer = styled.div`
    ${props => props.customStyle ? props.customStyle : ``}
`
const WrapperResponsive = styled.div`
    position:relative;
    padding-top:56.25%;
    width:100%;
    overflow:hidden;
    > .video-responsive {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
`