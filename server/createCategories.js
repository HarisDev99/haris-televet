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
        posts
    }) => {
        paginate({
            createPage,
            items: posts.nodes,
            itemsPerPage: 6,
            pathPrefix: ({ pageNumber }) => {
                return pageNumber === 0 ? `/blog/category/${slug}` : `/blog/category/${slug}/page`
            },
            component: path.resolve(`src/templates/category/index.js`),
            context: {
                id
            }
        })
    })
}