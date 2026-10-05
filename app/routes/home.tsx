import { motion, type Variants } from "framer-motion";
import EmbeddingVisualizer3D from "~/components/EmbeddingVisualizer3D";
import LossCurveTimeline from "~/components/LossCurveTimeline";
import "../styles/index.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

// ... la suite de ton code (export default function Index...) reste exactement pareille !

export default function Index() {
  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* 3D Embedding Visualizer */}
      <EmbeddingVisualizer3D />

      {/* Loss Curve Timeline */}
      <LossCurveTimeline />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}

function NavBar() {
  return (
    <motion.nav className="navbar" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
      <div className="nav-content">
        <motion.h1 className="logo" whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
          <a href="/">mathu.</a>
        </motion.h1>
        <ul className="nav-links">
          {["About", "Projects", "Experience"].map((item) => (
            <motion.li key={item} whileHover={{ color: "#f5a623" }} transition={{ duration: 0.2 }}>
              <a href={`/#${item.toLowerCase()}`}>{item}</a>
            </motion.li>
          ))}
          {/* Nouveau lien vers la page de notes */}
          <motion.li whileHover={{ color: "#f5a623" }} transition={{ duration: 0.2 }}>
            <a href="/notes">Lecture notes</a>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section id="about" className="hero-section">
      <div className="container">
        <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 variants={itemVariants} className="hero-title">
            WHO <span className="accent">I AM</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            M2 AI Student @ Université Sorbonne Paris Nord • Research Intern @ LIPN • Building the future of Explainable AI
          </motion.p>

          <motion.p variants={itemVariants} className="hero-description">
            I'm passionate about understanding whether LLMs truly reason or just fabricates explanations. Currently working on
            CoVe (Counterfactual Verification) to detect hallucinated explanations at scale. Deep interest in formal methods,
            XAI, and making AI systems trustworthy.
          </motion.p>

          <motion.div variants={itemVariants} className="stats">
            {[
              { label: "Class rank", value: "1st" },
              { label: "Projects", value: "5+" },
              { label: "Research", value: "Active" },
            ].map((stat) => (
              <motion.div key={stat.label} className="stat" whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="cta-buttons">
            <motion.button className="btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              View Work
            </motion.button>
            <motion.button className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const projects = [
    {
      title: "CoVe - LLM Explanation Verification",
      category: "Research",
      description: "Framework for verifying whether LLM explanations reflect actual model behavior",
      tech: ["PyTorch", "XAI", "LLMs", "SHAP"],
      github: "https://github.com/mathu/cove",
    },
    {
      title: "DentaRAG",
      category: "RAG",
      description: "Retrieval-Augmented Generation system for dental documentation",
      tech: ["LangChain", "FastAPI", "PostgreSQL"],
      github: "https://github.com/mathu/dentarag",
    },
    {
      title: "EducAid - Student Performance Prediction",
      category: "ML",
      description: "XGBoost + CatBoost ensemble for predicting student performance (Hilckathon 2025)",
      tech: ["XGBoost", "CatBoost", "Python"],
      github: "https://github.com/mathu/educaid",
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Things I've built and shipped</p>
        </motion.div>

        <motion.div className="projects-grid" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      variants={itemVariants}
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(245, 166, 35, 0.15)" }}
      transition={{ duration: 0.3 }}
    >
      <span className="badge">{project.category}</span>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tech-stack">
        {project.tech.map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>
      <p className="github-link">View on GitHub →</p>
    </motion.a>
  );
}

function Footer() {
  return (
    <motion.footer className="footer" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Mathu</h3>
            <p>M1 AI Student exploring the future of Explainable AI</p>
          </div>

          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li>
                <a href="https://github.com/mathura-snth" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mathura-santhalingam/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">
                  Google Scholar
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>
              <a href="mailto:mathura.santhalingam@gmail.com">mathura.santhalingam@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Mathura. Built with React, Remix & Framer Motion.</p>
        </div>
      </div>
    </motion.footer>
  );
}
