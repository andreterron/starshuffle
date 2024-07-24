import { useConnection, useRequest } from "@mainframe-api/react";
import "./App.css";
import RepoCard from "./RepoCard";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { useMainframeRepo } from "./lib/use-mainframe-repo";

function App() {
  const { connection, isLoading, initiateAuth } = useConnection("github");

  // This makes a request to the GitHub API through a Mainframe proxy
  const { data } = useRequest(connection, "/user");
  const { data: starredRepos } = useRequest(
    connection,
    "/user/starred?per_page=100",
  );

  const mainframeRepo = useMainframeRepo();

  const [randomIndex, setRandomIndex] = useState(-1);

  useEffect(() => {
    if (!starredRepos) {
      return;
    }
    const mainframeIndex = (starredRepos as any[]).findIndex(
      (r: any) => r.name === "mainframe",
    );
    if (mainframeIndex >= 0) {
      setRandomIndex(mainframeIndex);
      return;
    }
    setRandomIndex(
      Math.min(
        starredRepos.length - 1,
        Math.floor(Math.random() * starredRepos.length),
      ),
    );
  }, [starredRepos?.length]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="text-5xl font-bold">Repo Rediscover</h1>
        {isLoading ? null : !connection ? (
          <Button variant="outline" onClick={() => initiateAuth()}>
            Connect to GitHub
          </Button>
        ) : data ? (
          <p>Connected as @{data.login}</p>
        ) : null}
      </div>

      <div className="flex justify-center pt-32 w-full">
        {/* <button onClick={() => initiateAuth()}>
        {connection ? "Connected ✓" : "Connect to GitHub"}
      </button>
      {data && <p>Connected as @{data.login}</p>} */}
        {starredRepos ? (
          randomIndex >= 0 && randomIndex < starredRepos.length ? (
            <RepoCard
              repo={starredRepos[randomIndex]}
              onNext={() => {
                setRandomIndex(
                  Math.min(
                    starredRepos.length - 1,
                    Math.floor(Math.random() * starredRepos.length),
                  ),
                );
              }}
            />
          ) : null
        ) : (
          <div>
            <div className="text-center flex flex-col items-center">
              <p className="font-medium mb-1 text-xl">
                Unearth hidden gems in your GitHub stars ★
              </p>
              <p className="max-w-sm">
                Discover a random repository that inspired you once and can
                inspire you again.
              </p>

              <Button className="mt-8" onClick={() => initiateAuth()}>
                Connect to GitHub
              </Button>
              <div className=" mt-32 mb-1 text-muted-foreground text-sm opacity-60">
                ↓ Sample ↓
              </div>
            </div>
            <RepoCard
              repo={mainframeRepo}
              className="transition-all after:pointer-events-none after:bg-gray-50/50 after:absolute after:inset-0 hover:after:bg-transparent after:block after:transition-all after:duration-300"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
