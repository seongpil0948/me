import type { InterviewQuestion } from "@/types/portfolio";

export const frontendQuestions: InterviewQuestion[] = [
  {
    id: 20,
    category1: "Frontend",
    category2: "React",
    question: "What is your React/Next.js experience?",
    answer:
      "**React/Next.js Experience:**\n- Current portfolio site built with **Next.js 16 (App Router)** + React 19\n- Production e-commerce platform frontend (React)\n- Component-driven development with modern React patterns\n\n**Technical Skills:**\n- Server Components and Client Components patterns\n- Static generation and dynamic rendering\n- Integration with HeroUI component library\n- Performance optimization (code splitting, lazy loading)\n- State management and data fetching patterns",
  },
  {
    id: 21,
    category1: "Frontend",
    category2: "Vue",
    question: "What is your Vue.js experience?",
    answer:
      "Extensive **Vue.js** experience across multiple production projects.\n\n**Major Projects:**\n- LG IXI Studio (Generative AI platform)\n- Virtual Try-on fitting room\n- Inoutbox POS system\n- Various enterprise web applications\n\n**Technical Skills:**\n- Component composition and reusability\n- Vuex state management\n- Integration with backend APIs\n- Element UI and other component libraries\n- Real-time data visualization (konva.js, Apache ECharts)",
  },
  {
    id: 22,
    category1: "Frontend",
    category2: "Build Tools",
    question: "What is your experience with Vite/build tools?",
    answer:
      "**Vite Experience:**\n- Resolved Vite prerender build issues with CodeMirror library\n- Modified open-source libraries for compatibility\n- Build optimization for production deployments\n\n**Other Build Tools:**\n- Webpack configuration and optimization\n- Turbopack with Next.js (current portfolio)\n- Bundle size optimization strategies\n- Hot module replacement (HMR) setup",
  },
  {
    id: 23,
    category1: "Frontend",
    category2: "Mobile",
    question: "What is your Flutter/mobile development experience?",
    answer:
      "**Flutter Development:**\n- **Campi** (Camping SNS): Custom image editing library in Dart\n- **Inoutbox**: Cross-platform mobile app (Android/iOS)\n- Implemented pinch-to-zoom, cropping, rotation, flip features\n- Gesture handling (scale, pan, drag) with aspect ratio processing\n\n**Mobile Expertise:**\n- Cross-platform development strategy\n- Platform-specific optimizations\n- FCM Push notifications integration\n- Offline-first architecture patterns",
  },
  {
    id: 34,
    category1: "Frontend",
    category2: "Performance",
    question: "What frontend performance optimization experience do you have?",
    answer:
      "**Major Optimizations:**\n\n**SK Drone Platform:**\n- 70% rendering improvement with Three.js LOD optimization\n- 85% loading time reduction for 50MB+ drone photos\n- WebP conversion + Progressive Loading + Web Worker\n- Prevented main thread blocking\n\n**General Techniques:**\n- Code splitting and lazy loading\n- Image optimization (WebP, responsive images)\n- Bundle size reduction\n- Critical CSS and above-the-fold optimization\n- Lighthouse score optimization",
  },
];
