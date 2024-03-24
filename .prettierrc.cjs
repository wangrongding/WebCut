/**
 * @type {import('prettier').Options}
 */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss"), require.resolve('@trivago/prettier-plugin-sort-imports')],
  "importOrderSeparation": true,
  tailwindConfig: './tailwind.config.js',

  semi: false, // 是否在语句末尾打印分号
  tabWidth: 2, // 空格数
  singleQuote: true, // 是否使用单引号
  printWidth: 100, // 换行的宽度
  trailingComma: "none", // 多行时尽可能打印尾随逗号 |all|es5|none
  useTabs: false, // 是否开启tab
  quoteProps: "as-needed", // 对象的key仅在需要时用引号 as-needed|consistent|preserve
  bracketSpacing: true, // 对象文字中的括号之间打印空格
  jsxSingleQuote: true, // 在JSX中是否使用单引号
  arrowParens: "always", // 箭头函数，只有一个参数的时候，也需要括号 always|avoid
  htmlWhitespaceSensitivity: "ignore", // html中换行规则 css|strict|ignore,strict会强制在标签周围添加空格
  endOfLine: "lf", // 换行符
  proseWrap: "never", // 当超出print width时就折行 always|never|preserve .md文件?
  embeddedLanguageFormatting: "auto", // 是否格式化内嵌的代码块
  vueIndentScriptAndStyle: false, // vue中script与style里的第一条语句是否空格
  singleAttributePerLine: false, // 每行强制单个属性
  bracketSameLine: false, // 将HTML元素的闭括号放在最后一行的末尾（不适用于自闭合元素）。
  // rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
}
