/*
 * @Author: zhaosigui
 * @Date: 2024-01-20 13:16:55
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-01-24 01:03:47
 * @FilePath: \antd\zntd\src\components\Button\button.test.tsx
 * @Description: 
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
const defaultProps = {
  // 创建一个点击事件
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "kclass ",
};
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};
test("our first react test case", () => {
  render(<Button>Nice</Button>);
  expect(screen.getByText("Nice")).toBeTruthy();
});

describe("test button components", () => {
  it("should render the correct default button", () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const element = screen.getByText("Nice") as HTMLButtonElement;
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    expect(element.disabled).toBeFalsy();
    // 模拟用户点击事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the correct cpmponent base on different props", () => {
    render(<Button {...testProps}>Nice</Button>);
    const element = screen.getByText("Nice");
    expect(element).toHaveClass("btn kclass btn-primary btn-lg");
  });
  it("should render a link when btnType equals link and href is provided", () => {
    render(
      <Button btnType={ButtonType.Link} href="http://www.baidu.com">
        LINK
      </Button>
    );
    const element = screen.getByText("LINK");
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });
  it("should render disabled button when disabled set to true", () => {
    render(<Button {...disabledProps}>Nice</Button>);
    // html上没有disabled属性，所以断言成HTMLButtonElement
    const element = screen.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
