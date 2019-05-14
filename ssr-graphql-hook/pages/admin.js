import { useQuery } from 'graphql-hooks';
import { Cookies } from 'react-cookie';
import CheckLogin from '../components/CheckLogin';

const queryAdmin = `
query {
  isLoggedIn
}
`;

const PageAdmin = props => {
  const { loading, error, data, refetch } = useQuery(queryAdmin);
  if (error) return <div>error...</div>
  if (!data) return <div>loading...</div>
  return <div>{JSON.stringify(data)}{<CheckLogin />}</div>
};

export default PageAdmin;
