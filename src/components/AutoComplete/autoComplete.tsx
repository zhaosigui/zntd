import React, {
  useState,
  useEffect,
  ReactElement,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
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
  const {
    onSelect,
    fetchSuggestions,
    value,
    renderOption,
    onChange,
    ...restsProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debouncedValue]);
  // input输入框改变
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    triggerSearch.current = true;
    if (onChange) {
      onChange(value);
    }
  };
  // 点击下拉数据
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  // 键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        // 回车
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        // 上
        highlight(highlightIndex - 1);
        break;
      case 40:
        //下
        highlight(highlightIndex + 1);
        break;
      case 27:
        // esc
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropDown = () => {
    return (
      <ul className="zntd-suggestion-list">
        {loading && (
          <div className="suggstions-loading-icon">
            <Icon icon="spinner" spin />
          </div>
        )}
        {suggestions.map((item, index) => {
          const cnames = classNames("suggestion-item", {
            "is-active": index === highlightIndex,
          });
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <div className="zntd-auto-complete" ref={componentRef}>
        <Input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...restsProps}
        />
        {loading && <Icon icon="spinner" spin />}
        {suggestions.length > 0 && generateDropDown()}
      </div>
    </>
  );
};
export default AutoComplete;
