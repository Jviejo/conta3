import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});


// Define custom rules
const customRules = {
  rules: {
    // Unused variables
    "no-unused-vars": "off", // Turn off base rule to avoid conflicts
    "@typescript-eslint/no-unused-vars": ["warn", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_",
      "caughtErrorsIgnorePattern": "^_",
      "destructuredArrayIgnorePattern": "^_"
    }],
    // React rules
    
    // TypeScript rules
    "@typescript-eslint/no-unused-vars": ["off", { 
      argsIgnorePattern: "^_",
      varsIgnorePattern: "^_" 
    }],

    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/exhaustive-deps": "off",

    
    
    // General rules
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "curly": ["error", "all"],
    "max-len": ["warn", { "code": 100, "ignoreUrls": true, "ignoreStrings": true }]
  }
};


const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  customRules,
];

export default eslintConfig;
