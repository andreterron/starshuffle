import { useConnection, useRequest } from "@mainframe-api/react";
import "./App.css";

function App() {
  const { connection, initiateAuth } = useConnection("github");

  // This makes a request to the GitHub API through a Mainframe proxy
  const { data } = useRequest(connection, "/user");

  return (
    <>
      <h1>Mainframe</h1>
      <button onClick={() => initiateAuth()}>
        {connection ? "Connected ✓" : "Connect to GitHub"}
      </button>
      {data && <p>Connected as @{data.login}</p>}
    </>
  );
}

export default App;
