import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import https from 'node:https';

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api/mailtm': {
        target: 'https://api.mail.tm',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mailtm/, ''),

        // Force IPv4 because IPv6 is timing out on this machine
        agent: new https.Agent({
          family: 4,
        }),
      },
    },
  },
});
