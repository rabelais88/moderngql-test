import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const CHECK_LOGIN = gql`
  query {
    login
  }
`;

export default function Apollo() {
  const isLoggedIn = useQuery(CHECK_LOGIN);
  
  return (
    <div>
      {!isLoggedIn.loading && (
        <p>{JSON.stringify(login.data)}</p>
      )}
    </div>
  )
}