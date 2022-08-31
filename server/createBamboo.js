const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async ({
    createNode,
    createNodeId,
    createContentDigest
}) => {
    try {
        const url = `https://televet.bamboohr.com/jobs/embed2.php`

        const response = await axios.get(url)

        if (!response) throw new Error(`No response from bamboo server`)

        const dom = response.data

        const careerNodes = createContentNode(dom)

        if (!careerNodes) return

        careerNodes.forEach((node, index) => {
            const date = new Date().getTime()

            const id = createNodeId(`bamboo-careers-${date}-${index}`)
    
            createNode({
                ...node,
                id,
                internal: {
                    type: `BambooCareer`,
                    contentDigest: createContentDigest(`${JSON.stringify(node)}-${date}`),
                },
            })
        })
    } catch (e) {
        console.log(e)
    }
}

const createContentNode = (dom) => {
    const $ = cheerio.load(dom)

    const domNodes = {
        departmentWrapper: `.BambooHR-ATS-Department-Item`,
        departmentHeader: `.BambooHR-ATS-Department-Header`,
        jobWrapper: `.BambooHR-ATS-Jobs-Item`,
        jobLocation: `.BambooHR-ATS-Location`,
    }

    const items = []

    $(domNodes.jobWrapper).each(function() {
        const linkNode = $(this).find(`a`)
        const title = linkNode.text().trim()

        const locationNode = $(this).find(domNodes.jobLocation)
        const location = locationNode.text().split(`, `)

        const departmentNode = $(this).closest(domNodes.departmentWrapper).find(domNodes.departmentHeader)
        const department = departmentNode.text().trim()

        items.push({
            careerContent: {
                title,
                location: {
                    city: location[0],
                    state: location[1]
                },
                type: [ department ],
                link: linkNode.attr(`href`)
            }
        })
    })

    return items.length > 0 ? items : false
}