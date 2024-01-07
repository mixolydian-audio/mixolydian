import { App } from './App';
import { createRoot } from 'react-dom/client';
import { patch } from './patch';

export default function createPatchView(patchConnection: any) {
  patch.connect(patchConnection);
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<App />);
  return container;
}
