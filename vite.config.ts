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
      { find: '@Components', replacement: resolve('./src/Components/') },
      { find: '@Hooks', replacement: resolve('./src/Hooks/') },
      { find: '@Styles', replacement: resolve('./src/Styles/') },
    ],
  },
};

export default config;
