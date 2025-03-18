import React, { useState, useEffect } from "react";

function Self({ data, roll }) {
  const [self, setSelf] = useState(null);

  useEffect(() => {
    // Find student by roll number
    const matchedStudent = data.find(
      (element) => Number(element["ROLL NO"]) === Number(roll)
    );

    setSelf(matchedStudent || null);
  }, [data, roll]);

  return (
    <div className="p-6 overflow-x-scroll">
      {self ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border border-gray-500">Name</th>
                <th className="p-3 border border-gray-500">Roll No</th>
                <th className="p-3 border border-gray-500">Unit 1</th>
                <th className="p-3 border border-gray-500">Empty 1</th>
                <th className="p-3 border border-gray-500">Unit 2</th>
                <th className="p-3 border border-gray-500">Empty 2</th>
                <th className="p-3 border border-gray-500">Unit 3</th>
                <th className="p-3 border border-gray-500">Empty 3</th>
                <th className="p-3 border border-gray-500">Unit 4</th>
                <th className="p-3 border border-gray-500">Empty 4</th>
                <th className="p-3 border border-gray-500">Unit 5</th>
                <th className="p-3 border border-gray-500">Empty 5</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 even:bg-white">
                <td className="p-3 border border-gray-300">{self["NAME OF THE STUDENT"] || "-"}</td>
                <td className="p-3 border border-gray-300">{self["ROLL NO"] || "-"}</td>
                {["Unit 1", "__EMPTY", "Unit 2", "__EMPTY_1", "Unit 3", "__EMPTY_2", "Unit 4", "__EMPTY_3", "Unit 5", "__EMPTY_4"].map((field, idx) => (
                  <td key={idx} className="p-3 border border-gray-300">{self[field] || "-"}</td>
                ))}
              </tr>
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
