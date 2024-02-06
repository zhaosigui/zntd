/*
 * @Author: zhaosigui
 * @Date: 2024-02-05 14:43:03
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-06 19:44:02
 * @FilePath: \antd\zntd\src\components\Form\form.tsx
 * @Description:
 */
import React, { createContext, forwardRef, ReactNode } from "react";
import useStore, { FormState } from "./useStore";
import { ValidateError } from "async-validator";
// https://zh-hans.legacy.reactjs.org/docs/render-props.html
export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
  /**表单名称，会作为表单字段 id 前缀使用 */
  name?: string;
  /**表单默认值，只有初始化以及重置时生效 */
  initialValues?: Record<string, any>;
  children?: ReactNode | RenderProps;
  /**提交表单且数据验证成功后回调事件 */
  onFinish?: (values: Record<string, any>) => void;
  /**提交表单且数据验证失败后回调事件 */
  onFinishFailed?: (
    values: Record<string, any>,
    errors: Record<string, ValidateError[]>
  ) => void;
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
  const { name, children, initialValues, onFinish, onFinishFailed } = props;
  // 初始化store
  const { form, fields, dispatch, validateField, validateAllField } =
    useStore();
  // 通过FormContext 将dispatch 传递给子组件
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };
  // 提交全部验证
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllField();
    if (isValid && onFinish) {
      onFinish(values);
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors);
    }
  };
  let childrenNode: ReactNode;
  if (typeof children === "function") {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }
  return (
    <>
      <form name={name} className="zntd-form" onSubmit={submitForm}>
        <FormContext.Provider value={passedContext}>
          {childrenNode}
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
