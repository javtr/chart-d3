import React, { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import Tutorial from "./components/Tutorial";
import Test01 from "./components/Test01";


function App() {

  const tempData = [];
  for (let i = 1; i < 30; i++) {
    const obj = {
      Id: 1,
      Type:  i,
      Count: 1 + i
    };
    tempData.push(obj);
  }
  

  const data = [
    { label: 'A', value: 20 },
    { label: 'B', value: 35 },
    { label: 'C', value: 10 },
    { label: 'D', value: 15 },
    { label: 'E', value: 25 },
    { label: 'F', value: 12 },
    { label: 'G', value: 28 },
    { label: 'H', value: 17 },
    { label: 'I', value: 22 },
    { label: 'J', value: 30 },
    { label: 'K', value: 19 },
    { label: 'L', value: 8 },
    { label: 'M', value: 14 },
    { label: 'N', value: 31 },
    { label: 'O', value: 23 },
    { label: 'P', value: 16 },
    { label: 'Q', value: 9 },
    { label: 'R', value: 26 },
    { label: 'S', value: 21 },
    { label: 'T', value: 13 },
    { label: 'U', value: 27 },
    { label: 'V', value: 34 },
    { label: 'W', value: 11 },
    { label: 'X', value: 30 },
    { label: 'Y', value: 18 },
    { label: 'Z', value: 22 },
  ];


  return <Test01 tempData={tempData}></Test01>;
  // return <BarChart data={data}></BarChart>

}

export default App;
