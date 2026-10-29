import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Github,
  GitFork,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Search,
  Star,
  Terminal,
  X,
} from "lucide-react";
import {
  featuredProjects,
  profile,
  experience,
  skillGroups,
  education,
  certifications,
} from "./data";
import "./styles.css";

const username = (
  import.meta.env.VITE_GITHUB_USERNAME || "sagarpatel0412"
).trim();
const isConfigured = Boolean(username && username !== "YOUR_GITHUB_USERNAME");
const githubUrl = isConfigured
  ? `https://github.com/${encodeURIComponent(username)}`
  : "https://github.com";
function safeLink(value) {
  return value || null;
}
function IconLink({ href, children, className = "" }) {
  return href ? (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : null;
}
function useGitHub() {
  const [state, setState] = useState({
    user: null,
    repos: [],
    loading: isConfigured,
    error: "",
  });
  useEffect(() => {
    if (!isConfigured) return;
    const controller = new AbortController();
    Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
        signal: controller.signal,
      }),
      fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&type=owner`,
        { signal: controller.signal },
      ),
    ])
      .then(async ([userRes, repoRes]) => {
        if (!userRes.ok || !repoRes.ok)
          throw new Error(
            userRes.status === 404
              ? "GitHub username not found."
              : "Could not load GitHub data. You may have hit the public API rate limit.",
          );
        const [user, repos] = await Promise.all([
          userRes.json(),
          repoRes.json(),
        ]);
        setState({
          user,
          repos: Array.isArray(repos) ? repos.filter((repo) => !repo.fork) : [],
          loading: false,
          error: "",
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError")
          setState((s) => ({ ...s, loading: false, error: err.message }));
      });
    return () => controller.abort();
  }, []);
  return state;
}
function ProjectArt({ theme, title, index }) {
  return (
    <div className={`project-art art-${theme}`} aria-hidden="true">
      <div className="art-orbit art-orbit-a" />
      <div className="art-orbit art-orbit-b" />
      <div className="art-glow" />
      <span className="art-index">0{index + 1} / SELECTED WORK</span>
      <div className="art-name">
        {title.split(" ").map((part, i) => (
          <span key={i}>{part}</span>
        ))}
      </div>
      <div className="art-corner">↗</div>
    </div>
  );
}
function App() {
  const { user, repos, loading, error } = useGitHub();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleRepoCount, setVisibleRepoCount] = useState(9);
  const categories = [
    "All",
    ...new Set(featuredProjects.map((p) => p.category)),
  ];
  const filtered = useMemo(
    () =>
      featuredProjects.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          `${p.title} ${p.description} ${p.stack.join(" ")}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [category, search],
  );
  const sortedRepos = useMemo(
    () =>
      [...repos].sort(
        (a, b) =>
          b.stargazers_count - a.stargazers_count ||
          new Date(b.updated_at) - new Date(a.updated_at),
      ),
    [repos],
  );
  return (
    <>
      <header className="nav-wrap">
        <nav className="nav shell">
          <a className="brand" href="#home">
            <span className="brand-mark">
              S<span>.</span>
            </span>
            <span>
              portfolio<span className="muted"> / dev</span>
            </span>
          </a>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a onClick={() => setMenuOpen(false)} href="#about">
              About
            </a>
            <a onClick={() => setMenuOpen(false)} href="#experience">
              Experience
            </a>
            <a onClick={() => setMenuOpen(false)} href="#skills">
              Skills
            </a>
            <a onClick={() => setMenuOpen(false)} href="#work">
              Projects
            </a>
            <a onClick={() => setMenuOpen(false)} href="#github">
              GitHub
            </a>
            <a onClick={() => setMenuOpen(false)} href="#contact">
              Contact
            </a>
          </div>
          <div className="nav-end">
            <IconLink href={githubUrl} className="nav-github">
              <Github size={17} /> GitHub <ArrowUpRight size={14} />
            </IconLink>
            <button
              className="menu-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
      </header>
      <main>
        <section id="home" className="hero shell">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="pulse" /> {profile.availability}{" "}
              <span className="slash">/</span> {profile.location}
            </div>
            <p className="intro">
              HEY, I'M {profile.name.toUpperCase()}{" "}
              <span className="wave">✳</span>
            </p>
            <h1>
              Building the <span className="gradient-text">web,</span>
              <br />
              one great idea
              <br />
              at a time<span className="period">.</span>
            </h1>
            <p className="hero-desc">{profile.summary}</p>
            <div className="hero-actions">
              <a href="#work" className="button primary">
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a href="#contact" className="button secondary">
                Let's connect <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-foot">
              <span>
                <ArrowDown size={17} /> SCROLL TO EXPLORE
              </span>
              <span>01 — 04</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Code editor inspired visual">
            <div className="orb orb-main" />
            <div className="orb orb-small" />
            <div className="code-card">
              <div className="window-bar">
                <span className="window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>about-me.tsx</span>
                <Code2 size={15} />
              </div>
              <div className="code-lines">
                <p>
                  <em>01</em>
                  <span className="purple">const</span>{" "}
                  <span className="blue">developer</span> = {"{"}
                </p>
                <p>
                  <em>02</em> &nbsp; name:{" "}
                  <span className="lime">'{profile.name}'</span>,
                </p>
                <p>
                  <em>03</em> &nbsp; focus:{" "}
                  <span className="lime">'Full Stack'</span>,
                </p>
                <p>
                  <em>04</em> &nbsp; loves: [
                </p>
                <p>
                  <em>05</em> &nbsp;&nbsp;{" "}
                  <span className="lime">'clean code'</span>,
                </p>
                <p>
                  <em>06</em> &nbsp;&nbsp;{" "}
                  <span className="lime">'great design'</span>
                </p>
                <p>
                  <em>07</em> &nbsp; ],
                </p>
                <p>
                  <em>08</em> &nbsp; coffee:{" "}
                  <span className="orange">true</span>
                </p>
                <p>
                  <em>09</em>
                  {"}"};
                </p>
              </div>
              <div className="code-footer">
                <span className="green-circle" /> All systems operational{" "}
                <span>UTF-8 / TSX</span>
              </div>
            </div>
            <div className="floating-chip chip-top">
              <span>✦</span> BUILD • SHIP • REPEAT
            </div>
            <div className="floating-chip chip-bottom">
              <Terminal size={15} /> available for collaboration
            </div>
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="shell">
            <div className="section-kicker">01 / WHO I AM</div>
            <div className="about-grid">
              <h2>
                I care about <span>the details.</span>
              </h2>
              <div>
                <p>
                  I'm a {profile.role.toLowerCase()} who enjoys the space where
                  engineering meets thoughtful design. I build experiences that
                  are maintainable under the hood and effortless on the surface.
                </p>
                <div className="skills">
                  {profile.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="experience" className="resume-section shell">
          <div className="section-kicker">02 / CAREER PATH</div>
          <h2>
            Where I’ve <span>worked.</span>
          </h2>
          <p className="resume-lede">
            Building dependable software, from frontend products to distributed
            backends.
          </p>
          <div className="timeline">
            {experience.map((job) => (
              <article className="timeline-item" key={job.company}>
                <div className="timeline-mark" />
                <div className="timeline-meta">
                  <span>{job.period}</span>
                  <small>{job.location}</small>
                </div>
                <div className="timeline-content">
                  <h3>{job.role}</h3>
                  <strong>{job.company}</strong>
                  <ul>
                    {job.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="skills" className="skill-section">
          <div className="shell">
            <div className="section-kicker">03 / MY TOOLKIT</div>
            <h2>
              Tools of <span>the trade.</span>
            </h2>
            <div className="skill-grid">
              {skillGroups.map((group) => (
                <article className="skill-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="skill-pills">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="work" className="work-section shell">
          <div className="section-top">
            <div>
              <div className="section-kicker">02 / THE GOOD STUFF</div>
              <h2>
                Selected <span>work.</span>
              </h2>
              <p>A few things I've built and enjoyed building.</p>
            </div>
            <span className="project-count">
              {String(filtered.length).padStart(2, "0")} PROJECTS
            </span>
          </div>
          <div className="work-controls">
            <div className="filters">
              {categories.map((c) => (
                <button
                  key={c}
                  className={category === c ? "active" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="searchbox">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
              />
            </label>
          </div>
          <div className="project-grid">
            {filtered.map((p, i) => (
              <article className="project-card" key={p.id}>
                <ProjectArt theme={p.theme} title={p.title} index={i} />
                <div className="project-body">
                  <div className="project-line">
                    <span>{p.eyebrow}</span>
                    <span>↗</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="stack">
                    {p.stack.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-actions">
                    {safeLink(p.demoUrl) && (
                      <IconLink href={p.demoUrl} className="project-link">
                        Live demo <ExternalLink size={14} />
                      </IconLink>
                    )}
                    {safeLink(p.githubUrl) && (
                      <IconLink href={p.githubUrl} className="project-link">
                        Source code <Github size={14} />
                      </IconLink>
                    )}
                    {!p.demoUrl && !p.githubUrl && (
                      <span className="private-note">
                        Case study / links coming soon
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && (
              <div className="empty">
                No projects match that search. Try another keyword.
              </div>
            )}
          </div>
        </section>
        <section id="github" className="github-section">
          <div className="shell">
            <div className="section-top">
              <div>
                <div className="section-kicker">03 / BEHIND THE SCENES</div>
                <h2>
                  Code speaks <span>louder.</span>
                </h2>
                <p>A live look at what I'm building in public.</p>
              </div>
              <IconLink href={githubUrl} className="outline-link">
                View GitHub <ArrowUpRight size={16} />
              </IconLink>
            </div>
            <div className="github-panel">
              <div className="gh-profile">
                <div className="gh-identity">
                  <div className="gh-avatar">
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={`${user.login} GitHub avatar`}
                      />
                    ) : (
                      <Github size={30} />
                    )}
                  </div>
                  <div>
                    <h3>
                      {user?.name ||
                        (isConfigured ? username : "Your GitHub profile")}
                    </h3>
                    <span className="gh-handle">
                      @{user?.login || (isConfigured ? username : "username")}
                    </span>
                    <div className="gh-location">
                      <MapPin size={13} /> {user?.location || profile.location}
                    </div>
                  </div>
                </div>
                <div className="gh-stats">
                  <div>
                    <strong>{user?.public_repos ?? "—"}</strong>
                    <span>Public repos</span>
                  </div>
                  <div>
                    <strong>{user?.followers ?? "—"}</strong>
                    <span>Followers</span>
                  </div>
                  <div>
                    <strong>
                      {repos.reduce((sum, r) => sum + r.stargazers_count, 0) ||
                        (user ? "0" : "—")}
                    </strong>
                    <span>Repo stars</span>
                  </div>
                </div>
              </div>
              <div className="gh-divider" />
              <div className="gh-repo-head">
                <h3>
                  <Github size={18} /> Public repositories
                </h3>
                <span>
                  {loading ? "SYNCING…" : `${repos.length} AVAILABLE`}
                </span>
              </div>
              {!isConfigured && (
                <div className="gh-message">
                  Add your GitHub username to <code>.env</code> as{" "}
                  <code>VITE_GITHUB_USERNAME=yourusername</code> to load real
                  stats and repositories.
                </div>
              )}
              {error && <div className="gh-message error">{error}</div>}
              {loading && (
                <div className="gh-message">
                  Fetching your public GitHub projects…
                </div>
              )}
              {!loading && !error && repos.length === 0 && isConfigured && (
                <div className="gh-message">
                  No public non-fork repositories found.
                </div>
              )}
              {sortedRepos.length > 0 && (
                <div className="repo-grid">
                  {sortedRepos.slice(0, visibleRepoCount).map((r) => (
                    <a
                      href={r.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="repo-card"
                      key={r.id}
                    >
                      <div className="repo-top">
                        <Github size={18} />
                        <ArrowUpRight size={15} />
                      </div>
                      <strong>{r.name}</strong>
                      <p>
                        {r.description || "Explore this repository on GitHub."}
                      </p>
                      <div className="repo-meta">
                        <span>
                          {r.language && (
                            <>
                              <i className="lang-dot" /> {r.language}
                            </>
                          )}
                        </span>
                        <span>
                          <Star size={13} /> {r.stargazers_count}
                        </span>
                        <span>
                          <GitFork size={13} /> {r.forks_count}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
              {sortedRepos.length > 3 && (
                <div className="repo-buttons">
                  {visibleRepoCount < sortedRepos.length && (
                    <button
                      className="more-repos"
                      onClick={() =>
                        setVisibleRepoCount((n) =>
                          Math.min(n + 3, sortedRepos.length),
                        )
                      }
                    >
                      Show 3 more repositories <ArrowRight size={16} />
                    </button>
                  )}
                  {visibleRepoCount > 3 && (
                    <button
                      className="more-repos more-repos-quiet"
                      onClick={() => setVisibleRepoCount(3)}
                    >
                      Show less ↑
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="github-disclaimer">
              Live public GitHub profile and repository data. Private
              repositories and the contribution heatmap are not included.
            </p>
          </div>
        </section>
        <section
          id="education"
          className="resume-section education-section shell"
        >
          <div className="section-kicker">06 / CONTINUOUS LEARNING</div>
          <h2>
            Always <span>learning.</span>
          </h2>
          <div className="education-grid">
            {education.map((item) => (
              <article className="education-card" key={item.school}>
                <span className="education-date">{item.period}</span>
                <h3>{item.school}</h3>
                <p>{item.program}</p>
                <small>{item.note}</small>
              </article>
            ))}
          </div>
          <h3 className="cert-heading">Certifications</h3>
          <div className="cert-list">
            {certifications.map((item) => (
              <article key={item.name}>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.issuer}</span>
                </div>
                <small>{item.date}</small>
              </article>
            ))}
          </div>
          {/* <a
            className="button secondary resume-download"
            href={profile.resumeUrl}
            download
          >
            Download my resume <ArrowDown size={17} />
          </a> */}
        </section>
        <section id="contact" className="contact shell">
          <div className="section-kicker">04 / SAY HELLO</div>
          <div className="contact-grid">
            <div>
              <h2>
                Have something
                <br />
                <span>in mind?</span>
              </h2>
              <p>
                Whether it's a product idea, a great opportunity, or just a
                hello — I'd love to hear from you.
              </p>
              <div className="contact-actions">
                {profile.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="button primary"
                  >
                    Get in touch <ArrowUpRight size={17} />
                  </a>
                ) : (
                  <IconLink
                    href={profile.linkedinUrl || githubUrl}
                    className="button primary"
                  >
                    Let's connect <ArrowUpRight size={17} />
                  </IconLink>
                )}
                {profile.resumeUrl && (
                  <IconLink
                    href={profile.resumeUrl}
                    className="button secondary"
                  >
                    View resume <ArrowUpRight size={17} />
                  </IconLink>
                )}
              </div>
            </div>
            <div className="contact-symbol">✳</div>
          </div>
        </section>
      </main>
      <footer>
        <div className="shell footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.name}. Crafted with purpose.
          </span>
          <div>
            <IconLink href={githubUrl}>
              <Github size={18} />
            </IconLink>
            {profile.linkedinUrl && (
              <IconLink href={profile.linkedinUrl}>
                <Linkedin size={18} />
              </IconLink>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} />
              </a>
            )}
          </div>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
