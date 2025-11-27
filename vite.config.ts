import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' ensures we load all env vars, including those from Vercel.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Replaces 'process.env.API_KEY' in your code with the actual value of VITE_API_KEY during build
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY)
    }
  };
});