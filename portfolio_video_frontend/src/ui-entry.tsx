import { createRoot } from 'react-dom/client';
import { App } from './App';

// Guard for environments where document is not available (SSR / build)
const d: any =
  typeof globalThis !== 'undefined' && (globalThis as any).document
    ? (globalThis as any).document
    : undefined;

if (d) {
  const container = d.createElement('div');
  d.body.style.margin = '0';
  d.body.appendChild(container);
  const root = createRoot(container);
  root.render(<App />);
}
