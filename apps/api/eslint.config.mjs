import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import { FlatCompat } from "@eslint/eslintrc";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname
});

const extendsConfigs = [
    ...compat.extends('plugin:@typescript-eslint/recommended'),
    ...compat.extends('plugin:prettier/recommended')
];

export default [
    ...extendsConfigs,
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: __dirname,
                sourceType: 'module'
            },
            globals: {
                ...globals.node,
                ...globals.jest
            }
        },
        plugins: {
            '@typescript-eslint': typescript,
            prettier: prettier
        },
        rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'prettier/prettier': 'off'
        }
    },
    {
        ignores: ['.eslintrc.js']
    }
];