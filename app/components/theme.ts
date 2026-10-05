// app/theme.ts
// Three.js ne comprend pas var(--x) : les couleurs de la scène 3D
// sont donc définies ici en hex.

export const CATEGORY_COLORS: Record<string, string> = {
  Research: "#3e7a5f",
  RAG: "#d98c5f",
  NLP: "#5b8db8",
  ML: "#c9a24b",
  Education: "#9a7bb5",
  Algorithms: "#c75f6b",
};

// Couleurs de la grille 3D (équivalents hex de --border et d'une teinte plus claire)
export const GRID_COLORS = {
  main: "#c9d6cd",
  secondary: "#e3ebe5",
};