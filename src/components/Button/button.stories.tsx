import React from "react";
import Button from "./button";
import type {
  ComponentMeta,
  ComponentStory,
  ComponentStoryFn,
  Meta,
  StoryObj,
  StoryFn
} from "@storybook/react";
import { scryRenderedDOMComponentsWithTag } from "react-dom/test-utils";
//  Use `StoryObj` instead, e.g. ComponentStoryObj<typeof Button> -> StoryObj<typeof Button>.
// Use `Meta` instead, e.g. ComponentMeta<typeof Button> -> Meta<typeof Button>.
const meta: Meta<typeof Button> = {
  title: "第四章Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;
const Template: StoryFn<typeof Button> = (args) => <Button {...args} />
export const Default = Template.bind({});
Default.args = {
  children: "Default button",
};
Default.storyName = '默认样式按钮'

// export const Large = Template.bind({})
// Large.args = {
//   size: 'lg',
//   children: 'Large Button',
// }
// export const Small = Template.bind({})
// Small.args = {
//   size: 'sm',
//   children: 'Small Button',
// }
// export const Primary = Template.bind({})
// Primary.args = {
//   btnType: 'primary',
//   children: 'Primary Button',
// }
// export const Danger = Template.bind({})
// Danger.args = {
//   btnType: 'danger',
//   children: 'Danger Button',
// }
// export const Link = Template.bind({})
// Link.args = {
//   btnType: 'link',
//   children: 'Link Button',
//   href: 'https://google.com'
// }
export const ButtonWithSize: Story = {
  render: function Render(args) {
    return (
      <>
        <Button size="lg">large button</Button>
        <Button size="sm">small button</Button>
      </>
    );
  },
};
ButtonWithSize.storyName = "不同尺寸按钮";

export const ButtonWithType: Story = {
  render: function Render(args) {
    return (
      <>
        <Button btnType="primary">primary button</Button>
        <Button btnType="danger">danger button</Button>
        <Button btnType="link" href="https://www.baidu.com">
          link button
        </Button>
      </>
    );
  },
};
ButtonWithType.storyName = "不同类型按钮";
