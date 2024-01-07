import { createPatch } from '@mixolydian/react';
type Patch = {
  frequency: number;
  complexSingle: {
    foo: number;
    bar: boolean;
  };
};

export const patch = createPatch<Patch>();
