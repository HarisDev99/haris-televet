const handleGroups = ({
    posts,
    resources,
    categories,
    blogToggle,
    blog,
    blogSettings,
    navItems,
}) => {
    let categoryGroups = resources.group.map((groupNode) => {
        const targetCategory = categories.nodes.find(({ id }) => groupNode.fieldValue === id)

        return {
            posts: groupNode.nodes,
            category: targetCategory,
        }
    }).filter(({
        category
    }) => category.slug !== `uncategorized`)

    if ( blogToggle ) {
        const blogGroup = {
            posts: posts.nodes,
            category: {
                id: blog.id,
                name: blog.name,
                uri: blog.uri,
                slug: blog.slug,
                resourceCategorySettings: {
                    resourceCategoryGridCta: blogSettings.resourcesBlogGridCta.title ? blogSettings.resourcesBlogGridCta.title : "Want to see more Blog articles?",
                    resourceCategoryGridCtaLabel: blogSettings.resourcesBlogGridCta.label ? blogSettings.resourcesBlogGridCta.label : "View All Blog Articles",
                    resourceCategoryCtaLabel: blogSettings.resourcesBlogCtaLabel ? blogSettings.resourcesBlogCtaLabel : "Discover More"
                }
            },
        }

        categoryGroups = [
            ...categoryGroups,
            blogGroup
        ]
    }

    categoryGroups = categoryGroups.map((group) => {
        let newGroup = group

        let navIndex = navItems.findIndex((item) => {
            const targetId = item.type === `category` ? item.category.id : item.linkInternal.id

            return group.category.id === targetId
        })

        if ( navIndex === -1 ) navIndex = categoryGroups.length - 1

        newGroup.navIndex = navIndex

        return newGroup
    }).sort((a, b) => {
        if ( a.navIndex < b.navIndex ) {
            return -1
        }

        if ( a.navIndex > b.navIndex ) {
            return 1
        }

        return 0
    })

    return categoryGroups
}

export default handleGroups