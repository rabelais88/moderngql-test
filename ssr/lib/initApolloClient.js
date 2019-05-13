import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
  ApolloLink,
  concat
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

const customFetch = (uri, options) => { //async is also possible
  // const token = cookies.get('token');
  const newOptions = cloneDeep(options);
  if (!newOptions.header) newOptions.header = { Authorization: {} };
  // newOptions.header.Authorization = `Bearer ${token}`
  return fetch(uri, newOptions);
}

const authMiddleware = new ApolloLink((op, fw) => {
  console.log('authmiddleware initializing', cookies.get('token'));
  op.setContext(({ headers = {}}) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${cookies.get('token')}`,
    }
  }));
  return fw(op);
});

const httpLink = new HttpLink({
  // uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn", // Server URL (must be absolute)
  uri: "http://localhost:3500", // graphql uri
  // credentials: "same-origin", // Additional fetch() options like `credentials` or `headers` 
  credentials: 'include',
})

function createApolloClient(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache().restore(initialState)
  });
}

export default function initApollo(initialState = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}