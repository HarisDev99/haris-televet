import Observer from "fontfaceobserver"

import "./fonts.css"

const FontsComponent = () => {
    const fontA = new Observer("Linear Sans", {
        weight: 400,
    })

    const fontB = new Observer("Linear Sans", {
        weight: 600,
    })

    Promise.all([fontA.load(), fontB.load()]).then(() => {
        document.documentElement.classList.add("font-ready")
    })
}

export default FontsComponent