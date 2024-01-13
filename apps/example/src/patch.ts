import { createPatch, Parameter, Value } from '@mixolydian/react';

type Patch = {
  frequency: Parameter<number>;
  data: Value<{
    foo: number;
    bar: boolean;
  }>;
};

export const patch = createPatch<Patch>();
