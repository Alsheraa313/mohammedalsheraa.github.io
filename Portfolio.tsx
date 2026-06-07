import { useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  value: string;
  label: string;
}

interface ProjectCardProps {
  num: string;
  name: string;
  desc: string;
  stack: { label: string; color: "blue" | "purple" | "amber" }[];
}

interface SkillGroupProps {
  title: string;
  tags: string[];
}

interface ExpItemProps {
  company: string;
  date: string;
  location: string;
  type: string;
  role: string;
  bullets: string[];
}

// ── Hook: scroll reveal ────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 80);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── About: "What drives me" panel ─────────────────────────────────────────
const VALUES = [
  { icon: "⬡", label: "Systems Thinking", desc: "I care about how everything connects—APIs, queues, databases, UI—as one living system." },
  { icon: "◈", label: "Depth over breadth", desc: "I'd rather truly understand one problem than skim ten. I dig until I know why." },
  { icon: "◇", label: "Impact at scale", desc: "Code that reaches 120K+ families changes how I think about software responsibilities." },
  { icon: "◉", label: "Learning in public", desc: "Building real projects—not tutorials—is how I grow. Shipping beats theorizing." },
];

function ValueCard({ icon, label, desc }: { icon: string; label: string; desc: string }) {
  return (
    <div className="value-card">
      <span className="value-icon">{icon}</span>
      <div>
        <div className="value-label">{label}</div>
        <div className="value-desc">{desc}</div>
      </div>
    </div>
  );
}

