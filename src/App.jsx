import React, { useState } from "react";
import Self from "./component/Self";
import Same from "./component/Same";
import data from "./controller/output.js";

const App = () => {
  document.title = "CCF Tools"
  const [dat] = useState(data);
  const [roll, setRoll] = useState("");

  const handleRollChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    setRoll(value.slice(0, 6)); // Limit to 6 digits
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-800 text-center md:text-left">
          Enter Your Roll Number:
        </h2>
        <input
          type="text"
          className="flex-grow border border-gray-400 py-2 px-3 rounded-md focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none"
          value={roll}
          onChange={handleRollChange}
          maxLength={6}
        />
      </div>
      <div className="flex flex-col items-center w-full max-w-3xl">
        {roll.length === 6 ? (
          <>
            <Self data={dat} roll={roll} />
            <Same data={dat} roll={roll} />
          </>
        ) : (
          roll.length > 0 && (
            <h1 className="text-red-500 font-semibold mt-4">
              Enter a valid 6-digit Roll Number
            </h1>
          )
        )}
      </div>
    </div>
  );
};

export default App;
