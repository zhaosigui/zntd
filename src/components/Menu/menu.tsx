/*
 * @Author: zhaosigui
 * @Date: 2024-01-23 15:14:49
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-01-31 15:36:47
 * @FilePath: \antd\zntd\src\components\Menu\menu.tsx
 * @Description:
 */
import React, { useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
type Mode = "horizontal" | "vertical";
type SelectCallback = (selectIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: Mode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children?: React.ReactNode;
  // 默认展开项
  defaultOpenSubMenus?: string[];
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: Mode;
  defaultOpenSubMenus?: string[]
}
export const MenuContext = React.createContext<IMenuContext>({
  index: "0",
});
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * 
 * ```javascript
 * import { Menu } from 'zntd'
 * 
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const { children, className, defaultIndex, mode, style, onSelect, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("zntd-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  // 这是为了遵循react 自顶向下的数据流规则，所以采用
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // 将index 混入到元素属性中, 可以避免必传index
        const cloneElement = React.cloneElement(childElement, {
          index: index.toString(),
        });
        return cloneElement;
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: []
  
};
export default Menu;
