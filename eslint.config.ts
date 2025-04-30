import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,vue}'],
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    },
    pluginVue.configs['flat/essential'],

    {
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'import/no-default-export': 'off',
            'import/named': 'off',
            'import/no-cycle': 'off',
            'vue/no-multiple-template-root': 'off',
            'vue/no-v-html': 'off',
            'prettier/prettier': 'warn',
            ...eslintConfigPrettier.rules,
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            '@typescript-eslint/no-empty-interface': [
                'error',
                {
                    allowSingleExtends: true,
                },
            ],
            'vue/html-self-closing': [
                'warn',
                {
                    html: {
                        void: 'always',
                        normal: 'always',
                        component: 'always',
                    },
                    svg: 'always',
                    math: 'always',
                },
            ],
        },
    },
    vueTsConfigs.recommended,
    // skipFormatting,
)
