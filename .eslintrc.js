module.exports = {
  root: true,
  env: { node: true },

  extends: [
    'plugin:vue/strongly-recommended', // 使用严谨模式
    'eslint:recommended',
    '@vue/prettier', // 结合 .prettierrc.js
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-unused-vars': ['off', { ignoreRestSiblings: true /* 解构剩余变量时不检查 */ }],
    'no-var': 'warn',
    'prefer-const': ['warn', { destructuring: 'all' }],
    'no-empty': 'warn',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false, // 组件在模板中必须还用烤串式命名风格
        ignores: [],
      },
    ],
    'vue/name-property-casing': ['warn', 'PascalCase'], // 组件大驼峰命名风格(首字母大写)
    'vue/prop-name-casing': ['error', 'camelCase'], // props小驼峰命名风格(首字母小写)
    'vue/require-v-for-key': 'error', // v-for必须设置key值
    'vue/no-use-v-if-with-v-for': [
      'error',
      {
        allowUsingIterationVar: false, // v-if、v-for不能作用在同一元素
      },
    ],
    'vue/v-bind-style': ['error', 'shorthand'], // v-bin统一使用缩写
    'vue/v-on-style': ['error', 'shorthand'], // v-on统一使用缩写
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: { jest: true },
    },
  ],
};
