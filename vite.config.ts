import path from 'path';

import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  base: '/voyage-path-navigation/',
  server: {
    host: true,
    port: 3000,
  },

  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, './src/'),
    },
  },
});
