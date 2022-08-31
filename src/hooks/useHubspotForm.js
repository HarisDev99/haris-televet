import { useStaticQuery, graphql } from 'gatsby'

const HubspotFormsHook = ({
    id
}) => {
    const { allHubspotForm } = useStaticQuery(graphql`
        query hubspotFormQuery {
            allHubspotForm {
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

export default HubspotFormsHook