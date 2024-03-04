import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: 'assets',
      manifest: {
        name: 'Instant To-dos',
        short_name: 'To-dos',
        description: 'A to-do parser with sharable links',
        theme_color: '#fffaed',
        icons: [
          {
            src: 'assets/icons/launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'assets/icons/launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'assets/icons/launchericon-144-144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'assets/icons/launchericon-96-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'assets/icons/launchericon-72-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'assets/icons/launchericon-48-48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ]
      }
    })
  ]
});
