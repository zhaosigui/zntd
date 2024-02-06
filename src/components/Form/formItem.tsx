/*
 * @Author: zhaosigui
 * @Date: 2024-02-05 14:43:03
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-06 10:53:03
 * @FilePath: \antd\zntd\src\components\Form\formItem.tsx
 * @Description:
 */
import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { FormContext } from "./form";
export interface FormItemProps {
  // 类似于 'usename': {name: '',value: '', rules:[], isValid:true}中的 key--usename
  name: string;
  label?: string;
  children?: React.ReactNode;
}
export const FormItem: React.FC<FormItemProps> = (props) => {
  const { label, children, name } = props;
  // 获取父组件传递的dispatch 各种属性
  const { dispatch } = useContext(FormContext);
  const rowClass = classNames("zntd-row", {
    "zntd-row-no-label": !label,
  });
  // 挂载的时候进行fields注册
  useEffect(() => {
    dispatch({ type: "addField", name, value: { label, name } });
  }, []);
  return (
    <div className={rowClass}>
      {label && (
        <div className="zntd-form-item-label">
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="zntd-form-item">{children}</div>
    </div>
  );
};
FormItem.defaultProps = {};
export default FormItem;
