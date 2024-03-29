/*
 * @Author: zhaosigui
 * @Date: 2024-02-02 11:49:59
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-04 11:58:26
 * @FilePath: \antd\zntd\src\components\Input\input.test.tsx
 * @Description:
 */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { Input, InputProps } from "./input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};
describe("test Input component", () => {
  it("should render the correct default Input", () => {
    render(<Input {...defaultProps} />);
    const testNode = screen.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("zntd-input-inner");
    fireEvent.change(testNode, { target: { value: "23" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual("23");
  });
  it("should render the disabled Input on disabled property", () => {
    render(<Input disabled placeholder="disabled" />);
    const testNode = screen.getByPlaceholderText(
      "disabled"
    ) as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it("should render different input sizes on size property", () => {
    const { container } = render(<Input placeholder="sizes" size="lg" />);
    const testContainer = container.querySelector(".zntd-input-wrapper");
    expect(testContainer).toHaveClass("input-size-lg");
  });
  it("should render prepand and append element on prepand/append property", () => {
    const { container } = render(
      <Input placeholder="pend" prepend="https://" append=".com" />
    );
    const testContainer = container.querySelector(".zntd-input-wrapper");
    expect(testContainer).toHaveClass(
      "input-group input-group-append input-group-prepend"
    );
    expect(screen.getByText("https://")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
  });
});
