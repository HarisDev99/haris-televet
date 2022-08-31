const { readdir, stat } = require('fs').promises
const { join, resolve } = require('path')


module.exports = async ({
    getNodesByType,
    createNode,
    createNodeId,
    createContentDigest,
}) => {
    try {
        const deferNodes = [`blog`]

        const templateFolders = await fetchTemplates(resolve(`src/templates/`))

        const targetNodes = getNodesByType(`WpPage`)

        if (!targetNodes || targetNodes.length === 0) return

        let templateList = []

        targetNodes.forEach((node) => {
            const {
                template
            } = node

            // If template doesn't exist, return
            if (!template) return

            let targetField = template.templateName

            // If template name doesnt exist, return
            if (!targetField) return

            // Format template name
            targetField = parseTemplate(targetField)

            // If included in excluded nodes, return
            if ( deferNodes.includes(targetField) ) return

            const relatedTemplates = templateFolders.filter((template) => targetField.includes(template))

            if ( relatedTemplates.length === 0 ) {
                return
            } else if ( relatedTemplates.length > 1 ) {
                targetField = relatedTemplates.find((template) => targetField === template)
            } else {
                targetField === relatedTemplates[0]
            }

            if (!targetField) return

            // If template already exists, do nothing
            const targetIndex = templateList.findIndex(({ slug }) => slug && slug === targetField)

            if (targetIndex < 0) {
                return templateList.push({
                    slug: targetField,
                    children: [
                        node.id
                    ]
                })
            }

            const targetTemplate = templateList[targetIndex]

            targetTemplate.children = [
                ...targetTemplate.children,
                node.id
            ]
        })

        templateList.forEach((node, index) => {
            const date = new Date().getTime()

            const id = createNodeId(`wp-page-template-${date}-${index}`)

            createNode({
                ...node,
                id,
                internal: {
                    type: `WpPageTemplate`,
                    contentDigest: createContentDigest(`${JSON.stringify(node)}-${date}`),
                },
            })
        })
    } catch (e) {
        console.log(e)
    }
}

const parseTemplate = (input) => {
    let targetField = input

    targetField = targetField.toLowerCase()

    targetField = targetField.split('template')[0]

    targetField = targetField.trim()

    targetField = targetField.replace(' ', '-')

    return targetField
}

const fetchTemplates = async (path) => {
    let dirs = []

    for (const file of await readdir(path)) {
        if ((await stat(join(path, file))).isDirectory()) {
            dirs = [...dirs, file]
        }
    }

    return dirs
  }