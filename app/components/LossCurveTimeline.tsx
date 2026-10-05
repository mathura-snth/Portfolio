import { useState } from "react";
import { motion } from "framer-motion";

interface EpochData {
  epoch: number;
  label: string;
  loss: number;
  timestamp: string;
  description: string;
  achievements: string[];
}

const EPOCHS_DATA: EpochData[] = [
  {
    epoch: 1,
    label: "Math & CS Double Degree",
    loss: 0.85,
    timestamp: "2022 - 2025",
    description:
      "Double Licence in Mathematics and Computer Science at Institut Galilée, Université Sorbonne Paris Nord",
    achievements: [
      "Double Licence Mathématiques & Informatique",
      "Algorithms and data structures",
      "Mathematical foundations (algebra, analysis)",
      "Institut Galilée, USPN",
    ],
  },
  {
    epoch: 2,
    label: "Research Internship - Algorithmics",
    loss: 0.55,
    timestamp: "May - June 2025",
    description:
      "First research experience at LIPN (Laboratoire d'Informatique de Paris Nord) on combinatorial optimization",
    achievements: [
      "Constraint Satisfaction Problems (CSP)",
      "Orthogonal Arrays modelling & optimization",
      "Hadamard matrices",
      "Cryptography applications",
    ],
  },
  {
    epoch: 3,
    label: "Master 1 Computer Science",
    loss: 0.38,
    timestamp: "2025 - 2026",
    description:
      "First year of the Master's in Computer Science at Institut Galilée, USPN",
    achievements: [
      "Major of the class",
      "NLP movie search engine (Flask, Docker)",
      "Route planning engine on real OSM data",
    ],
  },
  {
    epoch: 4,
    label: "Research Internship - AI & XAI",
    loss: 0.24,
    timestamp: "June 2026 - Present",
    description:
      "Research at LIPN on explainability and verification of LLMs: CoVe, Chain-of-Verification",
    achievements: [
      "Explainable AI (XAI)",
      "LLM benchmark design",
      "Hallucination diagnosis",
      "Iterative self-verification, explanation faithfulness",
    ],
  },
  {
    epoch: 5,
    label: "Master 2 Computer Science",
    loss: 0.12,
    timestamp: "2026 - Present",
    description:
      "Second year of the Master's, specializing in machine learning and data science",
    achievements: [
      "Statistical Learning",
      "Deep Learning",
      "Multidimensional Exploratory Statistics",
      "Data Mining",
    ],
  },
];

interface PathSegment {
  x: number;
  y: number;
}

function generateCurvePath(
  epochs: EpochData[],
  width: number,
  height: number
): PathSegment[] {
  const padding = 80;
  const maxEpoch = epochs.length;
  const minLoss = 0;
  const maxLoss = 1;

  return epochs.map((epoch) => {
    const x =
      padding + ((epoch.epoch - 1) / (maxEpoch - 1)) * (width - 2 * padding);
    const y =
      height -
      padding -
      ((epoch.loss - minLoss) / (maxLoss - minLoss)) * (height - 2 * padding);
    return { x, y };
  });
}

