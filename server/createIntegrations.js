const path = require(`path`)

module.exports = ({
    items,
    createPage
}) => {
    // Single Posts
    items.forEach(({
        id,
        slug
    }) => {
        const options = {
            path: `/integrations/${slug}`,
            component: path.resolve(`src/templates/integration-post/index.js`),
            context: {
                id
            }
        }

        createPage(options)
    })
}