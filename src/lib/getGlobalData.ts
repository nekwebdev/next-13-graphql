// 3rd party modules
import { graphql } from '@lib/gql'
// Core utilities
import graphqlClient from '@core/graphqlClient'

const GetGlobalQueryDocument = graphql(`
  query GetGlobalQuery {
    global {
      data {
        attributes {
          siteName
          favicon {
            ... on UploadFileEntityResponse {
              data {
                ... on UploadFileEntity {
                  attributes {
                    url
                  }
                }
              }
            }
          }
          seo {
            ... on ComponentSharedSeo {
              metaTitle
              metaDescription
              shareImage {
                ... on UploadFileEntityResponse {
                  data {
                    ... on UploadFileEntity {
                      attributes {
                        url
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
`)

const getGlobalData = async () => {
  const { global } = await graphqlClient.request(GetGlobalQueryDocument)
  return global?.data?.attributes
}

export default getGlobalData
