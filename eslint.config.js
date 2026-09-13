// Import necessary ESLint plugins and configuration utilities.
// '@eslint/js' provides recommended base rules for JavaScript.
import js from '@eslint/js'
// 'globals' provides predefined sets of global variables (e.g., for browser or Node.js environments).
import globals from 'globals'
// 'eslint-plugin-react-hooks' enforces the Rules of Hooks in React components.
import reactHooks from 'eslint-plugin-react-hooks'
// 'eslint-plugin-react-refresh' ensures your components are compatible with Fast Refresh in Vite.
import reactRefresh from 'eslint-plugin-react-refresh'
// 'defineConfig' and 'globalIgnores' are helpers from ESLint for creating a configuration.
import { defineConfig, globalIgnores } from 'eslint/config'

// Export the main configuration array. ESLint processes this array to apply rules.
export default defineConfig([
  // This tells ESLint to globally ignore the 'dist' directory, which contains build output.
  globalIgnores(['dist']),

  // This is a configuration object that applies to specific files.
  {
    // This configuration applies to all files ending in .js or .jsx.
    files: ['**/*.{js,jsx}'],

    // 'extends' applies a set of pre-configured rules from plugins.
    extends: [
      // Use the recommended rules from ESLint itself.
      js.configs.recommended,
      // Use the recommended rules for React Hooks.
      reactHooks.configs.flat.recommended,
      // Use the configuration required for Vite's Fast Refresh.
      reactRefresh.configs.vite,
    ],

    // 'languageOptions' configures settings related to the JavaScript language.
    languageOptions: {
      // Define the global variables available in the code. 'globals.browser' includes things like `window` and `document`.
      globals: globals.browser,
      // 'parserOptions' configures the JavaScript parser.
      // 'ecmaFeatures: { jsx: true }' enables parsing of JSX syntax.
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
