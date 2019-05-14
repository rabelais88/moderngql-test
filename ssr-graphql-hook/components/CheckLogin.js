import { useManualQuery } from "graphql-hooks";

const queryAdmin = `
query {
  isLoggedIn
}
`;

const LoginChecker = props => {
  const [fetchLogin, { loading, error, data }] = useManualQuery(queryAdmin);
  return (
    <div>
      <button onClick={fetchLogin}>check logged in status manually</button>
      {error && <div>error...</div>}
      {loading && <div>Loading...</div>}
      {data && <div>REFEtCHED{JSON.stringify(data)}</div>}
    </div>
  );
};

export default LoginChecker;
