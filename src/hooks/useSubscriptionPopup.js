import { graphql, useStaticQuery } from 'gatsby'

const SubscriptionPopupHook =  () => {
    const { component } = useStaticQuery(graphql`
        query useSubscriptionPopup {
            component: wpLayoutComponent(slug: {eq: "subscription-popup"}) {
                subscriptionPopupComponent {
                    subscriptionPopupTitle
                    subscriptionPopupDescription
                    subscriptionPopupHubspotFormId
                    subscriptionPopupConfirmationPage {
                        type
                        linkInternal {
                            ... on WpPage {
                                uri
                            }
                            ... on WpPost {
                                uri
                            }
                        }
                        linkExternal
                    }
                }
            }
        }
    `)

    return component.subscriptionPopupComponent
}

export default SubscriptionPopupHook