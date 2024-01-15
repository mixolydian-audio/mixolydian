import { useEffect, useState } from 'react';
import { createPatch as createPatchCore } from '@mixolydian/core';
import type { Endpoints, PatchInputs } from '@mixolydian/core';

type Parameter<T> = {
  value: T;
  set: (value: T) => void;
};

export const createPatch = <T extends PatchInputs>() => {
  const patch = createPatchCore<T>();
  const useParameter = <K extends Endpoints<T>>(endpoint: K): Parameter<T[K]['value']> => {
    const [value, setValue] = useState<T[K]['value']>(patch.endpoints.get(endpoint));

    useEffect(() => {
      patch.endpoints.subscribe(endpoint, setValue);
      return () => {
        patch.endpoints.unsubscribe(endpoint, setValue);
      };
    });

    return {
      value,
      set: (value) => patch.endpoints.set(endpoint, value),
    };
  };

  return {
    connect: patch.connect,
    useParameter,
  };
};
