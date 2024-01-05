import { App } from "./App";
import { createRoot } from "react-dom/client";
import { init, z } from "@mixolydian/react";

export default function createPatchView(patchConnection: any) {
  init(patchConnection, {
    endpoints: {
      frequency: {
        kind: "value",
        schema: z.number(),
      },
    },
  });
  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(<App />);
  return container;
}
