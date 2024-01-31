/*
 * @Author: zhaosigui
 * @Date: 2024-01-29 15:38:31
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-01-31 14:36:46
 * @FilePath: \antd\zntd\.storybook\main.ts
 * @Description: 
 */
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  // 加载的文件
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
};
export default config;
