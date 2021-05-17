import preactRefresh from '@prefresh/vite';
import { resolve } from 'path';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  plugins: [preactRefresh()],
  resolve: {
    alias: [
      { find: '@Screens', replacement: resolve('./src/Screens/') },
      { find: '@Components', replacement: resolve('./src/Components/') },
      { find: '@Types', replacement: resolve('./src/Types/') },
      { find: '@Hooks', replacement: resolve('./src/Hooks/') },
      { find: '@Contexts', replacement: resolve('./src/Contexts/') },
      { find: '@Styles', replacement: resolve('./src/Styles/') },
      { find: '@Utils', replacement: resolve('./src/Utils/') },
    ],
  },
};

export default config;
