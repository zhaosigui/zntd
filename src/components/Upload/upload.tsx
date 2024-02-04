/*
 * @Author: zhaosigui
 * @Date: 2024-02-04 14:01:43
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-04 15:24:17
 * @FilePath: \antd\zntd\src\components\UpLoad\upLoad.tsx
 * @Description:
 */
import axios from "axios";
import React, { ChangeEvent, useRef } from "react";
import Button from "../Button";
type UpLoadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadProps {
   /**必选参数, 上传的地址 */
   action: string;
   /**上传的文件列表,*/
   defaultFileList?: UploadFile[];
   /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。 */
   beforeUpload? : (file: File) => boolean | Promise<File>;
   /**文件上传时的钩子 */
   onProgress?: (percentage: number, file: UploadFile) => void;
   /**文件上传成功时的钩子 */
   onSuccess?: (data: any, file: UploadFile) => void;
   /**文件上传失败时的钩子 */
   onError?: (err: any, file: UploadFile) => void;
   /**文件状态改变时的钩子，上传成功或者失败时都会被调用	 */
   onChange?: (file: UploadFile) => void;
   /**文件列表移除文件时的钩子 */
   onRemove?: (file: UploadFile) => void;
   /**设置上传的请求头部 */
   headers?: {[key: string]: any };
   /**上传的文件字段名 */
   name?: string;
   /**上传时附带的额外参数 */
   data?: {[key: string]: any };
   /**支持发送 cookie 凭证信息 */
   withCredentials?: boolean;
   /**可选参数, 接受上传的文件类型 */
   accept?: string;
   /**是否支持多选文件 */
   multiple?: boolean;
   /**是否支持拖拽上传 */
   drag?: boolean;
   children?: React.ReactNode
}
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UpLoadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'vikingship'
 * ~~~
 */
export const Upload: React.FC<UploadProps> = (props) => {
  const { action, beforeUpload, onProgress, onSuccess, onError, onChange } =
    props;
  const fileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    const formData = new FormData();
    formData.append(file.name, file);
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e: any) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        console.log(res);
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        console.error(err);
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  return (
    <div className="zntd-upload-component">
      <Button btnType="primary" onClick={handleClick}>
        Upload file
      </Button>
      <input
        ref={fileInput}
        className="zntd-file-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
        type="file"
      ></input>
    </div>
  );
};
export default Upload;
