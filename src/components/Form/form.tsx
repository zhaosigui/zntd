/*
 * @Author: zhaosigui
 * @Date: 2024-02-05 14:43:03
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-06 18:18:29
 * @FilePath: \antd\zntd\src\components\Form\form.tsx
 * @Description:
 */
import React, { createContext, forwardRef } from "react";
import useStore from "./useStore";
export interface FormProps {
  name?: string;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
}
// export interface IFormContext {
//   dispatch: React.Dispatch<any>;
// }
// ReturnType--拿到一个函数的返回类型, Pick选择一个只要的返回类型
export type IFormContext = Pick<
  ReturnType<typeof useStore>,
  "dispatch" | "fields" | "validateField"
> &
  Pick<FormProps, "initialValues">;
export type IFormRef = Omit<
  ReturnType<typeof useStore>,
  "fields" | "dispatch" | "form"
>;
export const FormContext = createContext<IFormContext>({} as IFormContext);
export const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { name, children, initialValues } = props;
  // 初始化store
  const { form, fields, dispatch, validateField } = useStore();
  // 通过FormContext 将dispatch 传递给子组件
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };
  return (
    <>
      <form name={name} className="zntd-form">
        <FormContext.Provider value={passedContext}>
          {children}
        </FormContext.Provider>
      </form>
      <div>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(fields)}</pre>
        <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(form)}</pre>
      </div>
    </>
  );
});
Form.defaultProps = {
  name: "zntd_form",
};
export default Form;
