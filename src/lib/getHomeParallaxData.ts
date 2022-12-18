// 3rd party modules
import { graphql } from '@lib/gql'
// Core utilities
import graphqlClient from '@core/graphqlClient'
import getStrapiMedia from '@core/getStrapiMedia'

const GetHomeParallaxQueryDocument = graphql(`
  query GetHomeParallaxQuery {
    homeParallax {
      data {
        attributes {
          header
          subtext
          banner {
            ... on UploadFileEntityResponse {
              data {
                attributes {
                  url
                  alternativeText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`)

const getHomeParallaxData = async () => {
  const { homeParallax } = await graphqlClient.request(GetHomeParallaxQueryDocument)
  const fixedBanner = getStrapiMedia(
    homeParallax?.data?.attributes?.banner?.data?.attributes?.url ?? ''
  )
  homeParallax?.data?.attributes?.banner?.data?.attributes?.url
    ? (homeParallax.data.attributes.banner.data.attributes.url = fixedBanner)
    : null
  return homeParallax?.data?.attributes
}

export default getHomeParallaxData
