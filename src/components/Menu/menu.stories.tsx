/*
 * @Author: zhaosigui
 * @Date: 2024-01-31 15:36:27
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-01-31 18:03:35
 * @FilePath: \antd\zntd\src\components\Menu\menu.stories.tsx
 * @Description:
 */
import React from "react";
import Menu from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";
import type {
  ComponentMeta,
  ComponentStory,
  ComponentStoryFn,
  Meta,
  StoryObj,
  StoryFn,
} from "@storybook/react";
//  Use `StoryObj` instead, e.g. ComponentStoryObj<typeof Button> -> StoryObj<typeof Button>.
// Use `Meta` instead, e.g. ComponentMeta<typeof Button> -> Meta<typeof Button>.
const meta: Meta<typeof Menu> = {
  title: "Menu Component",
  id: "Menu",
  //生成文档
  tags: ["autodocs"],
  component: Menu,
  // fix stort7不支持subcomponents，子组件文档生成
  // subcomponents: {
  //   'SubMenu': SubMenu,
  //   'MenuItem': MenuItem,
  // },
  // 全局的参数
  args: {
    defaultIndex: "0",
  },
  argTypes: {
    // defaultIndex: {
    // control: 'color',
    // description: 'test'
    // }
  },
  parameters: {
    controls: {
      matchers: {
        // 将mode 变为date形式
        // date: /mode/
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;
const Template: StoryFn<typeof Menu> = (args) => {
  return (
    <Menu {...args}>
      <MenuItem>first Link</MenuItem>
      <MenuItem> sencord Link</MenuItem>
      <SubMenu title="下拉选项">
        <MenuItem>下拉一</MenuItem>
        <MenuItem>下拉二</MenuItem>
      </SubMenu>
      <MenuItem disabled>disabled</MenuItem>
    </Menu>
  );
};
export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = "默认的Menu";

export const ClickMenu = Template.bind({});
ClickMenu.args = {
  defaultIndex: "0",
  mode: "vertical",
};
ClickMenu.argTypes = {
  // 将index修改成颜色提取
  // https://storybook.js.org/docs/essentials/controls#choosing-the-control-type
  defaultIndex: {
    // control: 'color'
  },
};
/**
 *
 */
ClickMenu.parameters = {
  backgrounds: {
    values: [
      {
        name: "red",
        value: "#f00",
      },
      {
        name: "green",
        value: "#0f0",
      },
    ],
  },
};
ClickMenu.storyName = "纵向的Menu";
