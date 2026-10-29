
import React, { useEffect, useState } from "react";

const USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
const REPOS_PER_PAGE = 9;

export default function GitHubProjects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(REPOS_PER_PAGE);

  useEffect(() => {
    const controller = new AbortController();

    async function getRepositories() {
      try {
        if (!USERNAME) {
          throw new Error("GitHub username is not configured");
        }

        const response = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to load repositories");
        }

        const data = await response.json();

        setRepos(
          data.filter((repo) => !repo.fork && !repo.archived)
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getRepositories();

    return () => controller.abort();
  }, []);

  const visibleRepos = repos.slice(0, visibleCount);
  const hasMore = visibleCount < repos.length;
  const isExpanded = visibleCount > REPOS_PER_PAGE;

  const handleShowMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + REPOS_PER_PAGE, repos.length)
    );
  };

  const handleShowLess = () => {
    setVisibleCount(REPOS_PER_PAGE);
  };

  if (loading) return <p>Loading GitHub projects...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="github-projects">
      <h2>My GitHub Projects</h2>

      <div className="projects-grid">
        {visibleRepos.map((repo) => (
          <article className="project-card" key={repo.id}>
            <h3>{repo.name}</h3>

            <p>{repo.description || "No description available"}</p>

            <div className="project-meta">
              <span>{repo.language || "Other"}</span>
              <span>⭐ {repo.stargazers_count}</span>
              <span>⑂ {repo.forks_count}</span>
            </div>

            <div className="project-links">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </a>

              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {repos.length === 0 && (
        <p>No public repositories found.</p>
      )}

      <div className="repos-actions">
        {hasMore && (
          <button
            type="button"
            className="show-more-btn"
            onClick={handleShowMore}
          >
            Show More Repositories
            <span> ↓</span>
          </button>
        )}

        {isExpanded && (
          <button
            type="button"
            className="show-less-btn"
            onClick={handleShowLess}
          >
            Show Less ↑
          </button>
        )}
      </div>
    </section>
  );
}
