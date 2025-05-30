// @ts-check
import { defineConfig, envField } from "astro/config"
import vercel from "@astrojs/vercel"
import react from "@astrojs/react"

import tailwindcss from "@tailwindcss/vite"

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react()],

  env: {
    schema: {
      API_KEY: envField.string({ context: "server", access: "secret", optional: false })
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
})