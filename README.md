<img src="https://github.com/mixolydian-audio/mixolydian/assets/74794442/c665cfbf-5ea6-427f-9597-4c67e3c7b445" alt="mixolydian logo" width="300" />

![build](https://github.com/mixolydian-audio/mixolydian/actions/workflows/test.yml/badge.svg)

Typescript first utility library around [Cmajors](https://cmajor.dev/) custom UI functionality, with adapters for common UI frameworks like react.

### Apps and Packages

- `example`: A Cmajor example patch with a custom GUI using Vite + React
- `core`: Core functionality of mixolydian, independent of any UI framework
- `react`: React wrapper around core, exposing functionality as hooks

### Usage
#### React
Create a patch.ts file with:

```ts
import { createPatch, Parameter, Value } from '@mixolydian/react';

type Patch = {
  frequency: Parameter<number>;
  data: Value<{
    foo: number;
    bar: boolean;
  }>;
};

export const patch = createPatch<Patch>();
```

In your [createPatchView function](https://cmajor.dev/docs/PatchFormat#specifying-a-custom-gui-for-a-patch), call patch.connect with the [patchConnection](https://cmajor.dev/docs/PatchFormat#the-patchconnection-object) object.

```ts
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
```

Usage in components:

```ts
import { patch } from './patch';

export const App = () => {
  const frequency = patch.useParameter('frequency');

  return (
    <p style={{ backgroundColor: 'white' }}>
      <button onClick={() => frequency.set(440)}>Test</button>
      <span>Frequency: {frequency.value}</span>
    </p>
  );
};
```


### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```
