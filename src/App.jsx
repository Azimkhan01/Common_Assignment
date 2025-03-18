import React, { useState } from "react";
import Self from "./component/Self";
import Same from "./component/Same";
import data from "./controller/output.js";

const App = () => {
  const [dat] = useState(data);
  const [roll, setRoll] = useState("");

  return (
    <div className="p-4 w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full max-w-md text-center">
        <h2 className="text-lg font-semibold text-gray-800">Enter Your Roll Number:</h2>
        <input
          type="number"
          className="w-full md:w-1/2 border border-gray-400 py-2 px-3 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
      </div>

      {roll.length === 6 ? (
        <>
          <Self data={dat} roll={roll} />
          <Same data={dat} roll={roll} />
        </>
      ) : (
        <h1 className="text-red-500 font-semibold mt-4">Enter a valid 6-digit Roll Number</h1>
      )}
    </div>
  );
};

export default App;
