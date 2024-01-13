import { useEffect, useState } from 'react';
import { createPatch as createPatchCore } from '@mixolydian/core';
import type { Endpoints, PatchInputs } from '@mixolydian/core';

type Parameter<T> = {
  value: T;
  set: (value: NonNullable<T>) => void;
};

export const createPatch = <T extends PatchInputs>() => {
  const patch = createPatchCore<T>();

  const useParameter = <K extends Endpoints<T>>(endpoint: K): Parameter<T[K]['value'] | null> => {
    const [value, setValue] = useState<T[K]['value'] | null>(null);

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
