import React, { useState, useEffect } from "react";
import getData from './../api/getData';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [rerender, setRerender] = useState(false);
  
  useEffect(() => {
    getData(setColorList);
  },[rerender]);

  return (
    <>
      <ColorList colors={colorList} rerender={rerender} setRerender={setRerender}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
