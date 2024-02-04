/*
 * @Author: zhaosigui
 * @Date: 2024-01-19 14:28:33
 * @LastEditors: zhaosigui
 * @LastEditTime: 2024-02-04 13:35:48
 * @FilePath: \antd\zntd\src\App.tsx
 * @Description:
 */
import React, { useEffect, useState } from "react";
import axios from 'axios'
const App:React.FC = ()=>{
  const [title, setTitle] = useState('')
  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts/1',{
      headers:{
        'X-Requested-with': 'XMLHttpRequest',
      },
      responseType:'json'
    }).then(res=>{
      console.log(res);
      setTitle(res.data.title)
    })
  })
  return (
    <div className="App">
      <div>12312</div>
      {title}
    </div>
  );
}

export default App;
