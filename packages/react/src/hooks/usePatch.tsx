import { Patch, patch } from "@mixolydian/core";

export const usePatch = (): Patch => {
  if (!patch) {
    throw new Error("No patch initialized.");
  }

  return patch;
};
