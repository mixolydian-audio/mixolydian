import { createPatch } from '@mixolydian/react';
type Patch = {
  frequency: {
    kind: 'parameter';
    value: number;
  };
  complexSingle: {
    kind: 'value';
    value: {
      foo: number;
      bar: boolean;
    };
  };
};

export const patch = createPatch<Patch>();
