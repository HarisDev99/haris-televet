const path = require(`path`)

module.exports = ({
    items,
    createPage,
    paginate
}) => {
    // Single Posts
    items.forEach(({
        slug,
        id,
        uri,
        resources
    }) => {
        paginate({
            createPage,
            items: resources.nodes,
            itemsPerPage: 6,
            pathPrefix: ({ pageNumber }) => {
                return pageNumber === 0 ? `/resources/category/${slug}` : `/resources/category/${slug}/page`
            },
            component: path.resolve(`src/templates/resource-category/index.js`),
            context: {
                id
            }
        })
    })
}