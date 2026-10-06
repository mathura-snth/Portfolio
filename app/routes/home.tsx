import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import EmbeddingVisualizer3D from "~/components/EmbeddingVisualizer3D";
import LossCurveTimeline from "~/components/LossCurveTimeline";
import "../styles/index.css";

// ============ ANIMATION VARIANTS ============
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ============ MAIN PAGE ============
export default function Index() {
  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar />
      <WhoAmI />
      <Skills />
      <EmbeddingVisualizer3D />
      <ResearchFocus />
      <LossCurveTimeline />
      <FeaturedProjects />
      <Footer />
    </motion.div>
  );
}

// ============ NAVIGATION BAR ============
function NavBar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-content">
        <motion.h1
          className="logo"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <a href="/">mathu.</a>
        </motion.h1>
        <ul className="nav-links">
          {["Research", "Projects"].map((item) => (
            <motion.li
              key={item}
              whileHover={{ color: "#4f7a64" }}
              transition={{ duration: 0.2 }}
            >
              <a href={`/#${item.toLowerCase()}`}>{item}</a>
            </motion.li>
          ))}
          <motion.li
            whileHover={{ color: "#4f7a64" }}
            transition={{ duration: 0.2 }}
          >
            <a href="/notes">Notes</a>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
}

// ============ WHO I AM SECTION ============
const WHO_STATS = [
  {
    value: "1st",
    label: "Class rank",
    detail:
      "Top of my Master 1 class, with a double degree in Math & CS behind it.",
  },
  {
    value: "5+",
    label: "Projects",
    detail:
      "Beyond coursework, I keep building: RAG, agentic AI, route optimization, distributed systems.",
  },
  {
    value: "Active",
    label: "Research",
    detail:
      "Researching LLM verification at LIPN. Looking for an internship leading to a CDI in data / AI.",
  },
];

// Entrée en CSS pur (keyframes slideInUp définies dans index.css)
const enter = (delay: number): React.CSSProperties => ({
  animation: "slideInUp 0.7s ease-out both",
  animationDelay: `${delay}s`,
});

