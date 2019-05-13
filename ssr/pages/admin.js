import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const CHECK_LOGIN = gql`
  query {
    isLoggedIn
  }
`;

const pageAdmin = () => {
  const isLoggedIn = useQuery(CHECK_LOGIN);
  
  return (
    <div>
      {!isLoggedIn.loading && (
        <p>{JSON.stringify(isLoggedIn.data)}</p>
      )}
    </div>
  )
}

export default pageAdmin;