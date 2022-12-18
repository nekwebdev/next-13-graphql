// 3rd party modules
import { graphql } from '@lib/gql'
// Core utilities
import graphqlClient from '@core/graphqlClient'
import getStrapiMedia from '@core/getStrapiMedia'

const GetNavigationQueryDocument = graphql(`
  query GetNavigationQuery {
    navigation {
      data {
        attributes {
          callToAction
          callToActionLong
          callToActionLogo {
            ... on UploadFileEntityResponse {
              data {
                ... on UploadFileEntity {
                  id
                  attributes {
                    name
                    alternativeText
                    caption
                    width
                    height
                    url
                  }
                }
              }
            }
          }
          logo {
            ... on UploadFileEntityResponse {
              data {
                ... on UploadFileEntity {
                  id
                  attributes {
                    name
                    alternativeText
                    caption
                    width
                    height
                    url
                  }
                }
              }
            }
          }
          links {
            ... on ComponentMenuDropdown {
              id
              label
              image {
                ... on UploadFileEntityResponse {
                  data {
                    ... on UploadFileEntity {
                      id
                      attributes {
                        name
                        alternativeText
                        caption
                        width
                        height
                        url
                      }
                    }
                  }
                }
              }
              sections {
                ... on SectionRelationResponseCollection {
                  data {
                    id
                    attributes {
                      label
                      links {
                        ... on ComponentMenuLink {
                          id
                          label
                          style
                          url
                          image {
                            ... on UploadFileEntityResponse {
                              data {
                                ... on UploadFileEntity {
                                  id
                                  attributes {
                                    name
                                    alternativeText
                                    caption
                                    width
                                    height
                                    url
                                  }
                                }
                              }
                            }
                          }
                          page {
                            ... on PageEntityResponse {
                              data {
                                attributes {
                                  slug
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            ... on ComponentMenuLink {
              id
              label
              style
              url
              image {
                ... on UploadFileEntityResponse {
                  data {
                    ... on UploadFileEntity {
                      id
                      attributes {
                        name
                        alternativeText
                        caption
                        width
                        height
                        url
                      }
                    }
                  }
                }
              }
              page {
                ... on PageEntityResponse {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`)

const getNavigationData = async () => {
  const { navigation } = await graphqlClient.request(GetNavigationQueryDocument)
  // get all the correct url paths for client components images
  const fixedCallToActionLogo = getStrapiMedia(
    navigation?.data?.attributes?.callToActionLogo.data?.attributes?.url ?? ''
  )
  navigation?.data?.attributes?.callToActionLogo?.data?.attributes?.url
    ? (navigation.data.attributes.callToActionLogo.data.attributes.url = fixedCallToActionLogo)
    : null
  return navigation?.data?.attributes
}

export default getNavigationData
