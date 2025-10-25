import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import sonarjs from "eslint-plugin-sonarjs";

export default defineConfig(
  {
    ignores: ["**/node_modules/**", "dist/**"], // Files/folders to ignore
  },
  sonarjs.configs.recommended, // SonarJS recommended rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Apply to JS/TS/JSX/TSX files
    languageOptions: {
      ecmaVersion: "latest", // Support latest ECMAScript
      sourceType: "module", // ES modules
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: typescriptParser, // TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      prettier: eslintPluginPrettier, // Prettier integration
      react, // React rules
      "react-hooks": reactHooks, // React hooks rules
      "react-refresh": reactRefresh, // Fast refresh rules
      "@typescript-eslint": typescript, // TypeScript rules
    },
    settings: {
      react: {
        version: "detect", // Detect React version
      },
    },
    rules: {
      // ========================
      // Prettier Integration
      // ========================
      "prettier/prettier": "error", // Treat formatting errors as ESLint errors

      // ========================
      // React
      // ========================
      "react/prop-types": "off", // Disable prop-types, using TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in React 17+

      // ========================
      // React Hooks
      // ========================
      "react-hooks/rules-of-hooks": "error", // Enforce rules of hooks
      "react-hooks/exhaustive-deps": "warn", // Check useEffect dependencies

      // ========================
      // TypeScript
      // ========================
      "@typescript-eslint/no-explicit-any": "warn", // Minimize use of any
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }, // Ignore unused args starting with _
      ],

      // ========================
      // Modern JavaScript
      // ========================
      "prefer-const": "error", // Prefer const
      "no-var": "error", // Disallow var
      "arrow-body-style": ["error", "as-needed"], // Only use braces when needed
      "object-shorthand": "error", // Use object shorthand
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }], // Limit empty lines

      // ========================
      // Safety & Best Practices
      // ========================
      eqeqeq: ["error", "always"], // Always use ===
      "no-console": ["warn", { allow: ["warn", "error"] }], // Warn for console
      "no-debugger": "warn", // Warn for debugger
      "no-unused-vars": "off", // Handled by TypeScript
      "no-undef": "off", // Handled by TypeScript
    },
  },
  prettier, // Prevent conflicts with Prettier
);
