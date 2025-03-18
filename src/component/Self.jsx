import React, { useState, useEffect } from "react";

function Self({ data, roll }) {
  const [self, setSelf] = useState([]);

  useEffect(() => {
    // Convert roll number to Number for comparison
    const matchedStudent = data.find(
      (element) => Number(element["ROLL NO"]) === Number(roll)
    );

    if (matchedStudent) {
      setSelf([matchedStudent]);
    } else {
      setSelf([]);
    }
  }, [data, roll]);

  return (
    <div className="p-6">
      {self.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border border-gray-500">Name</th>
                <th className="p-3 border border-gray-500">Roll No</th>
                <th className="p-3 border border-gray-500">Unit 1</th>
                <th className="p-3 border border-gray-500">Unit 1</th>
                <th className="p-3 border border-gray-500">Unit 2</th>
                <th className="p-3 border border-gray-500">Unit 2</th>
                <th className="p-3 border border-gray-500">Unit 3</th>
                <th className="p-3 border border-gray-500">Unit 3</th>
                <th className="p-3 border border-gray-500">Unit 4</th>
                <th className="p-3 border border-gray-500">Unit 4</th>
                <th className="p-3 border border-gray-500">Unit 5</th>
                <th className="p-3 border border-gray-500">Unit 5</th>
              </tr>
            </thead>
            <tbody>
              {self.map((student, index) => (
                <tr key={index} className="bg-gray-100 even:bg-white">
                  <td className="p-3 border border-gray-300">
                    {student["NAME OF THE STUDENT"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["ROLL NO"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["Unit 1"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["__EMPTY"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["Unit 2"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["__EMPTY_1"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["Unit 3"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["__EMPTY_2"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["Unit 4"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["__EMPTY_3"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["Unit 5"] || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {student["__EMPTY_4"] || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="text-center text-xl font-semibold text-red-600 mt-4">
          No Roll Found, Please Check!
        </h1>
      )}
    </div>
  );
}

export default Self;
