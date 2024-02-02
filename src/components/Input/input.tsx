import React, {
  InputHTMLAttributes,
  AnchorHTMLAttributes,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export type Inputsize = "lg" | "sm";
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
  className?: string;
  disabled?: boolean;
  size?: Inputsize;
  icon?: IconProp;
  children?: React.ReactNode;
  prepand?: string | React.ReactElement;
  append?: string | React.ReactElement;
}
const Input: React.FC<InputProps> = (props) => {
  const { children, disabled, size, className, ...restProps } = props;
  const classes = classNames("zntd-input", className, {
    disabled,
  });
  return <input {...restProps} disabled className={classes}></input>;
};
export default Input;
