import { App } from "./App";
import { createRoot } from "react-dom/client";
import * as mixo from "@mixolydian/core";

export default function createPatchView(patchConnection: any) {
  mixo.init(patchConnection);
  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(<App />);
  return container;
}
