require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

const axios = require('axios')

module.exports = async ({
    createNode,
    createNodeId,
    createContentDigest
}) => {
    try {
        const fetchForms = await axios.get(`https://api.hubapi.com/forms/v2/forms?hapikey=${process.env.GATSBY_HUBSPOT_API}`)

        const response = await fetchForms.data

        if (response && response.length > 0) {
            response.forEach((form, index) => {

                const date = new Date().getTime()

                const id = createNodeId(`hubspot-forms-${date}-${index}`)

                let fields = form.formFieldGroups.filter(({
                    fields,
                    richText
                }) => {
                    const isContentField = richText && richText.content

                    return fields.length > 0 || isContentField
                })

                fields = fields.map(({
                    fields,
                    richText
                }) => {
                    const isContentField = richText && richText.content

                    return {
                        type: isContentField ? `text` : `input`,
                        fields: fields[0],
                        richText,
                    }
                })

                const options = {
                    id,
                    name: form.name,
                    redirect: form.redirect,
                    guid: form.guid,
                    formFields: fields,
                    submitText: form.submitText
                }

                createNode({
                    ...options,
                    internal: {
                        type: `HubspotForm`,
                        contentDigest: createContentDigest(`${JSON.stringify(options)}-${date}`),
                    }
                })
            })
        }
    } catch (e) {
        console.log(e)
    }
}