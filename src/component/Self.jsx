import React, { useState, useEffect } from "react";
import questions from "../controller/question.js";

function Self({ data, roll }) {
  const [self, setSelf] = useState([]);
  const [ques , setQues] = useState(...questions);
  const [our, setOur] = useState([]);

  useEffect(() => {
    const matchedStudent = data.find(
      (element) => Number(element["ROLL NO"]) === Number(roll)
    );
  
    setSelf(matchedStudent ? [matchedStudent] : []);
  
    if (!matchedStudent) return; // Prevent error if no student found
  
    const newOur = []; // ✅ Collect values first
  
    Object.entries(matchedStudent).forEach(([key, value], index) => {
      if (index > 1 && ques[value]) { // ✅ Ensure ques[value] exists
        newOur.push(ques[value]);
      }
    });
  
    setOur(newOur); // ✅ Update state only once
  }, [data, roll, ques]); // ✅ Added `ques` as dependency
  
  useEffect(() => {
    if (our.length > 0) {
      console.log(our[0]);
    }
  }, [our]);
  


  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Table Section */}
      {self.length > 0 ? (
        <div className="w-full overflow-x-auto">
          {/* {console.log("self:", self)} */}
          <table className="min-w-[1300px] w-full border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-blue-600 text-white text-sm md:text-base">
              <tr className="flex w-full">
                {[
                  "Name",
                  "Roll No",
                  "Unit 1",
                  "Unit 1",
                  "Unit 2",
                  "Unit 2",
                  "Unit 3",
                  "Unit 3",
                  "Unit 4",
                  "Unit 4",
                  "Unit 5",
                  "Unit 5",
                ].map((header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2 border border-gray-500 flex-1 text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {self.map((student, index) => (
                <tr key={index} className="flex w-full bg-gray-100 even:bg-white">
                  {[
                    "NAME OF THE STUDENT",
                    "ROLL NO",
                    "Unit 1",
                    "__EMPTY",
                    "Unit 2",
                    "__EMPTY_1",
                    "Unit 3",
                    "__EMPTY_2",
                    "Unit 4",
                    "__EMPTY_3",
                    "Unit 5",
                    "__EMPTY_4",
                  ].map((field, idx) => (
                    <td
                      key={idx}
                      className="px-4 py-2 border border-gray-300 flex-1 text-center"
                    >
                      {student[field] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-lg md:text-xl font-semibold text-red-600 mt-4">
          No Roll Found, Please Check!
        </h1>
      )}


<div>
  <ol className="text-lg font-semibold text-gray-600 p-2 text-justify font-sans ">
    {our.map((obj, index) => {

      // Ensure obj is an object before iterating
      return typeof obj === "object" ? (
        Object.entries(obj).map(([key, value]) => (
          <li className="p-2" key={`${index}-${key}`}>
            <strong>{index+1}</strong>: {typeof value === "object" ? "Object" : value}
          </li>
        ))
      ) : (
        <li className="p-2" key={index+1}> {index+1}: {obj}</li> // If obj is a string, print it directly
      );
    })}
  </ol>
</div>

      
     
    </div>
  );
}

export default Self;
