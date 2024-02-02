import React, { useState } from "react";
import Input from "./input";
import { Meta, StoryObj, StoryFn, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
const onChange = action('change');
const ControlledInput = () => {
  const [value, setValue] = useState('');
  // https://zh-hans.react.dev/reference/react-dom/components/input
  // input 组件中不可同时使用defaultValue 和value，input只能在受控和非受控之间选择
  return <Input value={value} defaultValue={value} onChange={(e) => setValue(e.target.value)} />;
};
const meta: Meta<typeof Input> = {
  title: "Input Component",
  // 生成文档
  tags: ["autodocs"],
  component: Input,
  parameters: {
    docs: {
      // page: mdx
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Input>;
const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Default: Story = {
  render: function Render(args) {
    return (
      <>
        <Input onChange={onChange}/>
        <ControlledInput />
      </>
    );
  },
};
Default.storyName = "默认按钮";


// export const Default = Template.bind({});
// Default.args = {
  
// };
// Default.storyName = "input";

export const disabledInput = Template.bind({});
disabledInput.args = {
  size: "lg",
  placeholder: "disabled input",
  disabled: true,
};
disabledInput.storyName = "被禁用的Input";

export const IconInput = Template.bind({});
IconInput.args = {
  placeholder: "input with icon",
  icon: "search",
};
IconInput.storyName = "带图标的Input";

export const SizeInput = () => (
  <>
    <Input defaultValue="large size" size="lg" />
    <Input placeholder="small size" size="sm" />
  </>
);
SizeInput.storyName = "大小不同的 Input";
export const PreixInput = () => (
  <>
    <Input defaultValue="prepend text" prepend="https://" />
    <Input defaultValue="google" append=".com" />
  </>
);

PreixInput.storyName = "带前后缀的 Input";
