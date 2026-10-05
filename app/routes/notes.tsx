import { useState } from "react";

interface Note {
  id: string;
  title: string;
  category: string;
  path: string;
}

const NOTES: Note[] = [
  {
    id: "advanced-data-structures",
    title: "Advanced Data Structures",
    category: "CS",
    path: "/pdfs/Advanced-Data-Structures.pdf",
  },
  {
    id: "computability-complexity",
    title: "Computability & Complexity",
    category: "Theory",
    path: "/pdfs/Computability-Complexity.pdf",
  },
  {
    id: "distributed-systems",
    title: "Distributed Systems",
    category: "Systems",
    path: "/pdfs/Distributed-Systems.pdf",
  },
  {
    id: "sql-databases",
    title: "SQL & Relational Databases",
    category: "Databases",
    path: "/pdfs/Exercices-SQL-Relational-Databases.pdf",
  },
  {
    id: "lambda-calculus",
    title: "Lambda Calculus & Type Systems",
    category: "Theory",
    path: "/pdfs/Lambda-Calculus-Type-Systems.pdf",
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra",
    category: "Math",
    path: "/pdfs/Linear-Abstract-Algebra.pdf",
  },
  {
    id: "math-analysis",
    title: "Mathematical Analysis",
    category: "Math",
    path: "/pdfs/Mathematical-Analysis.pdf",
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    category: "AI",
    path: "/pdfs/NPL.pdf",
  },
  {
    id: "software-architecture",
    title: "Software Architecture & Docker",
    category: "DevOps",
    path: "/pdfs/Software-Architecture-Docker.pdf",
  },
  {
    id: "topology",
    title: "Topology",
    category: "Math",
    path: "/pdfs/Topology.pdf",
  },
];

function filterButtonStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? "var(--accent-dark)" : "transparent",
    color: active ? "#fff" : "var(--accent-dark)",
    padding: "0.75rem 1.5rem",
    border: "1px solid var(--accent-dark)",
    borderRadius: "0.5rem",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.3s",
  };
}

export default function Notes() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(NOTES.map((n) => n.category)));
  const filteredNotes = selectedCategory
    ? NOTES.filter((n) => n.category === selectedCategory)
    : NOTES;

  return (
    <div style={{ padding: "4rem 2rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <a
          href="/"
          style={{
            display: "inline-block",
            color: "var(--accent-text)",
            fontWeight: 600,
            marginBottom: "1.5rem",
          }}
        >
          ← Back to portfolio
        </a>

        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "0.5rem",
            background:
              "linear-gradient(135deg, var(--accent-dark) 0%, var(--accent-text) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Study Notes
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            marginBottom: "2rem",
          }}
        >
          My comprehensive study materials from M1 AI and related coursework
        </p>

        {/* Category Filter */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            style={filterButtonStyle(selectedCategory === null)}
          >
            All ({NOTES.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={filterButtonStyle(selectedCategory === cat)}
            >
              {cat} ({NOTES.filter((n) => n.category === cat).length})
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredNotes.map((note) => (
            <a
              key={note.id}
              href={note.path}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 2px 10px rgba(62, 90, 78, 0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--accent)";
                el.style.boxShadow = "0 8px 24px rgba(62, 90, 78, 0.15)";
                el.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "0 2px 10px rgba(62, 90, 78, 0.06)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "1rem",
                  color: "var(--accent-dark)",
                }}
              >
                📄
              </div>
              <h3
                style={{
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                  fontSize: "1.1rem",
                }}
              >
                {note.title}
              </h3>
              <span
                style={{
                  display: "inline-block",
                  background: "rgb(var(--accent-rgb) / 0.25)",
                  color: "var(--accent-dark)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "1rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  marginTop: "auto",
                  width: "fit-content",
                }}
              >
                {note.category}
              </span>
              <p
                style={{
                  color: "var(--accent-text)",
                  fontSize: "0.9rem",
                  marginTop: "1rem",
                }}
              >
                View PDF →
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}