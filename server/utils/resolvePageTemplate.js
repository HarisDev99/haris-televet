module.exports = ({
    node,
    templateList = [
        `home`,
        `about`,
        `careers`,
        `features`,
        `pricing`,
        `register`,
        `terms`,
        `vet-referral`,
        `thanks`,
        `hills`,
        `covid`,
        `virtual-vet`,
        `chat`,
        `faq`,
        `innovation`
    ]
}) => {
    const {
        template,
    } = node

    if (!template) return

    let targetField = template.templateName

    if (!targetField) return

    targetField = targetField.toLowerCase()

    targetField = targetField.split('template')[0]

    targetField = targetField.trim()

    targetField = targetField.replace(' ', '-')

    const payload = templateList.find((template) => targetField.includes(template))

    console.log(payload)
}