/*
 * @Author: zhaosigui
 * @Date: 2024-02-05 14:43:03
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-05 14:47:49
 * @FilePath: \antd\zntd\src\components\Form\form.tsx
 * @Description:
 */
import React from "react";
export interface FormProps {
  name?: string;
  children?: React.ReactNode;
}
export const Form: React.FC<FormProps> = (props) => {
  const { name, children } = props;
  return (
    <form name={name} className="zntd-form">
      {children}
    </form>
  );
};
Form.defaultProps = {
  name: 'zntd_form'
}
export default Form;
