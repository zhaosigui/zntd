/*
 * @Author: zhaosigui
 * @Date: 2024-01-31 15:36:27
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-06 12:24:11
 * @FilePath: \antd\zntd\src\components\Form\form.stories.tsx
 * @Description:
 */
import React from "react";
import Form from "./form";
import Item from "./formItem";
import Input from "../Input";
import Button from "../Button";
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
  decorators: [
    (Story) => {
      return (
        <div style={{ width: "550px" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Form>;
export const BasicForm: StoryFn<typeof Form> = (args) => {
  return (
    <Form initiaValues={{username: 'username', agreement: true}}>
      <Item label="用户名" name="username">
        <Input />
      </Item>
      <Item label="密码" name="password">
        <Input type="password" />
      </Item>
      <div
        className="agreement-section"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Item
          name="agreement"
          valuePropName="checked"
          getValueFromEvent={(e) => e.target.checked}
        >
          <input type="checkbox" />
        </Item>
        <span className="agree-text">
          注册即代表你同意<a href="#">用户协议</a>
        </span>
      </div>
      <div className="zntd-form-submit-area">
        <Button type="submit" btnType="primary">
          登录
        </Button>
      </div>
    </Form>
  );
};
BasicForm.storyName = "普通的 Form 组件";
