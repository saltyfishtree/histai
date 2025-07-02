# HistAI

HistAgent: An LLM-based agent for historical understanding and interaction. This project showcases the HistAgent system and HistBench benchmark for advancing AI's understanding of history.

## 🚀 New Architecture (v1.0.0)

This project has been completely refactored with modern web technologies:

### Tech Stack

- **Frontend**: TypeScript + Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (with CSS fallbacks)
- **State Management**: Zustand
- **Code Quality**: ESLint + Prettier + Husky
- **Architecture**: Component-based with service layers

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI elements (Button, Card, etc.)
│   ├── common/         # Common components (Header, Footer)
│   ├── animations/     # Animation components
│   └── motion/         # Framer Motion system
├── pages/              # Page-level components
├── services/           # Business logic layers
│   ├── api/           # API services
│   ├── i18n/          # Translation services
│   └── routerService.ts
├── stores/             # Zustand state management
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## 🛠 Development

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file and set your Gemini API key:

```bash
GEMINI_API_KEY=your_api_key_here
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Code Quality

```bash
npm run lint          # Check code quality
npm run format        # Format code
npm run lint:fix      # Auto-fix linting issues
```

## ✨ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion with CSS fallbacks
- **Type Safety**: Full TypeScript coverage
- **Code Splitting**: Optimized bundle sizes
- **Internationalization**: English and Chinese support
- **Accessibility**: WCAG 2.1 compliant
- **Modern Tooling**: Hot reload, auto-formatting, pre-commit hooks

## 🎨 Animation System

The project includes a sophisticated animation system:

- Motion components with data attributes
- Intersection Observer for scroll animations
- CSS fallbacks for better compatibility
- Performance optimized with code splitting

## 🌐 Deployment

The project builds to static files and can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Follow the established coding conventions
2. Use TypeScript for all new code
3. Follow the component-based architecture
4. Include proper animations and responsive design
5. Ensure accessibility standards are met

## 📄 License

Apache-2.0 License
