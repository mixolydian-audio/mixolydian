import { useEffect, useState } from "react";
import { createPatch as _createPatch } from "@mixolydian/core";

export const createPatch = <T = { [key: string]: object }>() => {
  const patch = _createPatch<T>();

  return {
    connect: (connection: any) => patch.connect(connection),
    useParameter: (endpoint: keyof T): unknown => {
      const [value, setValue] = useState<T>();

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

// export const create = <T extends Record<string, object>>(inputs: T) => {
//   let patch: Patch<typeof inputs>;

//   const useEndpoint = <T>(endpoint: string): T | undefined => {
//     const [value, setValue] = useState<T>();

//     useEffect(() => {
//       patch.on(endpoint, setValue);
//       return () => {
//         patch.off(endpoint, setValue);
//       };
//     });

//     return value;
//   };
// };
