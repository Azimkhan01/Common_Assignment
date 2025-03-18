import React, { useState, useEffect } from "react";

function Self({ data, roll }) {
  const [self, setSelf] = useState([]);

  useEffect(() => {
    const matchedStudent = data.find(
      (element) => Number(element["ROLL NO"]) === Number(roll)
    );
    setSelf(matchedStudent ? [matchedStudent] : []);
  }, [data, roll]);

  return (
    <div className="flex flex-col items-center w-full p-4">
      {self.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-blue-600 text-white text-sm md:text-base">
              <tr className="flex w-full">
                {["Name", "Roll No", "Unit 1", "Empty 1", "Unit 2", "Empty 2", "Unit 3", "Empty 3", "Unit 4", "Empty 4", "Unit 5", "Empty 5"].map((header, idx) => (
                  <th key={idx} className="p-3 border border-gray-500 flex-1 text-center">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {self.map((student, index) => (
                <tr key={index} className="flex w-full bg-gray-100 even:bg-white">
                  {["NAME OF THE STUDENT", "ROLL NO", "Unit 1", "__EMPTY", "Unit 2", "__EMPTY_1", "Unit 3", "__EMPTY_2", "Unit 4", "__EMPTY_3", "Unit 5", "__EMPTY_4"].map((field, idx) => (
                    <td key={idx} className="p-3 border border-gray-300 flex-1 text-center">
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
    </div>
  );
}

export default Self;
