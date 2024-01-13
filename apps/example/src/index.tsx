import { App } from './App';
import { createRoot } from 'react-dom/client';
import { patch } from './patch';
import { EmbeddedPatchConnection } from '@mixolydian/react';

export default async function createPatchView(patchConnection: EmbeddedPatchConnection) {
  await patch.connect(patchConnection);
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(<App />);
  return container;
}
