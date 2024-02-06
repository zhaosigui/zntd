/*
 * @Author: zhaosigui
 * @Date: 2024-02-05 14:43:03
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-06 11:59:13
 * @FilePath: \antd\zntd\src\components\Form\formItem.tsx
 * @Description:
 */
import React, { useContext, useEffect, ReactNode } from "react";
import classNames from "classnames";
import { FormContext } from "./form";
export interface FormItemProps {
  // 类似于 'usename': {name: '',value: '', rules:[], isValid:true}中的 key--usename
  /**字段名 */
  name: string;
  /**label 标签的文本 */
  label?: string;
  children?: ReactNode;
  /**子节点的值的属性，如 checkbox 的是 'checked' */
  valuePropName?: string;
  /**设置收集字段值变更的时机 */
  trigger?: string;
  /**设置如何将 event 的值转换成字段值 */
  getValueFromEvent?: (event: any) => any;
  /**校验规则，设置字段的校验逻辑。请看 async validator 了解更多规则 */
  // rules?: CustomRule[];
  /**设置字段校验的时机 */
  // validateTrigger?: string;
}
export const FormItem: React.FC<FormItemProps> = (props) => {
  const { label, children, name, valuePropName, trigger, getValueFromEvent } =
    props;
  console.log("children", children);

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
    const value = getValueFromEvent && getValueFromEvent(e);
    dispatch({ type: "updateValue", name, value });
    console.log(value);
  };
  // 1、手动的创建一个属性列表，需要有value以及onchange属性，
  const controlProps: Record<string, any> = {};
  controlProps[valuePropName!] = value;
  // trigger! 中！表示非空
  controlProps[trigger!] = onValueUpdate;
  // 2、获取children的第一个原生
  const childList = React.Children.toArray(children);
  // 没有子组件
  if (childList.length === 0) {
    console.error(
      "No child element found in Form.Item, please provide one form component"
    );
  }
   // 子组件大于一个
   if (childList.length > 1) {
    console.warn('Only support one child element in Form.Item, others will be omitted')
  }
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element')
  }
  const child = childList[0] as React.ReactElement;

  // 3、cloneElement，混合这个child以及手动属性列表
  const returnChildNode = React.cloneElement(child, {
    ...child.props,
    ...controlProps,
  });
  console.log("returnChildNode", returnChildNode);

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
FormItem.defaultProps = {
  valuePropName: "value",
  trigger: "onChange",
  getValueFromEvent: (e) => e.target.value,
};
export default FormItem;
