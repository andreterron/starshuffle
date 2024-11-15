import { useConnection, useRequest } from "@mainframe-api/react";
import "./App.css";
import RepoCard from "./RepoCard";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { useMainframeRepo } from "./lib/use-mainframe-repo";
import {
  Code2Icon,
  HeartIcon,
  Loader2Icon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./components/ui/mode-toggle";
import posthog from "posthog-js";
import { AnimatePresence, motion } from "framer-motion";

const MotionRepoCard = motion(RepoCard);

function App() {
  const [randomIndices, setRandomIndices] = useState<number[]>([]);

  const { connection, isLoading, initiateAuth, disconnect } =
    useConnection("github");
  // This makes a request to the GitHub API through a Mainframe proxy
  const { data } = useRequest(connection, "/user");
  const { data: starredRepos, isLoading: isLoadingStarredRepos } = useRequest(
    connection,
    "/user/starred?per_page=100"
  );
  const mainframeRepo = useMainframeRepo();

  useEffect(() => {
    if (data?.login) {
      posthog.identify(data.login);
    }
  }, [data?.login]);

  useEffect(() => {
    if (!starredRepos) {
      return;
    }
    const maxRepos = Math.min(3, starredRepos.length);
    const indices: number[] = [];
    while (indices.length < maxRepos) {
      const newIndex = Math.min(
        starredRepos.length - 1,
        Math.floor(Math.random() * starredRepos.length)
      );
      if (!indices.includes(newIndex)) {
        indices.push(newIndex);
      }
    }
    setRandomIndices(indices);
  }, [starredRepos?.length]);

  const addNewRepo = () => {
    setRandomIndices((prevIndices) => {
      const newIndices = [...prevIndices.slice(1)];

      if (starredRepos.length <= 4) {
        const availableIndices = Array.from(
          { length: starredRepos.length },
          (_, i) => i
        ).filter((i) => !prevIndices.includes(i));

        // If no more unique indices, start over
        if (availableIndices.length === 0) {
          return [...newIndices, prevIndices[0]];
        }

        return [...newIndices, availableIndices[0]];
      }

      let newIndex: number;
      do {
        newIndex = Math.min(
          starredRepos.length - 1,
          Math.floor(Math.random() * starredRepos.length)
        );
      } while (prevIndices.includes(newIndex));

      return [...newIndices, newIndex];
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col mt-3 px-4 md:px-0">
      <div
        className="flex-shrink-0 flex-grow-0"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <svg
          className="h-14"
          viewBox="0 0 332 69"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 49H26.8C29.4 49 31.8 47.8 33.4 45.6L45.6 28.4C47 26.2 49.6 25 52.2 25"
            className="stroke-primary"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 25H27.8C30.8 25 33.6 26.8 35 29.4"
            className="stroke-primary"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M52.2 48.9998C49.6 48.9998 47 47.5998 45.6 45.3998L44.6 43.7998"
            className="stroke-primary"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M62.335 40L64.2925 43.9657L68.67 44.6055L65.5025 47.6907L66.25 52.0492L62.335 49.9903L58.42 52.0492L59.1675 47.6907L56 44.6055L60.3775 43.9657L62.335 40Z"
            className="stroke-primary"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M62.335 16L64.2925 19.9657L68.67 20.6055L65.5025 23.6907L66.25 28.0492L62.335 25.9903L58.42 28.0492L59.1675 23.6907L56 20.6055L60.3775 19.9657L62.335 16Z"
            className="stroke-primary"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M307.739 38.1894V40.4844H292.124C292.259 43.2294 294.239 45.6144 297.479 45.6144C299.774 45.6144 301.619 44.4444 302.969 42.1044L307.469 43.7694C305.534 48.1794 302.114 50.3844 297.164 50.3844C289.379 50.3844 286.274 44.0844 286.274 38.6844C286.274 33.2844 289.379 26.9844 297.164 26.9844C300.764 26.9844 303.689 28.4694 305.309 30.7644C306.929 32.9694 307.739 35.6244 307.739 38.1894ZM297.164 31.7544C294.509 31.7544 292.664 33.6894 292.259 36.0744H302.024C301.394 33.1944 299.774 31.7544 297.164 31.7544Z"
            className="fill-primary"
          />
          <path
            d="M276.85 50.0244V18.1644H282.43V50.0244H276.85Z"
            className="fill-primary"
          />
          <path
            d="M262.618 32.1144H259.738V27.3444H262.618V26.1744C262.618 20.8194 265.588 18.1644 270.448 18.1644C272.158 18.1644 273.553 18.4794 274.678 19.0644L273.463 23.5644C272.473 23.1594 271.573 22.9344 270.763 22.9344C269.053 22.9344 268.198 23.8794 268.198 25.7694V27.3444H272.968V32.1144H268.198V50.0244H262.618V32.1144Z"
            className="fill-primary"
          />
          <path
            d="M246.918 32.1144H244.038V27.3444H246.918V26.1744C246.918 20.8194 249.888 18.1644 254.748 18.1644C256.458 18.1644 257.853 18.4794 258.978 19.0644L257.763 23.5644C256.773 23.1594 255.873 22.9344 255.063 22.9344C253.353 22.9344 252.498 23.8794 252.498 25.7694V27.3444H257.268V32.1144H252.498V50.0244H246.918V32.1144Z"
            className="fill-primary"
          />
          <path
            d="M240.879 27.3444V50.0244H235.299V46.3794C233.454 49.0344 231.114 50.3844 228.279 50.3844C224.094 50.3844 221.304 47.9994 221.304 43.5444V27.3444H226.884V41.8794C226.884 44.3544 227.964 45.6144 230.124 45.6144C233.004 45.6144 235.299 42.1044 235.299 36.3894V27.3444H240.879Z"
            className="fill-primary"
          />
          <path
            d="M197.13 50.0244V18.1644H202.71V30.9894C204.375 28.3344 206.805 26.9844 209.91 26.9844C214.275 26.9844 216.975 29.3244 216.975 33.8244V50.0244H211.395V35.8044C211.395 33.1044 210.27 31.7544 208.02 31.7544C205.14 31.7544 202.71 34.7244 202.71 40.4394V50.0244H197.13Z"
            className="fill-primary"
          />
          <path
            d="M192.036 23.8794L187.311 26.8944C186.186 24.6894 184.701 23.5644 182.946 23.5644C181.191 23.5644 179.931 24.7794 179.931 26.4444C179.931 28.4244 182.091 29.9094 184.656 31.1244C188.436 32.7894 193.431 35.1294 193.386 40.5744C193.386 46.6944 189.426 50.3844 183.306 50.3844C180.561 50.3844 178.176 49.5294 176.196 47.8644C174.216 46.1544 172.956 44.0394 172.461 41.5644L177.186 38.5944C178.401 42.8694 180.471 44.9844 183.441 44.9844C186.186 44.9844 187.536 43.6344 187.536 40.8894C187.536 39.0444 185.511 37.6044 182.856 36.4794C179.121 34.9044 174.261 32.5194 174.351 26.7144C174.351 24.3294 175.161 22.3044 176.781 20.6394C178.446 18.9744 180.471 18.1644 182.946 18.1644C187.221 18.1644 190.236 20.0544 192.036 23.8794Z"
            className="fill-primary"
          />
          <path
            d="M152.619 41.9694V50.0244H147.039V27.3444H152.619V31.0344C154.239 28.4694 156.669 26.9844 159.324 26.9844C160.179 26.9844 161.079 27.1194 162.069 27.4344L161.034 32.6094C160.359 32.2044 159.549 31.9794 158.694 31.9794C155.139 31.9794 152.619 35.0844 152.619 41.9694Z"
            className="fill-primary"
          />
          <path
            d="M129.579 34.3644L124.854 33.2844C125.574 29.5044 128.949 26.9844 133.494 26.9844C139.839 26.9844 143.034 30.1344 143.034 36.4794V50.0244H138.444L137.859 47.1444C136.104 49.3044 133.764 50.3844 130.884 50.3844C126.879 50.3844 123.999 47.8644 123.999 43.4994C123.999 38.9994 127.914 36.0744 133.674 36.0744H137.454V35.0844C137.454 32.8794 136.149 31.7544 133.494 31.7544C131.469 31.7544 130.164 32.6094 129.579 34.3644ZM129.849 43.4094C129.849 44.6244 130.704 45.6144 132.189 45.6144C133.584 45.6144 134.799 45.1644 135.834 44.3094C136.914 43.4544 137.454 42.3294 137.454 40.9344V40.4844H133.719C131.154 40.4844 129.849 41.4744 129.849 43.4094Z"
            className="fill-primary"
          />
          <path
            d="M120.784 45.0744L122.089 49.5744C120.919 50.1144 119.704 50.3844 118.399 50.3844C113.179 50.3844 110.074 47.5494 110.074 42.0144V32.1144H106.564V27.3444H110.074V21.6744L115.654 18.1644V27.3444H121.639V32.1144H115.654V41.9244C115.654 44.6244 116.644 45.6144 118.624 45.6144C119.389 45.6144 120.109 45.4344 120.784 45.0744Z"
            className="fill-primary"
          />
          <path
            d="M103.82 23.8794L99.095 26.8944C97.97 24.6894 96.485 23.5644 94.73 23.5644C92.975 23.5644 91.715 24.7794 91.715 26.4444C91.715 28.4244 93.875 29.9094 96.44 31.1244C100.22 32.7894 105.215 35.1294 105.17 40.5744C105.17 46.6944 101.21 50.3844 95.09 50.3844C92.345 50.3844 89.96 49.5294 87.98 47.8644C86 46.1544 84.74 44.0394 84.245 41.5644L88.97 38.5944C90.185 42.8694 92.255 44.9844 95.225 44.9844C97.97 44.9844 99.32 43.6344 99.32 40.8894C99.32 39.0444 97.295 37.6044 94.64 36.4794C90.905 34.9044 86.045 32.5194 86.135 26.7144C86.135 24.3294 86.945 22.3044 88.565 20.6394C90.23 18.9744 92.255 18.1644 94.73 18.1644C99.005 18.1644 102.02 20.0544 103.82 23.8794Z"
            className="fill-primary"
          />
        </svg>

        <div className="flex items-center gap-2 pr-2">
          <ModeToggle />
          {isLoading ? null : !connection ? (
            <Button variant="outline" onClick={() => initiateAuth()}>
              Connect to GitHub
            </Button>
          ) : data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="data-[state=open]:bg-muted"
                >
                  @{data.login}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <a
                    href={`https://github.com/andreterron/starshuffle`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Code2Icon className="size-4 mr-2" />
                    View source code
                  </a>
                </DropdownMenuItem>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a
                    href={`https://github.com/${data.login}?tab=stars`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <StarIcon className="size-4 mr-2" />
                    Your Stars @ GitHub
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    disconnect()
                      .catch((e) => console.error(e))
                      .finally(() => {
                        console.log("Disconnected");
                        posthog.reset();
                      });
                  }}
                >
                  <LogOutIcon className="size-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col items-center pt-32 px-4 w-full flex-grow flex-shrink-0">
        {starredRepos ? (
          <AnimatePresence mode="popLayout">
            {randomIndices.map((index, i) => (
              <MotionRepoCard
                drag={i === 0}
                dragSnapToOrigin={i === 0}
                layoutId={`repo-${index}`}
                key={index}
                repo={starredRepos[index]}
                onDragEnd={() => {
                  addNewRepo();
                }}
                onNext={() => addNewRepo()}
                className={
                  i === 0 ? "z-30 cursor-grab" : i === 1 ? "z-20" : "z-10"
                }
                initial={{ opacity: 1, scale: 0.85, y: i === 2 ? -272 : 0 }}
                animate={{
                  opacity: 1,
                  scale: 1 - i * 0.05,
                  y: i === 1 ? -160 : i === 2 ? -320 : 0,
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: i === 1 ? 0.3 : i === 2 ? 0.32 : 0.34,
                  },
                }}
                exit={{
                  opacity: 0,
                  x: 0,
                  y: 32,
                  zIndex: -10,
                  scale: 0.8,
                  filter: "blur(4px)",
                  transition: { type: "spring", bounce: 0, duration: 0.45 },
                }}
                transition={{
                  duration: 0.3,
                  layout: { type: "spring", bounce: 0, duration: 0.3 },
                }}
              />
            ))}
          </AnimatePresence>
        ) : isLoading || isLoadingStarredRepos ? (
          <Loader2Icon className="size-10 animate-spin" />
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
              className="transition-all after:pointer-events-none after:bg-card/50 after:absolute after:inset-0 hover:after:bg-transparent after:block after:transition-all after:duration-300"
            />
          </div>
        )}
      </div>
      <footer className="flex-shrink-0 p-6 w-full text-center text-sm text-muted-foreground/80 gap-1 saturate-0 transition-all hover:saturate-100 duration-500">
        <span className=" border-b border-transparent">Built with ❤️ by </span>
        <a
          className="border-b border-border hover:border-primary hover:text-primary"
          href="https://github.com/andreterron"
          target="_blank"
          rel="noopener noreferrer"
        >
          André Terron
        </a>{" "}
        <span className=" border-b border-transparent">and</span>{" "}
        <a
          className="border-b border-border hover:border-primary hover:text-primary"
          href="https://github.com/mdebauge"
          target="_blank"
          rel="noopener noreferrer"
        >
          Michel DeBauge
        </a>{" "}
        <span className=" border-b border-transparent">using</span>{" "}
        <a
          className="border-b border-border hover:border-primary hover:text-primary"
          href="https://mainframe.so"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="">Mainframe</span>
        </a>
      </footer>
    </div>
  );
}

export default App;
