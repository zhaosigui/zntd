import React, { useState, useReducer } from "react";
export interface FieldDetail {
  name: string;
  value: string;
  rules: any[];
  isValid: boolean;
  //错误信息
  errors: any[];
}
export interface FieldsState {
  [key: string]: FieldDetail;
}
export interface FormState {
  isValid: boolean;
}

export interface FieldsAction {
  type: "addField" | "12";
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
        // 类似于这种数据结构 'usename': {name: '',value: '', rules:[], isValid:true}
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
  return {
    fields,
    dispatch,
    form,
  };
}
export default useStore;
