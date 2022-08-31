export default (url) => {
    const pathComponents = url.match(/([^\/]+)/g)

    const slug = pathComponents[pathComponents.length - 1]

    return slug
}