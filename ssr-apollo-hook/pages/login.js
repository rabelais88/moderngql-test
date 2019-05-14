import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const LOGIN = gql`
  query {
    login
  }
`;


const pageLogin = () => {
  const res = useQuery(LOGIN);
  if (res.data.login) {
    console.log('token has been set', res.data.login);
    cookies.set('token', res.data.login);
  }
  return (
    <div>
      {!res.loading && (
        <p>{JSON.stringify(res.data)}</p>
      )}
    </div>
  )
}

export default pageLogin;