// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      //Whenever the backend API's are called we want the server to run on port 3000.
      '/api': {
       target: 'http://localhost:3000', 
       //Using http not https.
       secure: false,
      },
    },
  },
  plugins: [react()],
});