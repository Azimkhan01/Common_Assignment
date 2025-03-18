import React, { useState, useEffect } from "react";

function Same({ data, roll }) {
  const [person, setPerson] = useState(null);
  const [collect, setCollect] = useState([]);
  const [highMatchCollect, setHighMatchCollect] = useState([]);

  useEffect(() => {
    // Find the student with the matching roll number
    const foundPerson = data.find((obj) => Number(obj["ROLL NO"]) === Number(roll));
    setPerson(foundPerson || null);
  }, [data, roll]);

  useEffect(() => {
    if (person) {
      let valuesArray = Object.values(person);
      console.log("Before processing:", valuesArray);

      let tempCollect = [];
      let tempHighMatchCollect = [];

      data.forEach((obj) => {
        if (Number(obj["ROLL NO"]) !== Number(roll)) {
          let matchCount = 0;
          let matchedValues = [];

          // Check for matches in all required fields
          [
            "Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5",
            "__EMPTY", "__EMPTY_1", "__EMPTY_2", "__EMPTY_3", "__EMPTY_4"
          ].forEach((field) => {
            if (obj[field] && valuesArray.includes(obj[field])) {
              matchCount++;
              matchedValues.push(obj[field]);
            }
          });

          if (matchCount > 0) {
            tempCollect.push({ ...obj, matchCount, matchedValues });
          }
          if (matchCount >= 3) {
            tempHighMatchCollect.push({ ...obj, matchCount, matchedValues });
          }
        }
      });

      setCollect(tempCollect);
      setHighMatchCollect(tempHighMatchCollect);
    }
  }, [person, data, roll]);

  const isHighlighted = (value) => person && Object.values(person).includes(value);

  return (
    <div>
      {person ? (
        <>
          <h1 className="text-lg font-bold mb-4">
            Matching Data for Roll No: {person["ROLL NO"]}
          </h1>

          {/* First Table: All Matching Entries */}
          {collect.length > 0 ? (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">All Matching Entries</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                  <thead className="bg-green-600 text-white">
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
                    {collect.map((student, index) => (
                      <tr key={index} className="bg-gray-100 even:bg-white">
                        <td className="p-3 border border-gray-300">{student["NAME OF THE STUDENT"] || "-"}</td>
                        <td className="p-3 border border-gray-300">{student["ROLL NO"] || "-"}</td>
                        {["Unit 1", "__EMPTY", "Unit 2", "__EMPTY_1", "Unit 3", "__EMPTY_2", "Unit 4", "__EMPTY_3", "Unit 5", "__EMPTY_4"].map((field, idx) => (
                          <td key={idx} className={`p-3 border border-gray-300 ${isHighlighted(student[field]) ? "bg-green-300" : ""}`}>
                            {student[field] || "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-xl font-semibold text-red-600 mt-4">
              No Matching Data Found!
            </h1>
          )}

          {/* Second Table: Rows with 3 or More Matches */}
          {highMatchCollect.length > 0 ? (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-red-600">Rows with 3+ Matches (Highlighted)</h2>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="p-3 border border-gray-500">Name</th>
                      <th className="p-3 border border-gray-500">Roll No</th>
                      <th className="p-3 border border-gray-500">Matches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highMatchCollect.map((student, index) => (
                      <tr key={index} className="bg-green-300">
                        <td className="p-3 border border-gray-300">{student["NAME OF THE STUDENT"] || "-"}</td>
                        <td className="p-3 border border-gray-300">{student["ROLL NO"] || "-"}</td>
                        <td className="p-3 border border-gray-300 font-bold">{student.matchCount} Matches</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-xl font-semibold text-red-600 mt-4">
              No Rows with 3 or More Matches Found!
            </h1>
          )}
        </>
      ) : (
        <h1 className="text-center text-xl font-semibold text-red-600 mt-4">
          No Data Found for Given Roll No!
        </h1>
      )}
    </div>
  );
}

export default Same;
