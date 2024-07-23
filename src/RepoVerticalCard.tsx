const RepoCard = ({ repo }: { repo: any }) => {
  if (!repo) return null;

  // IDEA: Use more color and images
  // TODO: Get readme using /repos/{owner}/{repo}/readme
  // TODO: Try to get the first image of the readme
  // TODO: Try to pick a color schema from that image
  // TODO: Generate an AI-image if an image doesn't exist
  // TODO: Use the image and color schema for the card

  return (
    <div
      style={{
        width: "300px",
        height: "400px",
        borderRadius: "20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#fff",
        margin: "20px auto",
      }}
    >
      <h2 style={{ margin: "10px 0" }}>{repo.name}</h2>
      <p>{repo.description || "No description available."}</p>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          Visit Repo
        </a>
        <span
          style={{
            fontStyle: "italic",
            alignSelf: "center",
          }}
        >
          {repo.stargazers_count} stars
        </span>
      </div>
    </div>
  );
};

export default RepoCard;
