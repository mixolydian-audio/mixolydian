import { patch } from "./patch";

export const App = () => {
  const frequency = patch.useParameter("frequency");
  const complex = patch.useParameter("complexSingle");

  return (
    <p style={{ backgroundColor: "white" }}>
      <button onClick={() => frequency.set(440)}>Test</button>
      <span>Frequency: {frequency.value}</span>
      <span>Complex: {JSON.stringify(complex.value)}</span>
    </p>
  );
};
