"use client";

import { MathJaxContext, MathJax } from "better-react-mathjax";

const config = {
  loader: { load: ["[tex]/ams"] },
  tex: {
    packages: { "[+]": ["ams"] },
  },
};

export default function App() {
  return (
    <MathJaxContext config={config}>
      <h2>Basic MathJax example with LaTeX</h2>
      <MathJax>{"\\(\\frac{10}{4x} \\approx 2^{12}\\)"}</MathJax>
      <MathJax>{"\\(1 \\leq N \\leq 10^6\\)"}</MathJax>
      <MathJax>{"\\(y_i\\)"}</MathJax>
    </MathJaxContext>
  );
}
