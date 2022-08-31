const path = require(`path`)

module.exports = ({
    items,
    createPage
}) => {

    // Single Posts
    items.forEach(({
        id,
        slug,
        categories
    }) => {
        const categoryList = categories.nodes.map(({
            id
        }) => id)

        const options = {
            path: `/blog/${slug}`,
            component: path.resolve(`src/templates/post/index.js`),
            context: {
                id,
                categories: categoryList
            }
        }

        createPage(options)
    })
}