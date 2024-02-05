/*
 * @Author: zhaosigui
 * @Date: 2024-01-31 15:36:27
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-05 14:47:28
 * @FilePath: \antd\zntd\src\components\Form\form.stories.tsx
 * @Description:
 */
import React from "react";
import Form from './form'
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
const meta: Meta<typeof Form> = {
  title: "Form Component",
  id: "Form",
  //生成文档
  tags: ["autodocs"],
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;
export const ASimpleForm: StoryFn<typeof Form> = (args) => (
  <Form
   
  >
  </Form>
);
ASimpleForm.storyName = "普通的 Form 组件";

