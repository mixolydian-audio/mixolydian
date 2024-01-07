import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'core',
      formats: ['iife', 'cjs', 'umd', 'es'],
    },
  },
  plugins: [dts()],
});
