import { App } from "./App";
import { createRoot } from "react-dom/client";

export default function createPatchView(patchConnection: any) {
  console.log(patchConnection);
  const container = document.createElement("div");
  const root = createRoot(container);
  root.render(<App />);
  return container;
}
