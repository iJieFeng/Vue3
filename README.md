# 项目初始化

安装node.js（建议安装 14 16）[下载地址](https://nodejs.org/zh-cn/download/releases)

安装nvm（管理 node版本）[下载地址]( https://github.com/coreybutler/nvm-windows/releases)

- 使用 `vite`

  官方文档[开始 {#getting-started} | Vite中文网](https://vitejs.cn/guide/#overview)

  ```bash
  npm init vite@latest
  ```

  ```bash
  yarn create vite
  ```

  

- 使用 `vue cli`

  ```bash
  npm install @vue/cli -g
  ```

  ```bash
  npm init vue@latest
  # 或
  vue create <project>
  ```




# 项目配置

## vue3自动引入插件

[unplugin-auto-import](https://www.npmjs.com/package/unplugin-auto-import)

```bash
npm i -D unplugin-auto-import
```

vite配置（vite.config.ts）

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue'],
      dts: 'src/auto-imports.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```

配置完后 使用ref reactive watch 等 无需import 导入，可以直接使用



##  使用Taiwind css

在 Vue 3 和 Vite 安装 Tailwind CSS [Taiwind css](https://www.w3cschool.cn/tailwind_css/tailwind_css-izj53p90.html?RECACHE=1) 

通过 npm 安装 Tailwind

```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

创建您的配置文件

接下来，生成您的 `tailwind.config.js` 和 `postcss.config.js` 文件：

```
npx tailwindcss init -p
```

这将会在您的项目根目录创建一个最小化的 `tailwind.config.js` 文件：

```js
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

这也将会创建一个包含已配置好的 `tailwindcss `和 `autoprefixer `的 `postcss.config.js` 配置文件：

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

配置 Tailwind 来移除生产环境下没有使用到的样式声明

在您的 `tailwind.config.js` 文件中，配置 `purge `选项指定所有的 pages 和 components 文件，使得 Tailwind 可以在生产构建中对未使用的样式进行摇树优化。

```js
// tailwind.config.js
  module.exports = {
    purge: [],
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
```

在您的 CSS 中引入 Tailwind

创建 `./src/index.css` 文件 并使用 `@tailwind` 指令来包含 Tailwind的 `base`、 `components `和 `utilities `样式，来替换掉原来的文件内容。

```css
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind 会在构建时将这些指令转换成所有基于您配置的设计系统生成的样式文件。

最后，确保您的 CSS 文件被导入到您的 `./src/main.js` 文件中。

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')
```

您已经完成了所有步骤！现在，当您运行 `npm run dev`, Tailwind CSS 就可以在您的 Vue 3 and Vite 项目中使用了。



# v-model

- prop：`value` -> `modelValue`；
- 事件：`input` -> `update:modelValue`；
- `v-bind` 的 `.sync` 修饰符和组件的 `model` 选项已移除
- 新增 支持多个v-model
- 新增 支持自定义 修饰符 Modifiers

