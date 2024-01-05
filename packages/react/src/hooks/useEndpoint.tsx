import { useState, useEffect } from "react";
import { usePatch } from "./usePatch";

export const useEndpoint = (endpoint: string) => {
  const [value, setValue] = useState(0);
  const patch = usePatch();

  useEffect(() => {
    patch.on(endpoint, setValue);
    return () => patch.off(endpoint, setValue);
  }, [endpoint]);

  return value;
};
