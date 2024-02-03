import React, { useState, useEffect, ReactElement, ChangeEvent } from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from '../Icon/icon'
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps
  extends Omit<InputProps, "onSelect" | "onChange"> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void;
  /** 文本框发生改变的时候触发的事件*/
  onChange?: (value: string) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
  data: string[];
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'zntd'
 * ~~~
 */
// 这里export是为了迎合storybook自动生成文档
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { onSelect, fetchSuggestions, value, renderOption, onChange, ...restsProps } =
    props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (onChange) {
      onChange(value)
    }
    if (value) {
      const results = fetchSuggestions(value);
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item)
    }
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropDown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <div className="zntd-auto-complete">
        <Input value={inputValue} onChange={handleChange} {...restsProps} />
        {loading && <Icon icon="spinner" spin/>}
        {suggestions.length && generateDropDown()}
      </div>
    </>
  );
};
export default AutoComplete;
