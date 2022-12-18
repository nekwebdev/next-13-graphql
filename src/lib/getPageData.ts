// 3rd party modules
import { graphql } from '@lib/gql'
// Core utilities
import graphqlClient from '@core/graphqlClient'

const GetPageQueryDocument = graphql(`
  query GetPageQuery($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          title
          content
          seo {
            metaTitle
            metaDescription
            metaKeywords
            shareImage {
              data {
                id
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
`)

const getPageData = async (slug: string) => {
  const { pages } = await graphqlClient.request(GetPageQueryDocument, { slug })
  return pages?.data
}

export default getPageData
