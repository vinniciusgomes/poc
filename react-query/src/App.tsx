import axios from "axios";
import { useQuery } from "react-query";

import "./App.css";

function App() {
  const { isLoading, error, data, isFetching } = useQuery<any>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        "https://api.github.com/repos/facebook/react"
      );

      return data;
    },
    {
      staleTime: 1000 * 5,
    }
  );

  return (
    <div className="App">
      {!isLoading && !error && (
        <>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <strong>👀 {data.subscribers_count}</strong>{" "}
          <strong>✨ {data.stargazers_count}</strong>{" "}
          <strong>🍴 {data.forks_count}</strong>
          <div>{isFetching ? "Updating..." : ""}</div>
        </>
      )}
    </div>
  );
}

export default App;