// ── Skill group ────────────────────────────────────────────────────────────
function SkillGroup({ title, tags }: SkillGroupProps) {
  return (
    <div className="skill-group">
      <div className="skill-group-title">
        <span className="dot" />
        {title}
      </div>
      <div className="skill-tags">
        {tags.map((t) => (
          <span key={t} className="skill-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── Project card ───────────────────────────────────────────────────────────
function ProjectCard({ num, name, desc, stack }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-num">{num}</div>
      <div className="project-name">{name}</div>
      <div className="project-desc">{desc}</div>
      <div className="project-stack">
        {stack.map((s) => (
          <span key={s.label} className={`stack-pill ${s.color}`}>{s.label}</span>
        ))}
      </div>
    </div>
  );
}

// ── Experience item ────────────────────────────────────────────────────────
function ExpItem({ company, date, location, type, role, bullets }: ExpItemProps) {
  return (
    <div className="exp-item reveal">
      <div className="exp-meta">
        <div className="exp-company">{company}</div>
        <div className="exp-date">{date}</div>
        <div className="exp-location">{location}</div>
      </div>
      <div>
        <span className="exp-type">{type}</span>
        <div className="exp-role">{role}</div>
        <ul className="exp-bullets">
          {bullets.map((b, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Portfolio() {
  useReveal();

  return (
    <>
      <style>{CSS}</style>

      {/* Background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {/* Nav */}
      <nav>
        <a className="nav-logo" href="#hero">MA</a>
        <ul className="nav-links">
          {["about", "skills", "experience", "projects", "education", "contact"].map((s) => (
            <li key={s}><a href={`#${s}`}>{s}</a></li>
          ))}
        </ul>
      </nav>

      <div className="wrapper">

        {/* Hero */}
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <section id="hero">
            <div className="hero-eyebrow">Software Engineer &amp; Builder</div>
            <h1 className="hero-name">
              <span className="line-1">Mohammed</span>
              <span className="line-2">Alsheraa</span>
            </h1>
            <p className="hero-tagline">
              CS student at University of Michigan Dearborn crafting full-stack platforms,
              AI-powered systems, and scalable cloud architectures.
            </p>
            <div className="hero-cta">
              <a href="#projects" className="btn-primary">View my work ↓</a>
              <a href="mailto:Alsheraam@gmail.com" className="btn-ghost">Get in touch</a>
            </div>
          </section>
          <div className="hero-scroll">
            <div className="scroll-line" />
            Scroll
          </div>
        </div>

        {/* About */}
        <section id="about">
          <div className="section-label">01 — About</div>
          <h2 className="section-title reveal">A builder at heart.</h2>
          <div className="about-grid reveal">
            <div className="about-text">
              <p>
                I'm <strong>Mohammed Alsheraa</strong>, a Computer Science student at the University of Michigan
                Dearborn, expected to graduate in May 2027. I'm a US Citizen passionate about building software
                that solves real problems at scale.
              </p>
              <p>
                From full-stack social media apps to <strong>AI-powered semantic search systems</strong> and
                nonprofit logistics platforms, I love working across the entire stack — backend APIs, frontend
                UIs, cloud infrastructure, and machine learning pipelines.
              </p>
              <p>
                Currently interning at Eternal Light, where my work impacts <strong>120,000+ families</strong>{" "}
                through scalable web platforms.
              </p>
            </div>
            {/* Replaced stats with "What drives me" values panel */}
            <div className="about-values">
              <div className="values-header">What drives me</div>
              {VALUES.map((v) => (
                <ValueCard key={v.label} {...v} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <div id="skills" style={{ padding: "100px 0" }}>
          <div className="inner" style={{ padding: "0 60px" }}>
            <div className="section-label">02 — Technical Skills</div>
            <h2 className="section-title reveal">What I work with.</h2>
            <div className="skills-grid reveal">
              <SkillGroup title="Languages" tags={["Python","TypeScript","JavaScript","Java","C++","C#","SQL","PHP","HTML/CSS"]} />
              <SkillGroup title="Frameworks & Libraries" tags={["React","NestJS","FastAPI","Flask","Angular","Tailwind CSS","Prisma","LangChain","TanStack","Zustand"]} />
              <SkillGroup title="AI / ML" tags={["Azure OpenAI","HuggingFace","SentenceTransformer","TensorFlow","PyTorch","XGBoost","spaCy","NLTK","DistilBERT"]} />
              <SkillGroup title="Databases & Cloud" tags={["PostgreSQL","Redis","Firebase","Oracle","AWS EC2","Databricks","Azure DevOps","S3"]} />
              <SkillGroup title="Dev Tools" tags={["Git","Docker","GraphQL","REST APIs","JWT Auth","Jupyter","NGINX","Power BI"]} />
            </div>
          </div>
        </div>

        {/* Experience */}
        <section id="experience" style={{ paddingLeft: 80 }}>
          <div className="section-label">03 — Experience</div>
          <h2 className="section-title reveal">Where I've built.</h2>
          <ExpItem
            company="Eternal Light"
            date="Aug 2025 – Present"
            location="Dearborn, MI"
            type="Internship"
            role="Software Engineering Intern"
            bullets={[
              'Built a <strong>distribution management system</strong> using Flask and React, optimizing logistics and tracking for 5,000+ tons of food.',
              'Implemented <strong>secure authentication workflows</strong> leveraging Firebase and OAuth, improving platform security and user accessibility.',
              'Deployed scalable web platforms using <strong>AWS EC2 and NGINX</strong>, expanding digital outreach to 120,000+ families.',
              'Refactored legacy applications into <strong>microservices</strong>, improving maintainability, scalability, and deployment efficiency.',
            ]}
          />
        </section>

        {/* Projects */}
        <section id="projects">
          <div className="section-label">04 — Projects</div>
          <h2 className="section-title reveal">Things I've built.</h2>
          <div className="projects-grid reveal">
            <ProjectCard
              num="PROJECT / 01"
              name="Wavely"
              desc="A full-stack social media application with secure authentication, hashed credentials, and backend validation via NestJS. Optimized React 18 rendering reduced page load time by ~35% (~300ms)."
              stack={[
                { label: "NestJS", color: "blue" },
                { label: "React 18", color: "blue" },
                { label: "PostgreSQL", color: "purple" },
                { label: "Redis", color: "purple" },
                { label: "Prisma", color: "amber" },
                { label: "Zustand", color: "amber" },
                { label: "S3", color: "blue" },
              ]}
            />
            <ProjectCard
              num="PROJECT / 02"
              name="Locket.AI"
              desc="An AI-powered semantic search system combining SentenceTransformer embeddings, TF-IDF, and fuzzy matching across 40+ REST endpoints. Offline-first architecture with Docker containerization and zero external dependencies."
              stack={[
                { label: "FastAPI", color: "blue" },
                { label: "SentenceTransformer", color: "amber" },
                { label: "PostgreSQL", color: "purple" },
                { label: "Docker", color: "blue" },
                { label: "JWT Auth", color: "purple" },
                { label: "React", color: "blue" },
              ]}
            />
            <ProjectCard
              num="PROJECT / 03"
              name="AI Bias Detection System"
              desc="Full-stack bias detection platform identifying 6 categories of textual bias via transformer-based NLP. Severity classification pipeline combines DistilBERT embeddings, curated lexicons, and regex pattern matching to detect subtle coded language and implicit stereotypes."
              stack={[
                { label: "FastAPI", color: "blue" },
                { label: "DistilBERT", color: "amber" },
                { label: "spaCy", color: "purple" },
                { label: "NLTK", color: "purple" },
                { label: "React", color: "blue" },
                { label: "Tailwind CSS", color: "amber" },
              ]}
            />
            <ProjectCard
              num="PROJECT / 04"
              name="DriveShare"
              desc="A peer-to-peer car rental platform delivering core features — listing, search, booking, payments, and messaging — across a 12-page SPA. Secured with JWT + bcrypt authentication with role-based access between car owners and renters."
              stack={[
                { label: "React 18", color: "blue" },
                { label: "NestJS", color: "blue" },
                { label: "PostgreSQL", color: "purple" },
                { label: "shadcn/ui", color: "amber" },
                { label: "Zustand", color: "purple" },
                { label: "JWT", color: "amber" },
              ]}
            />
          </div>
        </section>

        {/* Education */}
        <section id="education">
          <div className="section-label">05 — Education</div>
          <h2 className="section-title reveal">Academic background.</h2>
          <div className="edu-card reveal">
            <div>
              <div className="edu-school">University of Michigan Dearborn</div>
              <div className="edu-degree">Bachelor of Science in Computer Science</div>
              <div className="edu-courses">
                {["Data Structures & Algorithms", "Database Systems", "Java Programming"].map((c) => (
                  <span key={c} className="edu-course">{c}</span>
                ))}
              </div>
            </div>
            <div className="edu-badge">
              <div className="edu-year">May 2027</div>
              <div className="edu-status">In Progress</div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="section-label" style={{ justifyContent: "center" }}>06 — Contact</div>
          <h2 className="section-title reveal">Let's connect.</h2>
          <p className="contact-sub reveal">
            I'm open to internships, collaborations, and interesting projects. Feel free to reach out.
          </p>
          <div className="contact-links reveal">
            <a href="mailto:Alsheraam@gmail.com" className="contact-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
              Alsheraam@gmail.com
            </a>
            <a href="https://linkedin.com/in/mohammedalsheraa" target="_blank" rel="noreferrer" className="contact-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/mohammedalsheraa" target="_blank" rel="noreferrer" className="contact-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer>
        <span>© 2026 Mohammed Alsheraa</span>
        <span>Built with React + TypeScript</span>
      </footer>
    </>
  );
}

// ── Styles (inlined for portability) ──────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    /* ── New palette: deep slate + warm sage + soft gold ── */
    --bg:       #0c0d10;
    --surface:  #141519;
    --surface2: #1c1e25;
    --border:   rgba(255,255,255,0.07);

    --accent:   #8fb8a8;   /* sage green — replaces harsh cyan */
    --accent2:  #5c7fa3;   /* slate blue */
    --accent3:  #c9a96e;   /* warm gold */

    --text:     #e4e4ec;
    --muted:    #6a6a82;

    --font-display: 'Syne', sans-serif;
    --font-body:    'DM Sans', sans-serif;
    --font-mono:    'DM Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* noise overlay */
  body::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999; opacity: 0.35;
  }

  /* blobs */
  .bg-blob { position: fixed; border-radius: 50%; filter: blur(130px); pointer-events: none; z-index: 0; }
  .blob-1 { width: 600px; height: 600px; background: rgba(143,184,168,0.05); top: -200px; right: -200px; }
  .blob-2 { width: 500px; height: 500px; background: rgba(92,127,163,0.06); bottom: 20%; left: -150px; }
  .blob-3 { width: 400px; height: 400px; background: rgba(201,169,110,0.04); top: 40%; right: 10%; }

  /* nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 60px;
    background: rgba(12,13,16,0.82); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--font-display); font-weight: 800; font-size: 1.1rem;
    color: var(--accent); letter-spacing: -0.02em; text-decoration: none;
  }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-family: var(--font-mono); font-size: 0.78rem; color: var(--muted);
    text-decoration: none; letter-spacing: 0.08em; text-transform: uppercase; transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--accent); }

  .wrapper { position: relative; z-index: 1; }

  /* hero */
  #hero {
    min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
    padding: 120px 60px 80px; max-width: 1100px; margin: 0 auto;
  }
  .hero-eyebrow {
    font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent);
    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 28px;
    display: flex; align-items: center; gap: 12px;
    opacity: 0; animation: fadeUp 0.8s 0.1s forwards;
  }
  .hero-eyebrow::before { content: ''; width: 40px; height: 1px; background: var(--accent); }
  h1.hero-name {
    font-family: var(--font-display); font-size: clamp(3.5rem, 9vw, 7.5rem);
    font-weight: 800; line-height: 0.92; letter-spacing: -0.04em; margin-bottom: 28px;
    opacity: 0; animation: fadeUp 0.8s 0.25s forwards;
  }
  .hero-name .line-1 { display: block; color: var(--text); }
  .hero-name .line-2 { display: block; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.12); }
  .hero-tagline {
    font-size: 1.15rem; color: var(--muted); max-width: 520px;
    line-height: 1.7; margin-bottom: 48px; font-weight: 300;
    opacity: 0; animation: fadeUp 0.8s 0.4s forwards;
  }
  .hero-cta { display: flex; gap: 16px; flex-wrap: wrap; opacity: 0; animation: fadeUp 0.8s 0.55s forwards; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px;
    background: var(--accent); color: #0c0d10;
    font-family: var(--font-display); font-weight: 700; font-size: 0.9rem;
    letter-spacing: 0.02em; text-decoration: none; border-radius: 4px; transition: all 0.2s;
  }
  .btn-primary:hover { filter: brightness(1.1); transform: translateY(-2px); }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px;
    background: transparent; color: var(--text);
    font-family: var(--font-display); font-weight: 600; font-size: 0.9rem;
    text-decoration: none; border: 1px solid var(--border); border-radius: 4px; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }
  .hero-scroll {
    position: absolute; bottom: 48px; left: 60px;
    display: flex; align-items: center; gap: 12px;
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted);
    letter-spacing: 0.15em; text-transform: uppercase;
    opacity: 0; animation: fadeUp 0.8s 1s forwards;
  }
  .scroll-line {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, var(--accent), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }

  /* sections */
  section { padding: 100px 60px; max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent);
    letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .section-label::after { content:''; flex:1; height:1px; background: var(--border); max-width:60px; }
  h2.section-title {
    font-family: var(--font-display); font-size: clamp(2rem,4vw,3rem);
    font-weight: 800; letter-spacing: -0.03em; margin-bottom: 60px; line-height: 1.1;
  }

  /* ── About: two-column grid ── */
  #about .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  .about-text p { color: var(--muted); font-size: 1.05rem; line-height: 1.8; margin-bottom: 20px; font-weight: 300; }
  .about-text p strong { color: var(--text); font-weight: 500; }

  /* ── Values panel (replaces stat cards) ── */
  .about-values {
    display: flex; flex-direction: column; gap: 2px;
  }
  .values-header {
    font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent);
    letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .values-header::before { content:''; width:24px; height:1px; background: var(--accent); }

  .value-card {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 18px 20px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    transition: border-color 0.25s, background 0.25s;
    margin-bottom: 8px;
  }
  .value-card:hover { border-color: rgba(143,184,168,0.35); background: var(--surface2); }
  .value-icon {
    font-size: 1.1rem; color: var(--accent); flex-shrink: 0;
    margin-top: 2px; line-height: 1;
  }
  .value-label {
    font-family: var(--font-display); font-weight: 700; font-size: 0.88rem;
    color: var(--text); margin-bottom: 4px; letter-spacing: -0.01em;
  }
  .value-desc { font-size: 0.8rem; color: var(--muted); line-height: 1.55; font-weight: 300; }

  /* skills */
  #skills { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); max-width: 100%; }
  #skills .inner { max-width: 1100px; margin: 0 auto; }
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
  .skill-group {
    background: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 28px;
    transition: border-color 0.3s, transform 0.3s;
  }
  .skill-group:hover { border-color: rgba(143,184,168,0.3); transform: translateY(-4px); }
  .skill-group-title {
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent);
    letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 16px;
    display: flex; align-items: center; gap: 8px;
  }
  .skill-group-title .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag {
    background: var(--surface2); color: var(--text);
    font-family: var(--font-mono); font-size: 0.72rem;
    padding: 5px 12px; border-radius: 3px; border: 1px solid var(--border); transition: all 0.2s;
  }
  .skill-tag:hover { background: rgba(143,184,168,0.1); border-color: var(--accent); color: var(--accent); }

  /* experience */
  .exp-item {
    display: grid; grid-template-columns: 1fr 3fr; gap: 40px;
    padding: 40px 0; border-bottom: 1px solid var(--border); position: relative;
  }
  .exp-item::before {
    content: ''; position: absolute; left: -60px; top: 50px;
    width: 8px; height: 8px; background: var(--accent); border-radius: 50%;
    box-shadow: 0 0 12px var(--accent);
  }
  .exp-meta { padding-top: 4px; }
  .exp-company { font-family: var(--font-display); font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 4px; }
  .exp-date { font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); letter-spacing: 0.08em; }
  .exp-location { font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); margin-top: 4px; }
  .exp-role { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; margin-bottom: 20px; color: var(--text); }
  .exp-type {
    display: inline-block; font-family: var(--font-mono); font-size: 0.65rem;
    letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 10px;
    background: rgba(143,184,168,0.1); color: var(--accent); border-radius: 3px; margin-bottom: 20px;
  }
  .exp-bullets { list-style: none; }
  .exp-bullets li {
    position: relative; padding-left: 20px; margin-bottom: 12px;
    color: var(--muted); font-size: 0.95rem; line-height: 1.7; font-weight: 300;
  }
  .exp-bullets li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-size: 0.8rem; }
  .exp-bullets li strong { color: var(--text); font-weight: 500; }

  /* projects */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px,1fr)); gap: 24px; }
  .project-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 32px;
    position: relative; overflow: hidden; transition: border-color 0.3s, transform 0.3s;
    display: flex; flex-direction: column;
  }
  .project-card::before {
    content: ''; position: absolute; top:0; left:0; right:0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
  }
  .project-card:hover { border-color: rgba(143,184,168,0.25); transform: translateY(-6px); }
  .project-card:hover::before { transform: scaleX(1); }
  .project-num { font-family: var(--font-mono); font-size: 0.65rem; color: var(--muted); letter-spacing: 0.15em; margin-bottom: 16px; }
  .project-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; margin-bottom: 12px; color: var(--text); }
  .project-desc { font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 24px; font-weight: 300; flex: 1; }
  .project-stack { display: flex; flex-wrap: wrap; gap: 6px; }
  .stack-pill { font-family: var(--font-mono); font-size: 0.65rem; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.05em; }
  .stack-pill.blue   { background: rgba(143,184,168,0.08); color: var(--accent); }
  .stack-pill.purple { background: rgba(92,127,163,0.1);   color: #7faad0; }
  .stack-pill.amber  { background: rgba(201,169,110,0.08); color: var(--accent3); }

  /* education */
  #education .edu-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 40px;
    display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: start; transition: border-color 0.3s;
  }
  #education .edu-card:hover { border-color: rgba(143,184,168,0.3); }
  .edu-school { font-family: var(--font-display); font-size: 1.4rem; font-weight: 800; margin-bottom: 8px; }
  .edu-degree { color: var(--muted); font-size: 0.95rem; margin-bottom: 16px; font-weight: 300; }
  .edu-courses { display: flex; flex-wrap: wrap; gap: 8px; }
  .edu-course {
    font-family: var(--font-mono); font-size: 0.68rem; padding: 4px 12px; border-radius: 3px;
    background: var(--surface2); color: var(--muted); border: 1px solid var(--border);
  }
  .edu-badge { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
  .edu-year { font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); letter-spacing: 0.1em; }
  .edu-status {
    background: rgba(143,184,168,0.1); color: var(--accent);
    font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em;
    text-transform: uppercase; padding: 4px 12px; border-radius: 20px;
  }

  /* contact */
  #contact { text-align: center; padding-bottom: 120px; }
  .contact-sub { font-size: 1.05rem; color: var(--muted); max-width: 480px; margin: 0 auto 40px; font-weight: 300; line-height: 1.7; }
  .contact-links { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
  .contact-link {
    display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px;
    border: 1px solid var(--border); border-radius: 6px; text-decoration: none;
    color: var(--text); font-family: var(--font-mono); font-size: 0.78rem;
    letter-spacing: 0.08em; transition: all 0.2s; background: var(--surface);
  }
  .contact-link:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px); }
  .contact-link svg { width: 16px; height: 16px; }

  /* footer */
  footer {
    border-top: 1px solid var(--border); padding: 28px 60px;
    display: flex; justify-content: space-between; align-items: center;
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted);
  }

  /* animations */
  @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  .reveal { opacity:0; transform:translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }

  /* responsive */
  @media (max-width: 768px) {
    nav { padding: 16px 24px; }
    .nav-links { gap: 20px; }
    section, #hero { padding: 80px 24px; }
    #hero { padding-top: 100px; }
    #about .about-grid { grid-template-columns: 1fr; }
    .exp-item { grid-template-columns: 1fr; gap: 12px; }
    .exp-item::before { display: none; }
    .projects-grid { grid-template-columns: 1fr; }
    #education .edu-card { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 10px; text-align: center; }
  }
`;
