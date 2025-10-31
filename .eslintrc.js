module.exports = {
  // Extend the default Next.js configuration
  extends: [
    "next/core-web-vitals",
    // Add TypeScript-specific rules
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    // ----------------------------------------------------
    // FIX FOR WORKER HANGS
    // This rule prevents Promises from being created but not handled (awaited or caught).
    // Unhandled promises are the primary cause of the "Worker hung" error.
    "@typescript-eslint/no-floating-promises": "error",
    // ----------------------------------------------------

    // Optional: Add other common rules for cleanliness
    "react/jsx-key": "error",
    "no-unused-vars": "off", // Handled by typescript-eslint
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};
