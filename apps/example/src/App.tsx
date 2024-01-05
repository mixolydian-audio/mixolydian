import { useEndpoint } from "@mixolydian/react";

export const App = () => {
  const frequency = useEndpoint("frequency");

  return (
    <span style={{ backgroundColor: "white" }}>Frequency: {frequency}</span>
  );
};
