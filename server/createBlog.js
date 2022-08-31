const path = require(`path`)

module.exports = ({
    items,
    paginate,
    featured,
    createPage
}) => {
    const featuredId = featured ? featured.id : items[0].id

    paginate({
        createPage,
        items: items.filter(({ id }) => id !== featuredId),
        itemsPerPage: 6,
        itemsPerFirstPage: 7,
        pathPrefix: ({ pageNumber }) => {
            return pageNumber === 0 ? '/blog' : '/blog/page'
        },
        component: path.resolve(`src/templates/blog/index.js`),
        context: {
            featured: featuredId
        }
    })
}