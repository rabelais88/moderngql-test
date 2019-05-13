import React from "react";
import App, { Container } from "next/app";
import withApolloClient from "../lib/withApolloClient";
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

class ApolloApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(ApolloApp);