import React, { useState, useEffect } from "react";

function Same({ data, roll }) {
  const [person, setPerson] = useState(null);
  const [collect, setCollect] = useState([]);
  const [highMatchCollect, setHighMatchCollect] = useState([]);

  useEffect(() => {
    const foundPerson = data.find((obj) => Number(obj["ROLL NO"]) === Number(roll));
    setPerson(foundPerson || null);
  }, [data, roll]);

  useEffect(() => {
    if (person) {
      let valuesArray = Object.values(person);
      let tempCollect = [];
      let tempHighMatchCollect = [];

      data.forEach((obj) => {
        if (Number(obj["ROLL NO"]) !== Number(roll)) {
          let matchCount = 0;
          let matchedValues = [];

          ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5",
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
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {person ? (
        <>
          <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-200 border-b-2 border-gray-500 pb-2">
            Matching Data for Roll No: <span className="text-green-400">{person["ROLL NO"]}</span>
          </h1>

          {collect.length > 0 ? (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4 text-green-400 border-b border-green-500 pb-1">
                All Matching Entries
              </h2>
              <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                <table className="w-full text-left border border-gray-700 rounded-lg">
                  <thead className="bg-gray-900 text-green-400">
                    <tr>
                      <th className="p-4 border border-gray-700">Name</th>
                      <th className="p-4 border border-gray-700">Roll No</th>
                      {["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"].map((title, idx) => (
                        <th key={idx} className="p-4 border border-gray-700">{title}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {collect.map((student, index) => (
                      <tr key={index} className="even:bg-gray-800 hover:bg-gray-700 transition">
                        <td className="p-4 border border-gray-700 font-semibold">{student["NAME OF THE STUDENT"] || "-"}</td>
                        <td className="p-4 border border-gray-700 font-semibold">{student["ROLL NO"] || "-"}</td>
                        {["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"].map((field, idx) => (
                          <td key={idx} className={`p-4 border border-gray-700 ${isHighlighted(student[field]) ? "bg-green-500 text-black font-bold" : ""}`}>
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
            <h1 className="text-center text-lg font-semibold text-green-500">No Matching Data Found!</h1>
          )}

          {highMatchCollect.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-yellow-500 pb-1">
                Rows with 3+ Matches
              </h2>
              <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
                <table className="w-full text-left border border-gray-700 rounded-lg">
                  <thead className="bg-gray-900 text-yellow-400">
                    <tr>
                      <th className="p-4 border border-gray-700">Name</th>
                      <th className="p-4 border border-gray-700">Roll No</th>
                      <th className="p-4 border border-gray-700">Matches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highMatchCollect.map((student, index) => (
                      <tr key={index} className="bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition">
                        <td className="p-4 border border-gray-700">{student["NAME OF THE STUDENT"] || "-"}</td>
                        <td className="p-4 border border-gray-700">{student["ROLL NO"] || "-"}</td>
                        <td className="p-4 border border-gray-700">{student.matchCount} Matches</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-lg font-semibold text-yellow-400">No Rows with 3+ Matches Found!</h1>
          )}
        </>
      ) : (
        <h1 className="text-center text-lg font-semibold text-red-400">No Data Found for Given Roll No!</h1>
      )}
    </div>
  );
}

export default Same;