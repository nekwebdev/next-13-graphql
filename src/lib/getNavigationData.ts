// 3rd party modules
import { graphql } from '@lib/gql'
// Core utilities
import graphqlClient from '@core/graphqlClient'

const GetNavigationQueryDocument = graphql(`
  query GetNavigationQuery {
    navigation {
      data {
        attributes {
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
  return navigation?.data?.attributes
}

export default getNavigationData