function WhoAmI() {
  const [openStat, setOpenStat] = useState<number | null>(null);
  const last = WHO_STATS.length - 1;

  return (
    <section
      className="hero-section"
      style={{ minHeight: "auto", padding: "5rem 2rem" }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
        <div className="hero-content">
          <h2
            className="hero-title"
            style={{
              ...enter(0),
              textTransform: "uppercase",
              fontSize: "clamp(3rem, 9vw, 5.5rem)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            Who <span className="accent">I am</span>
          </h2>

          <p className="hero-subtitle" style={enter(0.1)}>
            M2 AI Student @ Université Sorbonne Paris Nord • Research Intern @
            LIPN • Building the future of Explainable AI
          </p>

          <p className="hero-description" style={enter(0.2)}>
            I'm passionate about understanding whether LLMs truly reason or just
            fabricate explanations. Currently working on CoVe (Counterfactual
            Verification) to detect hallucinated explanations at scale. Deep
            interest in formal methods, XAI, and making AI systems trustworthy.
          </p>

          <div
            className="stats"
            style={{
              ...enter(0.3),
              position: "relative",
              zIndex: 5,
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(0.5rem, 2vw, 1.5rem)",
            }}
          >
            {WHO_STATS.map((stat, i) => {
              const open = openStat === i;
              const middle = i > 0 && i < last;
              const side = i === 0 ? { left: 0 } : i === last ? { right: 0 } : { left: "50%" };

              return (
                <div
                  key={stat.label}
                  className="stat"
                  tabIndex={0}
                  aria-describedby={`stat-tip-${i}`}
                  onMouseEnter={() => setOpenStat(i)}
                  onMouseLeave={() => setOpenStat(null)}
                  onFocus={() => setOpenStat(i)}
                  onBlur={() => setOpenStat(null)}
                  style={{
                    position: "relative",
                    padding: "1.25rem 0.75rem",
                    cursor: "default",
                    transform: open ? "translateY(-3px)" : "none",
                    borderColor: open ? "var(--accent)" : undefined,
                    boxShadow: open
                      ? "0 8px 24px rgba(62, 90, 78, 0.15)"
                      : undefined,
                    transition:
                      "transform 0.2s, border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div
                    className="stat-value"
                    style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="stat-label">{stat.label}</div>

                  {/* Flèche */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-6px",
                      bottom: open ? "calc(100% + 6px)" : "calc(100% + 2px)",
                      width: "12px",
                      height: "12px",
                      background: "var(--accent-dark)",
                      transform: "rotate(45deg)",
                      opacity: open ? 1 : 0,
                      pointerEvents: "none",
                      transition: "opacity 0.2s, bottom 0.2s",
                    }}
                  />

                  {/* Infos au survol */}
                  <div
                    id={`stat-tip-${i}`}
                    role="tooltip"
                    style={{
                      position: "absolute",
                      ...side,
                      bottom: "calc(100% + 12px)",
                      width: "260px",
                      maxWidth: "calc(100vw - 4rem)",
                      padding: "0.75rem 1rem",
                      borderRadius: "0.6rem",
                      background: "var(--accent-dark)",
                      color: "#fff",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      textAlign: "left",
                      boxShadow: "0 8px 24px rgba(62, 90, 78, 0.25)",
                      opacity: open ? 1 : 0,
                      visibility: open ? "visible" : "hidden",
                      pointerEvents: "none",
                      transform: `${middle ? "translateX(-50%) " : ""}translateY(${open ? 0 : 6}px)`,
                      transition: "opacity 0.2s, transform 0.2s, visibility 0.2s",
                    }}
                  >
                    {stat.detail}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cta-buttons" style={enter(0.4)}>
            <a href="#projects" className="btn">
              View Work
            </a>
            <a href="mailto:mathura2609@gmail.com" className="btn btn-secondary">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SKILLS & EXPERTISE ============
function Skills() {
  const skillCategories = [
    {
      category: "Machine Learning",
      skills: ["PyTorch", "JAX", "Scikit-learn", "XGBoost", "Transformers"],
    },
    {
      category: "AI & XAI",
      skills: ["LLMs", "SHAP", "Attention Analysis", "Formal Verification", "Counterfactual Reasoning"],
    },
    {
      category: "Backend & Data",
      skills: ["FastAPI", "PostgreSQL", "LangChain", "RAG Systems", "Vector DBs"],
    },
    {
      category: "Languages",
      skills: ["Python", "TypeScript", "JavaScript", "SQL", "Rust"],
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold"
          >
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-lg border border-[var(--border)] bg-[var(--card-bg)]
                           hover:border-[var(--accent)] transition-colors"
              >
                <h3 className="text-lg font-bold text-[var(--accent)] mb-4">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 rounded-full bg-[rgba(107,166,132,0.2)]
                               text-[var(--accent-light)] text-sm font-semibold
                               border border-[var(--accent)]"
                      whileHover={{ scale: 1.08, backgroundColor: "rgba(107,166,132,0.35)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ RESEARCH FOCUS ============
function ResearchFocus() {
  return (
    <section id="research" className="py-20 px-4 bg-[rgba(45,74,63,0.2)]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold"
          >
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent">
              Research Focus
            </span>
          </motion.h2>

          <motion.div variants={itemVariants} className="space-y-6 text-[var(--text-secondary)]">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">
                CoVe: Counterfactual Verification
              </h3>
              <p className="text-lg leading-relaxed">
                A framework for detecting hallucinated explanations in Large Language Models at scale. By leveraging counterfactual reasoning and formal verification techniques, CoVe identifies when LLMs generate explanations that don't reflect their actual decision-making process.
              </p>
              <p className="text-base text-[var(--text-secondary)]">
                Currently being developed as part of my M2 research internship at LIPN (Laboratoire d'Informatique de l'Université Paris Nord).
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-xl font-semibold text-white">
                Core Research Interests
              </h3>
              <ul className="space-y-2 text-lg">
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">→</span>
                  <span><strong>Explainable AI (XAI)</strong> — Making model decisions transparent and verifiable</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">→</span>
                  <span><strong>Formal Methods</strong> — Rigorous verification of AI system properties</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">→</span>
                  <span><strong>Hallucination Detection</strong> — Identifying when LLMs fabricate information</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">→</span>
                  <span><strong>Trustworthy AI</strong> — Building AI systems that are safe, interpretable, and reliable</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FEATURED PROJECTS ============
interface Project {
  title: string;
  description: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "CoVe - LLM Explanation Verification",
    description: "Framework for verifying LLM explanations and detecting hallucinations at scale",
    tech: ["PyTorch", "XAI", "LLMs"],
  },
  {
    title: "DentaRAG",
    description: "Retrieval-Augmented Generation system for medical documentation",
    tech: ["LangChain", "FastAPI", "PostgreSQL"],
  },
  {
    title: "EducAid - Student Performance Prediction",
    description: "ML ensemble for predicting academic outcomes",
    tech: ["XGBoost", "CatBoost", "Python"],
  },
];

function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold"
          >
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-lg border border-[var(--border)] bg-[var(--card-bg)]
                           hover:border-[var(--accent)] transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-[var(--text-secondary)] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs font-medium
                               bg-[rgba(107,166,132,0.15)] text-[var(--accent-light)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Mathu</h3>
            <p>M2 AI Student • XAI Researcher • Building trustworthy AI systems</p>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li>
                <a
                  href="https://github.com/mathura-snth"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/mathura-santhalingam/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://scholar.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Scholar
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>
              <a href="mailto:mathura2609@gmail.com">mathura2609@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Mathura. Built with React & Framer Motion.</p>
        </div>
      </div>
    </motion.footer>
  );
}