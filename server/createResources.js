const path = require(`path`)

module.exports = ({
    items,
    paginate,
    featured,
    createPage
}) => {
    const featuredItems = featured ? featured : items.filter((_, index) => index < 3).map(({ id }) => id)

    paginate({
        createPage,
        items: items.filter(({ id }) => !featuredItems.includes(id)),
        itemsPerPage: 6,
        itemsPerFirstPage: 0,
        pathPrefix: ({ pageNumber }) => {
            return pageNumber === 0 ? '/resources' : '/resources/page'
        },
        component: path.resolve(`src/templates/resources/index.js`),
        context: {
            featuredList: featuredItems
        }
    })
}