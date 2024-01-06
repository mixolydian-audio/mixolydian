import { useEffect, useState } from "react";
import { createPatch as _createPatch } from "@mixolydian/core";

export const createPatch = <T extends { [key: string]: unknown }>() => {
  const patch = _createPatch<T>();

  return {
    connect: (connection: any) => patch.connect(connection),
    useParameter: <K extends keyof T & string>(endpoint: K): T[K] | null => {
      const [value, setValue] = useState<T[K] | null>(null);

      useEffect(() => {
        patch.parameters.subscribe(endpoint, setValue);
        return () => {
          patch.parameters.unsubscribe(endpoint, setValue);
        };
      });

      return value;
    },
  };
};
