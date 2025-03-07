import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import nodePolyfills from "rollup-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig({
  plugins: [nodePolyfills(), tailwindcss(), react()],
});
