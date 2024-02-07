import type { Preview } from "@storybook/react";
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons'
import '../src/styles/index.scss'
library.add(fas)
const preview: Preview = {
  parameters: {
    // 点击事件
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewMode: 'docs',
    options: {
      storySort: {
        // 文档顺序
        order: ['Welcome'], 
      },
    },
  },
};

export default preview;
