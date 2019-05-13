import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "apollo-boost";
import fetch from "isomorphic-unfetch";
import cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  // @ts-ignore
  global.fetch = fetch;
}

function createApolloClient(initialState, token) {
  const httpLink = new HttpLink({
    uri: "http://localhost:3500", // graphql uri
    // credentials: "same-origin", // Additional fetch() options like `credentials` or `headers` 
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: httpLink,
    cache: new InMemoryCache().restore(initialState)
  });
}

export default function initApolloClient(initialState = {}, token) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createApolloClient(initialState, token);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    const clientToken = cookies.get('token');
    apolloClient = createApolloClient(initialState, clientToken);
  }

  return apolloClient;
}