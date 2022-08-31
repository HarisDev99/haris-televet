const { readdir, stat } = require('fs').promises
const { join, resolve } = require('path')

module.exports = async ({
    node,
}) => {
    try {
        const deferNodes = [ `blog`, 'resources' ]

        const templateFolders = await fetchTemplates(resolve(`src/templates/`))

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
        if (deferNodes.includes(targetField)) return

        const relatedTemplates = templateFolders.filter((template) => targetField.includes(template))

        if ( relatedTemplates.length === 0 ) {
            return
        } else if ( relatedTemplates.length > 1 ) {
            targetField = relatedTemplates.find((template) => targetField === template)
        } else {
            targetField = relatedTemplates[0]
        }

        if (!targetField) return

        node.localTemplate = targetField
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