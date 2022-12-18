// 3rd party modules
import { graphql } from '@lib/gql'
// Core utilities
import graphqlClient from '@core/graphqlClient'

const GetRedirectsQueryDocument = graphql(`
  query GetRedirectsQuery {
    redirects {
      data {
        id
        attributes {
          source
          destination
        }
      }
    }
  }
`)

const getRedirectsData = async () => {
  const { redirects } = await graphqlClient.request(GetRedirectsQueryDocument)
  return redirects?.data
}

export default getRedirectsData
