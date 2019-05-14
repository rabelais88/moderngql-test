import { GraphQLClient } from 'graphql-hooks'
import memCache from 'graphql-hooks-memcache'
import unfetch from 'isomorphic-unfetch'

let graphQLClient = null

function create (initialState = {}, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : null;
  return new GraphQLClient({
    ssrMode: !process.browser,
    url: 'http://localhost:3500',
    cache: memCache({ initialState }),
    fetch: process.browser ? fetch.bind() : unfetch, // eslint-disable-line
    headers, // !!! custom header is added for token
  })
}

export default function initGraphQL (initialState, token) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, token) // !!! token is passed via express middleware
  }

  // Reuse client on the client-side
  if (!graphQLClient) {
    graphQLClient = create(initialState, token)
  }

  return graphQLClient
}