function createSmoothPath(points: PathSegment[]): string {
  if (points.length < 2) return "";

  // Catmull-Rom spline interpolation
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[0];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || points[points.length - 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}

export default function LossCurveTimeline() {
  const [expandedEpoch, setExpandedEpoch] = useState<number | null>(null);

  const svgWidth = 900;
  const svgHeight = 500;
  const padding = 80;

  const pathSegments = generateCurvePath(EPOCHS_DATA, svgWidth, svgHeight);
  const smoothPath = createSmoothPath(pathSegments);

  return (
    <motion.div
      className="loss-curve-container"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="timeline-header">
        <h2 className="section-title">My Learning Journey</h2>
        <p className="section-subtitle">
          Training convergence over epochs - Watch the loss decrease as I grow
        </p>
      </div>

      <div className="svg-wrapper">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="loss-curve-svg">
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((loss) => (
            <g key={`grid-${loss}`}>
              <line
                x1={padding}
                y1={svgHeight - padding - loss * (svgHeight - 2 * padding)}
                x2={svgWidth - padding}
                y2={svgHeight - padding - loss * (svgHeight - 2 * padding)}
                stroke="var(--border)"
                strokeDasharray="4"
                opacity="0.8"
              />
              <text
                x={padding - 10}
                y={svgHeight - padding - loss * (svgHeight - 2 * padding) + 5}
                textAnchor="end"
                fontSize="12"
                fill="var(--text-secondary)"
              >
                {loss.toFixed(1)}
              </text>
            </g>
          ))}

          {/* X-axis */}
          <line
            x1={padding}
            y1={svgHeight - padding}
            x2={svgWidth - padding}
            y2={svgHeight - padding}
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={svgHeight - padding}
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Axis labels */}
          <text
            x={svgWidth / 2}
            y={svgHeight - 20}
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="14"
          >
            Epochs
          </text>
          <text
            x={30}
            y={svgHeight / 2}
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize="14"
            transform={`rotate(-90 30 ${svgHeight / 2})`}
          >
            Loss
          </text>

          {/* Glow effect */}
          <path
            d={smoothPath}
            stroke="var(--accent)"
            strokeWidth="10"
            fill="none"
            opacity="0.3"
            style={{ filter: "blur(4px)" }}
          />

          {/* Main curve */}
          <motion.path
            d={smoothPath}
            stroke="var(--accent-text)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />

          {/* Data points with stagger animation */}
          {pathSegments.map((point, index) => (
            <motion.g
              key={`point-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.4,
              }}
              viewport={{ once: true }}
              style={{ transformOrigin: `${point.x}px ${point.y}px` }}
            >
              {/* Glow circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="var(--accent)"
                opacity="0.3"
              />

              {/* Main circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="var(--accent-text)"
                stroke="var(--surface)"
                strokeWidth="2"
                className="data-point"
              />
            </motion.g>
          ))}

          {/* Epoch labels */}
          {pathSegments.map((point, index) => (
            <motion.text
              key={`label-${index}`}
              x={point.x}
              y={svgHeight - padding + 40}
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-secondary)"
              className="epoch-label"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.4,
              }}
              viewport={{ once: true }}
            >
              Epoch {index + 1}
            </motion.text>
          ))}
        </svg>
      </div>

      {/* Epoch details */}
      <div className="epochs-details">
        <div className="epochs-grid">
          {EPOCHS_DATA.map((epoch) => (
            <motion.div
              key={epoch.epoch}
              className={`epoch-card ${
                expandedEpoch === epoch.epoch ? "expanded" : ""
              }`}
              onClick={() =>
                setExpandedEpoch(
                  expandedEpoch === epoch.epoch ? null : epoch.epoch
                )
              }
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="epoch-header">
                <span className="epoch-number">Epoch {epoch.epoch}</span>
                <h3>{epoch.label}</h3>
              </div>

              <p className="epoch-timestamp">{epoch.timestamp}</p>
              <p className="epoch-description">{epoch.description}</p>

              <motion.div
                className="achievements"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: expandedEpoch === epoch.epoch ? 1 : 0,
                  height: expandedEpoch === epoch.epoch ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <h4>Key Achievements:</h4>
                <ul>
                  {epoch.achievements.map((achievement, i) => (
                    <li key={i}>✓ {achievement}</li>
                  ))}
                </ul>
              </motion.div>

              <div className="loss-badge">Loss: {epoch.loss.toFixed(2)}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .loss-curve-container {
          width: 100%;
          padding: 3rem 2rem;
          background: rgb(var(--surface-rgb) / 0.6);
          border: 1px solid var(--border);
          border-radius: 1rem;
          margin-bottom: 3rem;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .svg-wrapper {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 2rem;
          margin-bottom: 2rem;
          overflow-x: auto;
          box-shadow: 0 2px 10px rgba(62, 90, 78, 0.06);
        }

        .loss-curve-svg {
          width: 100%;
          max-width: 100%;
          height: auto;
        }

        .data-point {
          cursor: pointer;
          transition: all 0.3s;
        }

        .data-point:hover {
          r: 8;
          filter: drop-shadow(0 0 8px rgb(var(--accent-rgb) / 0.8));
        }

        .epochs-details {
          margin-top: 2rem;
        }

        .epochs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .epoch-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          box-shadow: 0 2px 10px rgba(62, 90, 78, 0.06);
        }

        .epoch-card:hover {
          border-color: var(--accent);
          box-shadow: 0 8px 24px rgba(62, 90, 78, 0.12);
        }

        .epoch-card.expanded {
          border-color: var(--accent-text);
          box-shadow: 0 12px 32px rgba(62, 90, 78, 0.18);
        }

        .epoch-header {
          margin-bottom: 1rem;
        }

        .epoch-number {
          display: inline-block;
          background: rgb(var(--accent-rgb) / 0.25);
          color: var(--accent-dark);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .epoch-card h3 {
          color: var(--text-primary);
          margin: 0;
          font-size: 1.2rem;
        }

        .epoch-timestamp {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin: 0.5rem 0;
        }

        .epoch-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 1rem 0;
        }

        .achievements {
          overflow: hidden;
        }

        .achievements h4 {
          color: var(--accent-dark);
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
          margin-top: 1rem;
        }

        .achievements ul {
          list-style: none;
          padding: 0;
        }

        .achievements li {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
        }

        .loss-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgb(var(--accent-rgb) / 0.25);
          color: var(--accent-dark);
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.85rem;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .loss-curve-container {
            padding: 2rem 1rem;
          }

          .svg-wrapper {
            padding: 1rem;
          }

          .epochs-grid {
            grid-template-columns: 1fr;
          }
        }
      `,
        }}
      />
    </motion.div>
  );
}