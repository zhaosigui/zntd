/*
 * @Author: zhaosigui
 * @Date: 2024-01-19 16:32:59
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-01-19 18:07:57
 * @FilePath: \antd\zntd\src\components\Button\button.tsx
 * @Description:
 */
import React, {
  Children,
  createRef,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import classNames from "classnames";
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}
export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
// 点击事件
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 */
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, size, btnType, children, href, ...restProps } =
    props;
  // btn, btn-lg, btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link && disabled,
  });
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};
Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default,
};
export default Button;
