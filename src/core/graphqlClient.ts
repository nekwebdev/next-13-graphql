// 3rd party modules
import { GraphQLClient } from 'graphql-request'

const graphqlClient = new GraphQLClient(
  process.env.GRAPHQL_ENDPOINT as string,
  {
    headers: {
      'x-api-key': process.env.GRAPHQL_API_KEY as string,
    },
  }
)

export default graphqlClient
