/*
 * @Author: zhaosigui
 * @Date: 2024-01-31 15:36:27
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-06 21:35:42
 * @FilePath: \antd\zntd\src\components\Form\form.stories.tsx
 * @Description:
 */
import React, { useRef } from "react";
import Form, { IFormRef } from "./form";
import Item from "./formItem";
import Input from "../Input";
import Button from "../Button";
import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { CustomRule } from "./useStore";
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
const confirmRules: CustomRule[] = [
  { type: "string", required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      console.log("the value", getFieldValue("password"));
      console.log("the rule", getFieldValue("password"));
      console.log(value);
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue("password")) {
          reject("The two passwords that you entered do not match!");
        }
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },
  }),
];

export const BasicForm: StoryFn<typeof Form> = (args) => {
  console.log('BasicForm-args', args);
  return (
    <Form {...args}>
      <Item
        label="用户名"
        name="name"
        rules={[{ type: "string", required: true, min: 3 }]}
      >
        <Input />
      </Item>
      <Item
        label="密码"
        name="password"
        rules={[{ type: "string", required: true, min: 3, max: 8 }]}
      >
        <Input type="password" />
      </Item>
      <div className="zntd-form-submit-area">
        <Button type="submit" btnType="primary">
          登陆
        </Button>
      </div>
    </Form>
  );
};
BasicForm.storyName = "基本的登陆表单";

export const RegForm: StoryFn<typeof Form> = (args) => {
  const initialValues = {
    agreement: false,
  };
  console.log('RegForm-args', args);
  
  return (
    <Form initialValues={initialValues} {...args}>
      <Item
        label="邮件"
        name="email"
        rules={[{ type: "email", required: true }]}
      >
        <Input />
      </Item>
      <Item
        label="密码"
        name="password"
        rules={[{ type: "string", required: true, min: 3, max: 8 }]}
      >
        <Input type="password" />
      </Item>
      {/* <Item
        label="性别"
        name="gender"
        rules={[{ type: "string", required: true }]}
        getValueFromEvent={(e) => e}
        valuePropName="defaultValue"
      >
        <Select
          placeholder="请选择性别"
        >
          <Select.Option value="男" />
          <Select.Option value="女" />
        </Select>
      </Item> */}
      <div
        className="agreement-section"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Item
          name="agreement"
          rules={[{ type: "enum", enum: [true], message: "请同意协议" }]}
          getValueFromEvent={(e) => e.target.checked}
          valuePropName="checked"
        >
          <input type="checkbox" />
        </Item>
        <span className="agree-text">
          注册即代表你同意<a href="#">用户协议</a>
        </span>
      </div>
      <div className="zntd-form-submit-area">
        <Button type="submit" btnType="primary">
          登陆
        </Button>
      </div>
    </Form>
  );
};
RegForm.storyName = "注册表单，FormItem组件";
RegForm.storyName = "注册表单，FormItem组件";

export const FullForm: StoryFn<typeof Form> = (args) => {
  console.log('FullForm-args', args);
  
  const ref = useRef<IFormRef>(null);
  const resetAll = () => {
    console.log("form ref", ref.current);
    console.log("get value", ref.current?.getFieldValue("username"));
    ref.current?.resetFields();
  };
  return (
    <Form
      initialValues={{ username: "username", agreement: false }}
      {...args}
      ref={ref}
    >
      {({ isSubmitting, isValid }) => (
        <>
          <Item
            label="用户名"
            name="username"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Item>
          <Item
            label="密码"
            name="password"
            rules={[{ type: "string", required: true, min: 3, max: 8 }]}
          >
            <Input type="password" />
          </Item>
          <Item label="重复密码" name="confirmPwd" rules={confirmRules}>
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
              rules={[{ type: "enum", enum: [true], message: "请同意协议" }]}
            >
              <input type="checkbox" />
            </Item>
            <span className="agree-text">
              注册即代表你同意<a href="#">用户协议</a>
            </span>
          </div>
          <div className="zntd-form-submit-area">
            <Button type="submit" btnType="primary">
              登陆 {isSubmitting ? "验证中" : "验证完毕"}{" "}
              {isValid ? "通过😄" : "没通过😢"}{" "}
            </Button>
            <Button type="button" btnType="primary" onClick={resetAll}>
              重置
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};
FullForm.storyName = "自定义规则，调用表单实例";
