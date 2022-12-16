// 3rd party modules
import { graphql } from '@lib/gql'
// Core utilities
import graphqlClient from '@core/graphqlClient'

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
  return homeSlider?.data?.attributes
}

export default getHomeSliderData
