<img src="https://github.com/mixolydian-audio/mixolydian/assets/74794442/c665cfbf-5ea6-427f-9597-4c67e3c7b445" alt="mixolydian logo" width="300" />

Typescript first utility library around [Cmajors](https://cmajor.dev/) custom UI functionality, with adapters for common UI frameworks like react.

### Apps and Packages

- `example`: A Cmajor example patch with a custom GUI using Vite + React
- `core`: Core functionality of mixolydian, independent of any UI framework
- `react`: React wrapper around core, exposing functionality as hooks

### Usage
#### React
Create a patch.ts file with:

```ts
import { createPatch } from '@mixolydian/react';

type Patch = {
  // add types of your patch parameters here
  parameter: float,
  ...
};

export const patch = createPatch<Patch>();
```

In your createPatchView function, call patch.connect with the patchConnection object.

```ts
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
```

Usage in components:

```ts
import { patch } from './patch';

export const Component = () => {
  const parameter = patch.useParameter('parameter');

  return (
    <>
      <span>Parameter value: {parameter.value}</span>
      <button onClick={() => parameter.set(440)}>Set to 440</button>
    </>
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
