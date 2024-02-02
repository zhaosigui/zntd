import React, {
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
  forwardRef,
} from "react";

import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";
export type InputSize = "lg" | "sm";
// export interface BaseInputProps {
//   className?: string;
//   disabled?: boolean;
//   size?: Inputsize;
//   icon?: IconProp;
//   children?: React.ReactNode;
//   prepand?: string | React.ReactElement;
//   append?: string | React.ReactElement;
// }
// // input 基础属性
// export type NativeInputProps = BaseInputProps &
//   Omit<InputHTMLAttributes<HTMLInputElement>, "size">;
// export type InputProps = NativeInputProps;
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'zntd'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  const {
    children,
    disabled,
    size,
    className,
    prepend,
    style,
    icon,
    append,
    ...restProps
  } = props;
  const classes = classNames("zntd-input-wrapper", className, {
    "is-disabled": disabled,
    [`input-size-${size}`]: size,
    "input-group": prepend || append,
    "input-group-prepend": prepend,
    "input-group-append": append,
  });
 
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    // 在default和value
    delete restProps.defaultValue
    // 为了解决input初始值为undefined，这时input为非受控组件，后用onchange来修改输入框的值，此方法为受控组件
    // 组件正在由非受控转换为受控组件
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="zntd-input-grouo-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        ref={ref}
        {...restProps}
        disabled={disabled}
        className="zntd-input-inner"
      />
      {append && <div className="zntd-input-grouo-append">{append}</div>}
    </div>
  );
});
export default Input;
