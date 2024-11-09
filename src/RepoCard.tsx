/**
 * v0 by Vercel.
 * @see https://v0.dev/t/B8do86r31fL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefObject, SVGProps, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface RepoCardProps extends HTMLMotionProps<"div"> {
  repo: any;
  className?: string;
  onNext?: () => void;
}

const RepoCard = forwardRef<HTMLDivElement, RepoCardProps>(
  ({ repo, className, onNext, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={`w-full md:w-[36rem] max-w-full h-48 overflow-hidden relative border-input dark:border-border/50 shadow-[0_8px_16px_0px_rgba(0,0,0,0.08)] ${
          className ?? ""
        }`}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <CardHeader className="p-3 md:p-6">
            <CardTitle className="text-lg md:text-xl line-clamp-2">
              <span className="font-normal text-muted-foreground">
                {repo.owner.login} /{" "}
              </span>
              {/* <div className="h-6 w-px relative skew-x-5 border-r" /> */}
              {repo.name}
            </CardTitle>
            <CardDescription className="text-xs md:text-base !mt-0 md:mt-2 line-clamp-3">
              {repo.description || (
                <span className="text-muted-foreground/50 italic">
                  No description
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <div className="flex items-center gap-2 p-3 md:p-6">
            {/* TODO: Get another repo */}
            {onNext ? (
              <>
                <Button
                  variant="secondary"
                  className="px-3 shadow-none"
                  onClick={() => onNext?.()}
                >
                  Next
                </Button>
                <Button className="px-3 shadow-none" asChild>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open
                  </a>
                </Button>
              </>
            ) : (
              <Button variant="outline" className="px-3 shadow-none" asChild>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <StarIcon className="w-3 h-3 mr-1" />
                  Star
                </a>
              </Button>
            )}
          </div>
        </div>
        <CardContent className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CircleDotIcon className="w-3 h-3 mr-1" />
              {repo.language}
            </div>
            <div className="flex items-center">
              <StarIcon className="w-3 h-3 mr-1" />
              {repo.stargazers_count}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

RepoCard.displayName = "RepoCard";

function CircleDotIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// Create and export the motion version
export default motion(RepoCard);
