import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Self from "./component/Self";
import Same from "./component/Same";
import data from './controller/output.js'
const App = () => {
  const [dat] = useState(data);
  const [roll,setRoll] = useState(0)
 

  return (
    <div className="p-4 w-[100%]">
      <div className="flex justify-center items-center gap-1 w-[100%] text-center">
      <h2 className="text-lg w-[50%]  md:text-xs font-semibold">Enter Your Roll Number:</h2>
      <input type="number" 
        className="border-1 w-[50%] py-1 focus:border-1 outline-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden px-2 font-semibold rounded"
        value={roll}
        onChange={(e)=>{setRoll(e.target.value)}}
        />
      </div>

      {
        (roll.length == 6) ? <Self data={dat} roll={roll} /> :<h1 className="underline text-red-400">Enter proper Roll Number</h1>
      }
      {
        (roll.length == 6) ? <Same data={dat} roll={roll} /> : <h1 className="underline text-red-400">For Detail Enter the Roll Number.</h1>
      }
      
    </div>
  );
};

export default App;
