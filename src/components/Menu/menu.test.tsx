/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  cleanup,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import { WritableStream } from "node:stream/web";

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: "vertical",
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>default</MenuItem>
    </Menu>
  );
};
let menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component in default(horizontal) mode", () => {
    // 每次测试前开始执行, 用于合并相同的测试逻辑
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    const wrapper = render(generateMenu(testProps));
    // wrapper.container.append(createStyleFile())
    // eslint-disable-next-line testing-library/prefer-screen-queries
    menuElement = wrapper.getByTestId("test-menu");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    activeElement = wrapper.getByText("active");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    disabledElement = wrapper.getByText("disabled");
  });
  // let { container, rerender, queryByText, getByTestId, unmount } = render(
  //   generateMenu(testProps)
  // );
  // eslint-disable-next-line testing-library/render-result-naming-convention
  // eslint-disable-next-line testing-library/no-debugging-utils
  screen.debug();
  // beforeEach(() => {
  // wrapper.container.append(createStyleFile())
  menuElement = screen.getByTestId("test-menu");
  activeElement = screen.getByText("active");
  disabledElement = screen.getByText("disabled");
  // });
  it("should render corrent Menu and  MenuItem base on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("zntd-menu test");

    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    // expect(container.getElementsByTagName("li").length).toEqual(3);

    // eslint-disable-next-line testing-library/no-node-access,
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    const thirdItem = screen.getByText("default");
    const activeEl = screen.getByText("active");
    const disabledEl = screen.getByText("active");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeEl).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledEl);
    expect(disabledEl).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });
  it("should render vertical mode when mode is set to vertical", () => {
    render(generateMenu(testVerProps));
  });
});
