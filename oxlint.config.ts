import config from "@coderbyheart/oxlint-config"
import { defineConfig } from "oxlint"

export default defineConfig({
  extends: [config],
  options: {
    typeAware: true,
  },
  ignorePatterns: ["coverage/**", "commitlint.config.cjs"],
  overrides: [
    {
      // Ambient declarations legitimately use the broad `Function` type.
      files: ["**/*.d.ts"],
      rules: {
        "typescript/no-unsafe-function-type": "off",
      },
    },
    {
      // node:test's describe()/it() return promises that the runner awaits.
      files: ["**/*.spec.ts", "**/*.spec.tsx"],
      rules: {
        "typescript/no-floating-promises": "off",
      },
    },
  ],
})
