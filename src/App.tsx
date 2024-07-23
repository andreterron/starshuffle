import { useConnection, useRequest } from "@mainframe-api/react";
import "./App.css";
import RepoCard from "./RepoCard";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";

const mainframeRepo = {
  id: 655872706,
  node_id: "R_kgDOJxfSwg",
  name: "mainframe",
  full_name: "andreterron/mainframe",
  private: false,
  owner: {
    login: "andreterron",
    id: 1753594,
    node_id: "MDQ6VXNlcjE3NTM1OTQ=",
    avatar_url: "https://avatars.githubusercontent.com/u/1753594?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/andreterron",
    html_url: "https://github.com/andreterron",
    followers_url: "https://api.github.com/users/andreterron/followers",
    following_url:
      "https://api.github.com/users/andreterron/following{/other_user}",
    gists_url: "https://api.github.com/users/andreterron/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/andreterron/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/andreterron/subscriptions",
    organizations_url: "https://api.github.com/users/andreterron/orgs",
    repos_url: "https://api.github.com/users/andreterron/repos",
    events_url: "https://api.github.com/users/andreterron/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/andreterron/received_events",
    type: "User",
    site_admin: false,
  },
  html_url: "https://github.com/andreterron/mainframe",
  description: "An API aggregator for React",
  fork: false,
  url: "https://api.github.com/repos/andreterron/mainframe",
  forks_url: "https://api.github.com/repos/andreterron/mainframe/forks",
  keys_url: "https://api.github.com/repos/andreterron/mainframe/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/andreterron/mainframe/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/andreterron/mainframe/teams",
  hooks_url: "https://api.github.com/repos/andreterron/mainframe/hooks",
  issue_events_url:
    "https://api.github.com/repos/andreterron/mainframe/issues/events{/number}",
  events_url: "https://api.github.com/repos/andreterron/mainframe/events",
  assignees_url:
    "https://api.github.com/repos/andreterron/mainframe/assignees{/user}",
  branches_url:
    "https://api.github.com/repos/andreterron/mainframe/branches{/branch}",
  tags_url: "https://api.github.com/repos/andreterron/mainframe/tags",
  blobs_url:
    "https://api.github.com/repos/andreterron/mainframe/git/blobs{/sha}",
  git_tags_url:
    "https://api.github.com/repos/andreterron/mainframe/git/tags{/sha}",
  git_refs_url:
    "https://api.github.com/repos/andreterron/mainframe/git/refs{/sha}",
  trees_url:
    "https://api.github.com/repos/andreterron/mainframe/git/trees{/sha}",
  statuses_url:
    "https://api.github.com/repos/andreterron/mainframe/statuses/{sha}",
  languages_url: "https://api.github.com/repos/andreterron/mainframe/languages",
  stargazers_url:
    "https://api.github.com/repos/andreterron/mainframe/stargazers",
  contributors_url:
    "https://api.github.com/repos/andreterron/mainframe/contributors",
  subscribers_url:
    "https://api.github.com/repos/andreterron/mainframe/subscribers",
  subscription_url:
    "https://api.github.com/repos/andreterron/mainframe/subscription",
  commits_url:
    "https://api.github.com/repos/andreterron/mainframe/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/andreterron/mainframe/git/commits{/sha}",
  comments_url:
    "https://api.github.com/repos/andreterron/mainframe/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/andreterron/mainframe/issues/comments{/number}",
  contents_url:
    "https://api.github.com/repos/andreterron/mainframe/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/andreterron/mainframe/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/andreterron/mainframe/merges",
  archive_url:
    "https://api.github.com/repos/andreterron/mainframe/{archive_format}{/ref}",
  downloads_url: "https://api.github.com/repos/andreterron/mainframe/downloads",
  issues_url:
    "https://api.github.com/repos/andreterron/mainframe/issues{/number}",
  pulls_url:
    "https://api.github.com/repos/andreterron/mainframe/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/andreterron/mainframe/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/andreterron/mainframe/notifications{?since,all,participating}",
  labels_url:
    "https://api.github.com/repos/andreterron/mainframe/labels{/name}",
  releases_url:
    "https://api.github.com/repos/andreterron/mainframe/releases{/id}",
  deployments_url:
    "https://api.github.com/repos/andreterron/mainframe/deployments",
  created_at: "2023-06-19T19:37:13Z",
  updated_at: "2024-07-23T19:05:12Z",
  pushed_at: "2024-07-23T19:10:54Z",
  git_url: "git://github.com/andreterron/mainframe.git",
  ssh_url: "git@github.com:andreterron/mainframe.git",
  clone_url: "https://github.com/andreterron/mainframe.git",
  svn_url: "https://github.com/andreterron/mainframe",
  homepage: "https://mainframe.so",
  size: 2817,
  stargazers_count: 68,
  watchers_count: 68,
  language: "TypeScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  forks_count: 3,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 23,
  license: {
    key: "mit",
    name: "MIT License",
    spdx_id: "MIT",
    url: "https://api.github.com/licenses/mit",
    node_id: "MDc6TGljZW5zZTEz",
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: [],
  visibility: "public",
  forks: 3,
  open_issues: 23,
  watchers: 68,
  default_branch: "main",
  permissions: {
    admin: true,
    maintain: true,
    push: true,
    triage: true,
    pull: true,
  },
};

function App() {
  const { connection, isLoading, initiateAuth } = useConnection("github");

  // This makes a request to the GitHub API through a Mainframe proxy
  const { data } = useRequest(connection, "/user");
  const { data: starredRepos } = useRequest(
    connection,
    "/user/starred?per_page=100",
  );

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
          <Button onClick={() => initiateAuth()}>Connect to GitHub</Button>
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
          ) : // <ul style={{ listStyleType: "none", padding: 0 }}>
          //   {starredRepos?.map((repo: any, i: number) => (
          //     <li
          //       key={repo.id ?? i}
          //       style={{
          //         padding: "10px",
          //         borderBottom: "1px solid #ccc",
          //         display: "flex",
          //         alignItems: "center",
          //         justifyContent: "space-between",
          //       }}
          //     >
          //       <a
          //         href={repo.html_url}
          //         target="_blank"
          //         rel="noopener noreferrer"
          //         style={{
          //           textDecoration: "none",
          //           color: "black",
          //           fontWeight: "bold",
          //         }}
          //       >
          //         {repo.full_name}
          //       </a>
          //       <span style={{ fontStyle: "italic" }}>
          //         {repo.stargazers_count} stars
          //       </span>
          //     </li>
          //   ))}
          // </ul>
          null
        ) : (
          <div>
            <div className="text-center flex flex-col items-center">
              <p className="font-medium mb-1 text-lg">
                Unearth hidden gems in your GitHub stars ★
              </p>
              <p className="max-w-sm">
                Discover a random repository that inspired you once and can
                inspire you again.
              </p>

              <Button
                className="mt-8"
                variant="outline"
                onClick={() => initiateAuth()}
              >
                Connect to GitHub
              </Button>
              <div className=" mt-32 mb-1 text-muted-foreground text-sm opacity-60">
                ↓ Sample ↓
              </div>
            </div>
            <RepoCard
              repo={mainframeRepo}
              className="opacity-40 bg-gray-50 hover:opacity-100 hover:bg-white transition-all"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
