import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

const LOGIN = gql`
  query {
    login
  }
`;


export default function Apollo() {
  const { loading, data } = useQuery(GET_USERS);
  const login = useQuery(LOGIN);
  
  return (
    <div>
      {!loading && (
        <ul>
          {data.users.map((u => {
            return <li key={u.id}>{u.name}</li>;
          }))}
        </ul>
      )}
      {!login.loading && (
        <p>{JSON.stringify(login.data)}</p>
      )}
    </div>
  )
}