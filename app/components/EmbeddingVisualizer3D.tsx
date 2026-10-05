import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

interface DataPoint {
  id: string;
  x: number;
  y: number;
  z: number;
  category: string;
  label: string;
  github: string;
  keywords: string[]; // <-- Ajouté
}

// GitHub repositories data
const GITHUB_REPOS: DataPoint[] = [
  { id: "cove", x: -15, y: 10, z: 5, category: "Research", label: "XAI-LLM-CoVe_Verification", github: "https://github.com/mathura-snth/XAI-LLM-CoVe_Verification", keywords: ["XAI", "LLM", "Counterfactual", "PyTorch"] },
  { id: "dentarag", x: 8, y: -5, z: 12, category: "RAG", label: "DentaRAG", github: "https://github.com/mathura-snth/RAG_from_scratch", keywords: ["Hybrid Search", "LangChain", "FastAPI", "PostgreSQL"] },
  { id: "nlp-recommend", x: 12, y: 8, z: -8, category: "NLP", label: "NLP-Movie-Recommender", github: "https://github.com/mathura-snth/NLP-Movie-Recommender-DWL", keywords: ["TF-IDF", "Sentence-Transformers", "nDCG", "Flask"] },
  { id: "synthetic-bench", x: -10, y: -8, z: -12, category: "Research", label: "Synthetic-Benchmark", github: "https://github.com/mathura-snth/Math-LLM-Verifier", keywords: ["Formal Methods", "Theorem Proving", "Dataset Design"] },
  { id: "study-notes", x: 14, y: -3, z: 8, category: "Education", label: "Study-Notes-M1", github: "https://github.com/mathu/study-notes", keywords: ["Deep Learning", "Optimization", "Linear Algebra"] },
  { id: "routes-optimization", x: 5, y: 15, z: -10, category: "Algorithms", label: "Routes-Optimization", github: "https://github.com/mathura-snth/Advanced-Route-Optimization", keywords: ["lazy strategy", "Dijkstra", "A*", "Contraction Hierarchies", "CSR"] },
];

const CATEGORY_COLORS: Record<string, string> = {
  Research: "#ff6666",
  RAG: "#00ffb2",
  NLP: "#33ccff",
  ML: "#ffff4d",
  Education: "#ffa366"
};

function Legend() {
  return (
    <div className="legend">
      <h3>Categories</h3>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
          <div key={category} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: color }}></span>
            <span style={{ color: "#b0b8d4", fontSize: "0.9rem" }}>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectPoints({ data }: { data: DataPoint[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<DataPoint | null>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {data.map((point) => {
        const isHovered = hoveredNode?.id === point.id;
        
        return (
          <group 
            key={point.id} 
            position={[point.x, point.y, point.z]}
            onPointerOver={(e) => { e.stopPropagation(); setHoveredNode(point); }}
            onPointerOut={() => setHoveredNode(null)}
            onClick={() => window.open(point.github, "_blank")}
          >
            {/* Core sphere */}
            <mesh>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshBasicMaterial color={CATEGORY_COLORS[point.category]} />
            </mesh>

            {/* Glow sphere */}
            <mesh>
              <sphereGeometry args={[isHovered ? 1.5 : 1.2, 16, 16]} />
              <meshBasicMaterial 
                color={CATEGORY_COLORS[point.category]} 
                transparent 
                opacity={isHovered ? 0.4 : 0.15} 
                depthWrite={false}
              />
            </mesh>

            {/* Tooltip on hover with keywords */}
            {isHovered && (
              <Html distanceFactor={40} center>
                <div style={{
                  background: 'rgba(10, 14, 39, 0.95)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${CATEGORY_COLORS[point.category]}`,
                  color: 'white',
                  width: '220px',
                  pointerEvents: 'none',
                  backdropFilter: 'blur(4px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
                }}>
                  <strong>{point.label}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#b0b8d4', marginTop: '2px', marginBottom: '8px' }}>
                    {point.category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {point.keywords.map((keyword, i) => (
                      <span key={i} style={{
                        background: 'rgba(245, 166, 35, 0.15)',
                        color: '#ffc066',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.7rem'
                      }}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function EmbeddingVisualizer3D() {
  return (
    <motion.div
      className="embedding-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="viz-header">
        <h2 className="section-title">GitHub Repository Space</h2>
        <p className="section-subtitle">
          3D visualization of my projects - rotate, zoom, and hover to explore
        </p>
      </div>

      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 10, 40], fov: 60 }} style={{ background: "transparent" }}>
          <ambientLight intensity={0.5} />
          <ProjectPoints data={GITHUB_REPOS} />
          <gridHelper args={[60, 20, "#2a2f4a", "#1a1f3a"]} position={[0, -20, 0]} />
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            minDistance={10} 
            maxDistance={80}
          />
        </Canvas>
      </div>

      <Legend />

      <div className="repos-list">
        <h3>Projects Directory</h3>
        <div className="repos-grid">
          {GITHUB_REPOS.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="badge" style={{ color: CATEGORY_COLORS[repo.category], borderColor: CATEGORY_COLORS[repo.category] }}>
                {repo.category}
              </span>
              <h4>{repo.label}</h4>
              <p>View Repository →</p>
            </motion.a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .embedding-container { width: 100%; padding: 3rem 2rem; background: rgba(26, 31, 58, 0.3); border-radius: 1rem; margin-bottom: 3rem; }
        .viz-header { text-align: center; margin-bottom: 2rem; }
        .canvas-wrapper { width: 100%; height: 500px; border: 1px solid #2a2f4a; border-radius: 0.75rem; overflow: hidden; margin-bottom: 2rem; background: rgba(10, 14, 39, 0.5); cursor: grab; }
        .canvas-wrapper:active { cursor: grabbing; }
        .legend { background: #1a1f3a; border: 1px solid #2a2f4a; border-radius: 0.75rem; padding: 1.5rem; margin-bottom: 2rem; }
        .legend h3 { margin-bottom: 1rem; color: #f5a623; }
        .legend-item { display: flex; align-items: center; margin-bottom: 0.5rem; }
        .legend-color { width: 12px; height: 12px; border-radius: 50%; margin-right: 0.5rem; }
        .repos-list { margin-top: 2rem; }
        .repos-list h3 { color: #f5a623; margin-bottom: 1rem; font-size: 1.3rem; }
        .repos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
        .repo-card { background: #1a1f3a; border: 1px solid #2a2f4a; border-radius: 0.75rem; padding: 1rem; transition: all 0.3s; cursor: pointer; text-decoration: none; display: block; }
        .repo-card:hover { border-color: #f5a623; box-shadow: 0 8px 24px rgba(245, 166, 35, 0.1); }
        .repo-card .badge { display: inline-block; background: rgba(255, 255, 255, 0.05); padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; margin-bottom: 0.5rem; border: 1px solid transparent; }
        .repo-card h4 { color: #fff; margin-bottom: 0.5rem; font-size: 0.95rem; }
        .repo-card p { color: #b0b8d4; font-size: 0.85rem; margin: 0; }
        @media (max-width: 768px) { .embedding-container { padding: 2rem 1rem; } .canvas-wrapper { height: 350px; } .repos-grid { grid-template-columns: 1fr; } }
      `}} />
    </motion.div>
  );
}