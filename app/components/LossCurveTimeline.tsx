import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SVGProps } from "react";

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
    label: "B.Tech - VIT",
    loss: 0.85,
    timestamp: "Sept 2021 - Apr 2025",
    description:
      "Electronics & Communication Engineering with focus on embedded systems and AI applications",
    achievements: [
      "GPA: 9.1/10",
      "Co-Founded SESI VIT (100+ members)",
      "Published IEEE paper on IoT",
      "Sustainable energy projects",
    ],
  },
  {
    epoch: 2,
    label: "M1 AI - Paris-Saclay",
    loss: 0.45,
    timestamp: "Sept 2025 - Aug 2026",
    description:
      "Master's in Artificial Intelligence with emphasis on Deep Learning and Formal Methods",
    achievements: [
      "France Excellence Charpak Scholar",
      "Honorable Mention at Hilckathon 2025",
      "GPA: 15.82/20",
      "Top 6 teams representing France",
    ],
  },
  {
    epoch: 3,
    label: "Research Intern - LIPN",
    loss: 0.15,
    timestamp: "Current",
    description:
      "Working on CoVe: Counterfactual Verification of LLM Explanations",
    achievements: [
      "XAI & LLM Verification research",
      "Formal methods application",
      "Paper in progress",
      "Advanced to PhD track",
    ],
  },
];

interface PathSegment {
  x: number;
  y: number;
}

function generateCurvePath(epochs: EpochData[], width: number, height: number): PathSegment[] {
  const padding = 80;
  const maxEpoch = epochs.length;
  const minLoss = 0;
  const maxLoss = 1;

  return epochs.map((epoch) => {
    const x = padding + ((epoch.epoch - 1) / (maxEpoch - 1)) * (width - 2 * padding);
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
  const svgRef = useRef<SVGSVGElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [expandedEpoch, setExpandedEpoch] = useState<number | null>(null);

  const svgWidth = 900;
  const svgHeight = 500;
  const padding = 80;

  useEffect(() => {
    const path = svgRef.current?.querySelector("path.curve-path") as SVGPathElement;
    if (path) {
      setPathLength(path.getTotalLength());
    }
  }, []);

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
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="loss-curve-svg"
        >
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((loss, i) => (
            <g key={`grid-${i}`}>
              <line
                x1={padding}
                y1={svgHeight - padding - loss * (svgHeight - 2 * padding)}
                x2={svgWidth - padding}
                y2={svgHeight - padding - loss * (svgHeight - 2 * padding)}
                stroke="#2a2f4a"
                strokeDasharray="4"
                opacity="0.5"
              />
              <text
                x={padding - 10}
                y={svgHeight - padding - loss * (svgHeight - 2 * padding) + 5}
                textAnchor="end"
                fontSize="12"
                fill="#b0b8d4"
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
            stroke="#2a2f4a"
            strokeWidth="2"
          />

          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={svgHeight - padding}
            stroke="#2a2f4a"
            strokeWidth="2"
          />

          {/* Axis labels */}
          <text x={svgWidth / 2} y={svgHeight - 20} textAnchor="middle" fill="#b0b8d4" fontSize="14">
            Epochs
          </text>
          <text
            x={30}
            y={svgHeight / 2}
            textAnchor="middle"
            fill="#b0b8d4"
            fontSize="14"
            transform={`rotate(-90 30 ${svgHeight / 2})`}
          >
            Loss
          </text>

          {/* Main curve */}
          <motion.path
            className="curve-path"
            d={smoothPath}
            stroke="#f5a623"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          />

          {/* Glow effect */}
          <path
            d={smoothPath}
            stroke="#f5a623"
            strokeWidth="8"
            fill="none"
            opacity="0.2"
            filter="blur(4px)"
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
            >
              {/* Glow circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="#f5a623"
                opacity="0.2"
              />

              {/* Main circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#f5a623"
                className="data-point"
              />

              {/* Hover interaction */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="8"
                fill="none"
                stroke="#f5a623"
                strokeWidth="2"
                opacity="0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
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
              fill="#b0b8d4"
              className="epoch-label"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
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
              className={`epoch-card ${expandedEpoch === epoch.epoch ? "expanded" : ""}`}
              onClick={() =>
                setExpandedEpoch(expandedEpoch === epoch.epoch ? null : epoch.epoch)
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

      <style dangerouslySetInnerHTML={{ __html: `
        .loss-curve-container {
          width: 100%;
          padding: 3rem 2rem;
          background: rgba(26, 31, 58, 0.3);
          border-radius: 1rem;
          margin-bottom: 3rem;
        }

        .timeline-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #f5a623 0%, #ffc066 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: #b0b8d4;
          font-size: 1rem;
        }

        .svg-wrapper {
          background: #0a0e27;
          border: 1px solid #2a2f4a;
          border-radius: 0.75rem;
          padding: 2rem;
          margin-bottom: 2rem;
          overflow-x: auto;
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
          filter: drop-shadow(0 0 8px rgba(245, 166, 35, 0.6));
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
          background: #1a1f3a;
          border: 1px solid #2a2f4a;
          border-radius: 0.75rem;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .epoch-card:hover {
          border-color: #f5a623;
          box-shadow: 0 8px 24px rgba(245, 166, 35, 0.1);
        }

        .epoch-card.expanded {
          border-color: #f5a623;
          box-shadow: 0 12px 32px rgba(245, 166, 35, 0.15);
        }

        .epoch-header {
          margin-bottom: 1rem;
        }

        .epoch-number {
          display: inline-block;
          background: rgba(245, 166, 35, 0.1);
          color: #f5a623;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          margin-bottom: 0.5rem;
        }

        .epoch-card h3 {
          color: #fff;
          margin: 0;
          font-size: 1.2rem;
        }

        .epoch-timestamp {
          color: #b0b8d4;
          font-size: 0.9rem;
          margin: 0.5rem 0;
        }

        .epoch-description {
          color: #b0b8d4;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 1rem 0;
        }

        .achievements {
          overflow: hidden;
        }

        .achievements h4 {
          color: #f5a623;
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
          margin-top: 1rem;
        }

        .achievements ul {
          list-style: none;
          padding: 0;
        }

        .achievements li {
          color: #b0b8d4;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
        }

        .loss-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(245, 166, 35, 0.1);
          color: #f5a623;
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

          .section-title {
            font-size: 1.8rem;
          }
      `}} />
      </motion.div>
  );
}