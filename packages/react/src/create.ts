import { useEffect, useState } from "react";
import { createPatch as _createPatch } from "@mixolydian/core";

type Parameter<T> = {
  value: T | null;
  set: (value: T) => void;
};

export const createPatch = <T extends { [key: string]: unknown }>() => {
  const patch = _createPatch<T>();

  return {
    connect: (connection: any) => patch.connect(connection),
    useParameter: <K extends keyof T & string>(
      endpoint: K
    ): Parameter<T[K]> => {
      const [value, setValue] = useState<T[K] | null>(null);

      useEffect(() => {
        patch.parameters.subscribe(endpoint, setValue);
        return () => {
          patch.parameters.unsubscribe(endpoint, setValue);
        };
      });

      return {
        value,
        set: (value: T[K]) => patch.parameters.set(endpoint, value),
      };
    },
  };
};
