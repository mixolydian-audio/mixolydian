import { patch } from './patch';

export const App = () => {
  const frequency = patch.useParameter('frequency');

  return (
    <p style={{ backgroundColor: 'white' }}>
      <button onClick={() => frequency.set(440)}>Test</button>
      <span>Frequency: {frequency.value}</span>
    </p>
  );
};
