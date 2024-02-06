/*
 * @Author: zhaosigui
 * @Date: 2024-02-05 14:43:03
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-06 11:43:12
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
  const { dispatch, fields } = useContext(FormContext);
  const rowClass = classNames("zntd-row", {
    "zntd-row-no-label": !label,
  });
  // 挂载的时候进行fields注册
  useEffect(() => {
    dispatch({ type: "addField", name, value: { label, name } });
  }, []);
  // 获取对应的fieldState
  const fieldState = fields[name];
  const value = fieldState && fieldState.value;
  const onValueUpdate = (e: any) => {
    const value = e.target.value;
    dispatch({ type: "updateValue", name, value });
    console.log(value);
  };
  // 1、手动的创建一个属性列表，需要有value以及onchange属性，
  // todo 适应不同的事件及value 属性名称
  const controlProps: Record<string, any> = {};
  controlProps.value = value;
  controlProps.onChange = onValueUpdate;
  // 2、获取children的第一个原生
  // todo children 不可能只有一个
  const childList = React.Children.toArray(children);
  console.log("childList", childList);
  const child = childList[0] as React.ReactElement;
  console.log('child', child);
  
  // 3、cloneElement，混合这个child以及手动属性列表
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  });
  console.log('returnChildNode', returnChildNode);
  
  return (
    <div className={rowClass}>
      {label && (
        <div className="zntd-form-item-label">
          <label title={label}>{label}</label>
        </div>
      )}
      <div className="zntd-form-item">{returnChildNode}</div>
    </div>
  );
};
FormItem.defaultProps = {};
export default FormItem;
