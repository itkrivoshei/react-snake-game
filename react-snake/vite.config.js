import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/react-snake-game/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
});
