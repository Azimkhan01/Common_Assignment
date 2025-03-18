import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Self from "./component/Self";
import Same from "./component/Same";
const ExcelReader = () => {
  const [data, setData] = useState([]);
  const [roll,setRoll] = useState("")
  useEffect(() => {
    // Replace 'sample.xlsx' with your actual file name
    fetch("/public/Copy of CCF_Assignment_24-25(1).xlsx")
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setData(jsonData);
      })
      .catch((error) => console.error("Error loading the Excel file:", error));
  }, []);

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
        (roll.length == 6) ? <Self data={data} roll={roll} /> :<h1 className="underline text-red-400">Enter proper Roll Number</h1>
      }
      {
        (roll.length == 6) ? <Same data={data} roll={roll} /> : <h1 className="underline text-red-400">For Detail Enter the Roll Number.</h1>
      }
      
    </div>
  );
};

export default ExcelReader;
