/*
 * @Author: zhaosigui
 * @Date: 2024-02-05 14:43:03
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-05 15:59:08
 * @FilePath: \antd\zntd\src\components\Form\formItem.tsx
 * @Description:
 */
import React from "react";
import classNames from "classnames";
export interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
}
export const FormItem: React.FC<FormItemProps> = (props) => {
  const { label, children } = props;
  const rowClass = classNames("zntd-row", {
    "zntd-row-no-label": !label,
  });
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
