import React from "react";
import { ComponentMeta, Meta, StoryFn } from "@storybook/react";
import { Upload } from "./upload";
import Button from "../Button/button";
import Icon from "../Icon/icon";
import { action } from "@storybook/addon-actions";
const onError = action("onError");
const onProgress = action("onProgress");
const onSuccess = action("onSuccess");
const onChange = action("onChange");
const meta: Meta<typeof Upload> = {
  title: "Upload component",
  id: "Upload",
  tags: ["autodocs"],
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
};
export default meta;
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert("file to big");
    return false;
  }
  return true;
};
const filePromise = (file: File) => {
  // 修改文件名
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};
export const ASimpleUpload: StoryFn<typeof Upload> = (args) => (
  <Upload
    {...args}
    action="https://jsonplaceholder.typicode.com/posts"
    onError={onError}
    onProgress={onProgress}
    onSuccess={onSuccess}
    onChange={onChange}
    // beforeUpload={checkFileSize}
    beforeUpload={filePromise}
  >
    {/* <Button size="lg" btnType="primary">
      <Icon icon="upload" /> 点击上传{" "}
    </Button> */}
  </Upload>
);
ASimpleUpload.storyName = "普通的 Upload 组件";
// export const BCheckUpload: StoryFn<typeof Upload> = (args) => {
//   const checkFileSize = (file: File) => {
//     if (Math.round(file.size / 1024) > 50) {
//       alert("file too big");
//       return false;
//     }
//     return true;
//   };
//   return (
//     <Upload
//       {...args}
//       action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//       beforeUpload={checkFileSize}
//     >
//       <Button size="lg" btnType="primary">
//         <Icon icon="upload" /> 不能传大于50Kb！{" "}
//       </Button>
//     </Upload>
//   );
// };
// BCheckUpload.storyName = "上传前检查文件大小";
// export const CDragUpload: StoryFn<typeof Upload> = (args) => (
//   <Upload
//     {...args}
//     action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//     name="fileName"
//     multiple
//     drag
//   >
//     <Icon icon="upload" size="5x" theme="secondary" />
//     <br />
//     <p>点击或者拖动到此区域进行上传</p>
//   </Upload>
// );
// CDragUpload.storyName = "拖动上传";
