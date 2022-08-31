// import { graphql, useStaticQuery } from 'gatsby'

// export default () => {
//     const { component } = useStaticQuery(graphql`
//         query useThanks {
//             component: wordpressWpComponent(slug: {eq: "thank"}) {
//                 acf {
//                     intro_title
//                     intro_subtitle
//                     intro_description
//                     intro_cta {
//                         label
//                         link {
//                             slug: post_name 
//                         }
//                     }
//                     about_title
//                     about_description
//                 }
//             }
//         }
//     `)

//     return component.acf
// }