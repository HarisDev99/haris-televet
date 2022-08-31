// import { graphql, useStaticQuery } from 'gatsby'

// export default () => {
//     const { careers } = useStaticQuery(graphql`
//         query useCareers {
//             careers: allWordpressWpCareer {
//                 nodes {
//                     acf {
//                         title
//                         type
//                         location {
//                             city
//                             state
//                         }
//                         link
//                     }
//                 }
//             }
//         }
//     `)

//     // If Length 
//     if (careers.nodes.length === 1) {
//         const targetNode = careers.nodes[0]

//         if (targetNode.acf.title === ``) {
//             return false
//         }
//     }
    
//     return careers.nodes
// }