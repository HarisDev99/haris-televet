import { useStaticQuery, graphql } from 'gatsby'

const MarketoFormsHook = ({
    id
}) => {
    const { allMarketoForm } = useStaticQuery(graphql`
        query marketoFormQuery {
            allMarketoForm {
                nodes {
                    name
                    guid
                    redirect
                    formFields {
                        type
                        fields {
                            label
                            name
                            required
                            fieldType
                            type
                            hidden
                            selectedOptions
                            options {
                                value
                                label
                            }
                        }
                        richText {
                            content
                        }
                    }
                    submitText
                }
            }
        }
    `)

    let payload = allHubspotForm.nodes.find(({ guid }) => guid === id)

    return payload
}

export default MarketoFormsHook