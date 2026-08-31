import tsParser from '@typescript-eslint/parser';
export default [
  { ignores: ['**/dist/**', '**/node_modules/**', '**/.expo/**'] },
  { files: ['**/*.{ts,tsx}'], languageOptions: { parser: tsParser }, rules: { semi: ['error', 'always'] } },
];
