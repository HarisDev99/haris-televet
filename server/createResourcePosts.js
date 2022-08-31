const path = require(`path`)

module.exports = ({
    items,
    createPage
}) => {
    // Single Posts
    items.forEach(({
        id,
        slug,
        resourceCategories
    }) => {
        const categories = resourceCategories.nodes.map(({ id }) => id)
        
        const options = {
            path: `/resources/${slug}`,
            component: path.resolve(`src/templates/resource-post/index.js`),
            context: {
                id,
                categories
            }
        }

        createPage(options)
    })
}