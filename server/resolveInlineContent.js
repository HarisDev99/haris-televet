const cheerio = require('cheerio')
const { fluid } = require('gatsby-plugin-sharp')

module.exports = async({ node, getNode, getNodesByType }) => {
    try {
        // const targetFields = [
        //     node.acf,
        //     node.content
        // ]

        // const acfNode = node.acf
        // const contentNode = node.content

        // if (!acfNode || !contentNode) {
        //     return node
        // }

        // function find(obj, item) {
        //     for (var key in obj) {

        //         if (obj[key] && typeof obj[key] === "object") {
        //             var result = find(obj[key], item)

        //             if (result) {
        //                 result.unshift(key)
        //                 return result
        //             }

        //         } else if(typeof obj[key] === 'string' && obj[key].includes(item)) {
            
        //             return [key]
        //         }
        //     }
        // }

        // const objectPathArray = find(node, `<p`)

        // console.log(objectPathArray)

        for (i = 0; i > targetFields.length; i ++) {

            if (stringNode.includes("<img")) {

            }
        }

    } catch (e) {
        throw new Error(e)
    }
}

const transformNode = async ({ node, getNode, getNodesByType }) => {
  try {
    // Define content field in cheerio
    const $ = cheerio.load(field)
    const img = $(`img`)

    const imageList = []

    // Get all image nodes that are viable to convert
    img.each(function() {
      const src = $(this).attr("src")

      const sourceUrl = process.env.GATSBY_SOURCE_URL

      if (src && src.includes(sourceUrl)) {
        imageList.push($(this))
      }
    })

    // Setup function to replace image with gatsby image
    const replaceImage = async image => {
      // Fetch Image Nodes
      const imageNodes = getNodesByType(`wordpress__wp_media`)

      // Get the source URL from the input image
      const parsedUrlData = image.attr("src").match("^http://")
        ? image.attr("src").replace("http://", "https://")
        : image.attr("src")

      const url = parsedUrlData.split(/-\d+[Xx]\d+\./)[0]

      // Find Image Node by Url
      const fetchImageNodeByUrl = url => {
  
        let match = imageNodes.find(node => node.source_url === url)

        if (!match) {
          match = imageNodes.find(node => node.source_url.includes(url))
        }

        return match
      }

      const imageNode = fetchImageNodeByUrl(url)

      // If cannot find image node, shoot out error
      if (!imageNode) {
        console.log(parsedUrlData)

        console.log(`Could not find image node ${url}`)

        return image
      }

      const fileNode = getNode(imageNode.localFile___NODE)

      if (!fileNode) {
        console.log(`Could not find file node for ${url}`)

        return image
      }

      const fileType = fileNode.extension

      // If file type is unsupported, dont attempt to convert it
      if (fileType === `gif` || fileType === `svg`) {
        image.attr("class", "gatsby-inline-image-unsupported")
        image.attr("image-data", JSON.stringify(fileNode.id))
      } else {
        const maxWidth = image.attr("width") ? image.attr("width") : 820

        const fluidData = await fluid({
          file: fileNode,
          args: {
            maxWidth,
            quality: 100,
          },
        })

        image.attr("class", "gatsby-inline-image-fluid")
        image.attr("image-data", JSON.stringify(fluidData))
      }

      return image
    }

    // For each image, try to replace with gatsby image
    for (let i = 0; i < imageList.length; i++) {
      const parsedImage = await replaceImage(imageList[i])

      imageList[i] = parsedImage
    }

    node.content = $("body").html()

    return node
  } catch (e) {
    console.log(e)
  }
}
