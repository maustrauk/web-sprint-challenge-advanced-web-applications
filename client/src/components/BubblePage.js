import React, { useState, useEffect } from "react";
import { axiosWithAuth } from './../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [rerender, setRerender] = useState(false);
  
  useEffect(() => {
    getData();
  },[rerender]);

  const getData = () => {
    axiosWithAuth()
    .get('/colors')
    .then(res => {
      setColorList(res.data);
    })
    .catch(err => {
        console.log(err);
    })
};


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} rerender={rerender} setRerender={setRerender}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
