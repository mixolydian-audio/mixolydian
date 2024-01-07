import { useEffect } from 'react';
import { patch } from './patch';

export const App = () => {
  const frequency = patch.useParameter('frequency');
  const complex = patch.useParameter('complexSingle');

  useEffect(() => {
    console.log('updating complex');
    complex.set({ foo: 123, bar: false });
  }, []);

  return (
    <p style={{ backgroundColor: 'white' }}>
      <button onClick={() => frequency.set(440)}>Test</button>
      <span>Frequency: {frequency.value}</span>
      <span>Complex: {JSON.stringify(complex.value)}</span>
    </p>
  );
};
