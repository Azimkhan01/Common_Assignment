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
      const valuesArray = Object.values(person);
      const tempCollect = [];
      const tempHighMatchCollect = [];

      data.forEach((obj) => {
        if (Number(obj["ROLL NO"]) !== Number(roll)) {
          let matchCount = 0;
          let matchedValues = [];

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
    <div className="flex flex-col items-center w-full p-4">
      {person ? (
        <>
          <h1 className="text-xl md:text-2xl font-bold text-center">
            Matching Data for Roll No: {person["ROLL NO"]}
          </h1>

          {/* First Table - All Matching Entries */}
          {collect.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <h2 className="text-lg md:text-xl font-semibold text-blue-600 text-center mb-4">
                All Matching Entries
              </h2>
              <div className="mx-auto w-full">
                <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
                  <thead className="bg-green-600 text-white text-sm md:text-base">
                    <tr>
                      {["Name", "Roll No", "Unit 1", "Empty 1", "Unit 2", "Empty 2", "Unit 3", "Empty 3", "Unit 4", "Empty 4", "Unit 5", "Empty 5"].map((header, idx) => (
                        <th key={idx} className="p-2 md:p-3 border border-gray-500">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {collect.map((student, index) => (
                      <tr key={index} className="bg-gray-100 even:bg-white">
                        {["NAME OF THE STUDENT", "ROLL NO", "Unit 1", "__EMPTY", "Unit 2", "__EMPTY_1", "Unit 3", "__EMPTY_2", "Unit 4", "__EMPTY_3", "Unit 5", "__EMPTY_4"].map((field, idx) => (
                          <td
                            key={idx}
                            className={`p-2 md:p-3 border border-gray-300 text-center ${isHighlighted(student[field]) ? "bg-green-300" : ""}`}
                          >
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
            <h1 className="text-center text-red-600 text-lg md:text-xl font-semibold">
              No Matching Data Found!
            </h1>
          )}

          {/* Second Table - Rows with 3+ Matches */}
          {highMatchCollect.length > 0 ? (
            <div className="w-full overflow-x-auto mt-8">
              <h2 className="text-lg md:text-xl font-semibold text-red-600 text-center mb-4">
                Rows with 3+ Matches
              </h2>
              <div className="mx-auto w-full">
                <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
                  <thead className="bg-red-600 text-white text-sm md:text-base">
                    <tr>
                      <th className="p-2 md:p-3 border border-gray-500">Name</th>
                      <th className="p-2 md:p-3 border border-gray-500">Roll No</th>
                      <th className="p-2 md:p-3 border border-gray-500">Matches</th>
                    </tr>
                  </thead>
                  <tbody>
                    {highMatchCollect.map((student, index) => (
                      <tr key={index} className="bg-green-300">
                        <td className="p-2 md:p-3 border border-gray-300 text-center">
                          {student["NAME OF THE STUDENT"] || "-"}
                        </td>
                        <td className="p-2 md:p-3 border border-gray-300 text-center">
                          {student["ROLL NO"] || "-"}
                        </td>
                        <td className="p-2 md:p-3 border border-gray-300 text-center font-bold">
                          {student.matchCount} Matches
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <h1 className="text-center text-red-600 text-lg md:text-xl font-semibold">
              No Rows with 3 or More Matches Found!
            </h1>
          )}
        </>
      ) : (
        <h1 className="text-center text-red-600 text-lg md:text-xl font-semibold">
          No Data Found for Given Roll No!
        </h1>
      )}
    </div>
  );
}

export default Same;
