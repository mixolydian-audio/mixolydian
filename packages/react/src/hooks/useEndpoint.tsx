import { patch } from "@mixolydian/core";
import { useState, useEffect } from "react";

export const useEndpoint = (endpoint: string) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    patch.on(endpoint, setValue);
    return () => patch.off(endpoint, setValue);
  }, [endpoint]);

  return value;
};
