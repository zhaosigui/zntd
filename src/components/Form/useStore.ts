import React, { useState, useReducer } from "react";
import Schema, { RuleItem, ValidateError } from "async-validator";
export interface FieldDetail {
  name: string;
  value: string;
  rules: RuleItem[];
  isValid: boolean;
  //错误信息
  errors: ValidateError[];
}
export interface FieldsState {
  [key: string]: FieldDetail;
}
export interface FormState {
  isValid: boolean;
}

export interface FieldsAction {
  type: "addField" | "updateValue" | "updateValidateResult";
  name: string;
  value: any;
}
// 利用react useReducer
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case "addField":
      return {
        ...state,
        [`${action.name}`]: { ...action.value },
        // 类似于这种数据结构 'usename': {name: '',value: '', rules:[], isValid:true, errors:[]}
      };
    // 更新值
    case "updateValue":
      return {
        ...state,
        [`${action.name}`]: { ...state[action.name], value: action.value },
        // 类似于这种数据结构 'usename': {name: '',value: '', rules:[], isValid:true, errors:[]}
      };
    // 验证
    case "updateValidateResult":
      const { isValid, errors } = action.value;
      return {
        ...state,
        [`${action.name}`]: {
          ...state[action.name],
          isValid,
          errors,
        },
        // 类似于这种数据结构 'usename': {name: '',value: '', rules:[], isValid:true, errors:[]}
      };
    default:
      return state;
  }
}

// * react hooks
// * class -ant design 实现方式

function useStore() {
  // form state
  const [form, setForm] = useState<FormState>({ isValid: true });
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const descriptor = {
      [name]: rules,
    };
    const valueMap = {
      [name]: value,
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valueMap);
    } catch (e) {
      isValid = false;
      const err = e as any;
      console.log("e", err.errors);
      console.log("fields", err.fields);
      errors = err.errors;
    } finally {
      console.log("errors", isValid);
      dispatch({
        type: "updateValidateResult",
        name,
        value: { isValid, errors },
      });
    }
  };
  return {
    fields,
    dispatch,
    form,
    validateField
  };
}
export default useStore;
