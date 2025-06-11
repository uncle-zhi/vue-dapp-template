import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// 读取环境变量，决定 base 路径
const projectName = process.env.VITE_PROJECT_NAME || '/'

// https://vite.dev/config/
export default defineConfig({
  base: projectName === '/' ? '/' : `/${projectName}/`,
  plugins: [vue(),
       Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
})
