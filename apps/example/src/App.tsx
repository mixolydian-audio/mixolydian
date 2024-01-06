import { patch } from "./patch";

export const App = () => {
  const frequency = patch.useParameter("frequency");

  return (
    <span style={{ backgroundColor: "white" }}>Frequency: {frequency}</span>
  );
};
