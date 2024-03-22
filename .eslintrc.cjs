/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  // add your custom rules here
  // it is based on https://eslint.vuejs.org/rules/
  'rules': {
    // 禁止将 log 提交到仓库，非常影响他人调试, 仅允许 warn 和 error, 如果提交的代码中存在必要的 log，请在所在行上面添加忽略检查注释：  `//eslint-disable-next-line no-console`
    'no-console': ['error', { allow: ['warn', 'error'] }],
    // 禁止将 debugger 提交到仓库
    'no-debugger': 'error',
    // 尽量不要提交未使用的变量（项目里太多了，非常影响代码可读性，所以给出的是 warn 大家提交的时候可以顺手删除）
    'no-unused-vars': ['warn', { 'vars': 'local', 'args': 'none', 'ignoreRestSiblings': false }],
    // 禁止在条件语句中使用赋值运算符, 防止把比较运算符（如 ==）误打成赋值运算符（如 =）: if (num = 1) {...}
    'no-cond-assign': ['error', 'always'],
    // 禁止在条件中使用常量表达式, 如 if (false) {...}
    'no-constant-condition': ['error', { 'checkLoops': false }],
    // 禁止在条件中与 NaN 进行比较, 如 if (var === NaN) {...}, 应该使用 isNaN(var)
    'use-isnan': 'error',
    // 禁止使用 arguments.caller 和 arguments.callee 来阻止使用废弃的和次优的代码
    'no-caller': 'error',
    // 禁止使用 else return
    'no-else-return': ['error', { allowElseIf: true }],
    // 禁止在非全等比较中与 null 进行比较, 应该使用 === 或 !== （因为 null == undefined 为 true）
    'no-eq-null': 'error',
    // ===================================== vue =====================================
    'vue/multi-word-component-names': 'off', // 关闭组件名称多单词限制
  }
}
