import { useQuery } from 'graphql-hooks';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const queryLogin = `
query {
  login
}
`;

const PageLogin = props => {
  const { loading, error, data, refetch } = useQuery(queryLogin);
  if (error) return <div>error...</div>
  if (!data) return <div>loading...</div>
  const prevToken = cookies.get('token');
  const token = data.login;
  if (token !== prevToken) cookies.set('token', token);
  return <div>{JSON.stringify(data)}</div>
};

export default PageLogin;
