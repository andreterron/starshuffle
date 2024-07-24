import { useConnection, useRequest } from "@mainframe-api/react";
import "./App.css";
import RepoCard from "./RepoCard";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { useMainframeRepo } from "./lib/use-mainframe-repo";
import logo from "./assets/star-shuffle-logo.svg";
import { GithubIcon, HeartIcon, Loader2Icon, LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function App() {
  const { connection, isLoading, initiateAuth } = useConnection("github");

  // This makes a request to the GitHub API through a Mainframe proxy
  const { data } = useRequest(connection, "/user");
  const { data: starredRepos, isLoading: isLoadingStarredRepos } = useRequest(
    connection,
    "/user/starred?per_page=100",
  );

  const mainframeRepo = useMainframeRepo();

  const [randomIndex, setRandomIndex] = useState(-1);

  useEffect(() => {
    if (!starredRepos) {
      return;
    }
    // For demo purposes
    // const mainframeIndex = (starredRepos as any[]).findIndex(
    //   (r: any) => r.name === "mainframe",
    // );
    // if (mainframeIndex >= 0) {
    //   setRandomIndex(mainframeIndex);
    //   return;
    // }
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
        <img src={logo} title="Star Shuffle" />
        {isLoading ? null : !connection ? (
          <Button variant="outline" onClick={() => initiateAuth()}>
            Connect to GitHub
          </Button>
        ) : data ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="data-[state=open]:bg-muted">
                @{data.login}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="group" asChild>
                <a
                  href={`https://github.com/sponsors/andreterron`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HeartIcon className="size-4 mr-2 group-hover:text-red-500 transition-colors duration-75" />
                  Sponsor
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={`https://github.com/${data.login}?tab=stars`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="size-4 mr-2" />
                  Your Stars @ GitHub
                </a>
              </DropdownMenuItem>
              {/* TODO: Logout */}
              {/* <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="size-4 mr-2" />
                Logout
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
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
        ) : isLoading || isLoadingStarredRepos ? (
          <Loader2Icon className="size-6 animate-spin" />
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
