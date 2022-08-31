const fs = require('fs')
const path = require('path')

module.exports = async ({
    getNodesByType,
    data = {
        "redirects": [
            {
                "source": "/owners",
                "destination": "https://televet.drift.click/owners",
                "permanent": false
            }, {
                "source": "/Hills-Partnership",
                "destination": "/hills-partnership",
                "permanent": true
            }, {
                "source": "/community",
                "destination": "https://join.slack.com/t/televetcommunity/shared_invite/zt-cvxv1hhy-SWk0GFN1ExEi8_NvT~kDVg",
                "permanent": true
            }, {
                "source": "/fax",
                "destination": "/virtual-vet?fax",
                "permanent": false
            }
        ],
        "headers": [
            {
                "source": "/(.*)",
                "headers": [
                    {
                        "key": "X-Frame-Options",
                        "value": ""
                    }, {
                        "key": "Feature-Policy",
                        "value": "geolocation 'none'; camera 'none'; microphone 'none'"
                    }, {
                        "key": "Referrer-Policy",
                        "value": "same-origin"
                    }, {
                        "key": "X-Content-Type-Options",
                        "value": "nosniff"
                    }, {
                        "key": "X-XSS-Protection",
                        "value": "1"
                    }
                ]
            }
        ]
    }
}) => {
    try {
        const targetNodes = getNodesByType(`WpLayoutComponent`)

        const redirectNode = targetNodes.find((({ slug }) => slug === `redirects`))

        if (!redirectNode) return

        const {
            redirectSections
        } = redirectNode

        if (!redirectSections) return

        const {
            redirectItems
        } = redirectSections

        if (!redirectItems || redirectItems.length === 0) return

        const redirectList = removeDuplicates([
            ...data.redirects,
            ...redirectItems.map(({
                destination,
                source,
                permanent,
            }) => {
                return {
                    source,
                    destination,
                    permanent: permanent ? permanent : false
                }
            })
        ])

        data.redirects = redirectList

        const fileName = `./now.json`

        fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
            if (err) throw new Error(err)

            console.log('writing to ' + fileName)
        })
    } catch (e) {
        console.log(e)
    }
}


const removeDuplicates = (arr) => {
    const result = []
    const duplicatesIndices = []

    // Loop through each item in the original array
    arr.forEach((current, index) => {
    
        if (duplicatesIndices.includes(index)) return
    
        result.push(current)
    
        // Loop through each other item on array after the current one
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
    
            const comparison = arr[comparisonIndex]
            const currentKeys = Object.keys(current)
            const comparisonKeys = Object.keys(comparison)
            
            // Check number of keys in objects
            if (currentKeys.length !== comparisonKeys.length) continue
            
            // Check key names
            const currentKeysString = currentKeys.sort().join("").toLowerCase()
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase()
            if (currentKeysString !== comparisonKeysString) continue
            
            // Check values
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i]

                if ( current[key] !== comparison[key] ) {
                    valuesEqual = false
                    break
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex)
            
        } // end for loop

    }) // end arr.forEach()
  
    return result
}