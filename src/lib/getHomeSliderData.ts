// 3rd party modules
import { graphql } from '@lib/gql'
// Core utilities
import graphqlClient from '@core/graphqlClient'
// GraphQL types
import { isSlide } from '@lib/typePredicates'
// Core utilities
import getStrapiMedia from '@core/getStrapiMedia'

const GetHomeSliderQueryDocument = graphql(`
  query GetHomeSliderQuery {
    homeSlider {
      data {
        attributes {
          slides {
            ... on ComponentSharedSlide {
              id
              label
              image {
                data {
                  id
                  attributes {
                    width
                    height
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
`)

const getHomeSliderData = async () => {
  const { homeSlider } = await graphqlClient.request(GetHomeSliderQueryDocument)
  // get all the correct url paths
  homeSlider?.data?.attributes?.slides?.forEach((slide) => {
    if (isSlide(slide)) {
      const fixedUrl = getStrapiMedia(slide.image.data?.attributes?.url ?? '')
      slide.image.data?.attributes?.url ? (slide.image.data.attributes.url = fixedUrl) : null
    }
  })
  return homeSlider?.data?.attributes
}

export default getHomeSliderData
