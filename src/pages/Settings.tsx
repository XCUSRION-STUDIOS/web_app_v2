// import { Link } from "react-router-dom";
// import { useEffect, useState } from 'react';
// import { SketchPicker } from "react-color";

// export default function Settings() {
//   const [color, setColor] = useState("#ffffff");
//   const [showPicker, setShowPicker] = useState(false);
//   const [hasCharacters, setHasCharacters] = useState(false);

//   // State for character information
//   const [character, setCharacter] = useState({
//     username: "",
//     age: "",
//     ethnicity: "",
//     occupation: "",
//   });

//   useEffect(() => {
//     const storedCharacters = JSON.parse(localStorage.getItem("characters") || "[]");
//     setHasCharacters(storedCharacters.length > 0);

//     // If character data exists, load the first character into state
//     if (storedCharacters.length > 0) {
//       setCharacter(storedCharacters[0]);
//     }
//   }, []);

//   const handleClearData = () => {
//     localStorage.clear();
//     alert("Character data has been cleared.");
//     window.location.reload();
//   };

//   const handleExportData = () => {
//     const storedCharacters = localStorage.getItem("characters");
//     if (!storedCharacters) {
//       alert("No character data available to export.");
//       return;
//     }

//     const blob = new Blob([storedCharacters], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "characters.json";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   // Load saved color from localStorage on mount
//   useEffect(() => {
//     const savedColor = localStorage.getItem("selectedColor");
//     if (savedColor) {
//       setColor(savedColor);
//     }
//   }, []);

//   // Function to save the selected color
//   const handleSaveColor = () => {
//     localStorage.setItem("selectedColor", color);
//     alert(`Color ${color} saved!`);
//   };

//     // Handle changes to character information
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setCharacter((prevCharacter) => ({
//         ...prevCharacter,
//         [name]: value,
//       }));
//     };
  
//     // Update character info in localStorage
//     const handleUpdateCharacter = () => {
//       const storedCharacters = JSON.parse(localStorage.getItem("characters") || "[]");
  
//       // Update the character data in localStorage
//       if (storedCharacters.length > 0) {
//         storedCharacters[0] = { ...character };
//         localStorage.setItem("characters", JSON.stringify(storedCharacters));
//         alert("Character information updated successfully!");
//       }
//     };

//   return (
//     <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center  text-white font-[monospace]">
//       <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Settings</h1>
      
//       {/* Utility Buttons */}

//       <h1 className="mt-6 font-[Metropolis] text-xl"> Data Options: </h1>
//       <div className="mt-4 flex flex-row gap-3">
      
       
//         <button
//           onClick={handleExportData}
//           className={`w-45 px-4 py-1 text-base items-center justify-center rounded-full transition ${
//             hasCharacters
//               ? "text-black bg-white hover:bg-gray-300"
//               : "bg-gray-600 text-gray-400 cursor-not-allowed"
//           }`}
//           disabled={!hasCharacters}
//         >
//           Export Data
//         </button>

//         <button
//           onClick={handleClearData}
//           className="w-45 px-6 py-1 text-base text-black bg-white rounded-full hover:bg-gray-300 transition"
//         >
//           Clear Data
//         </button>
//       </div>
      
//       <h1 className="mt-10 font-[Metropolis] text-xl"> Change Colour Theme: </h1>
//       {/* Color Display Button */}
//       <button
//         onClick={() => setShowPicker(!showPicker)}
//         className="mt-3 w-12 h-12 rounded-full border-2 border-white shadow-lg"
//         style={{ backgroundColor: color }}
//       ></button>

//       {/* Color Picker (Shown when clicxhcked) */}
//       {showPicker && (
//         <div className="absolute z-10 mt-3 p-2 bg-gray-900 rounded-lg shadow-lg">
//           <SketchPicker
//             color={color}
//             onChange={(updatedColor) => setColor(updatedColor.hex)}
//           />
//         </div>
//       )}

//       {/* Save Color Button */}
//       <button
//         onClick={handleSaveColor}
//         className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition mt-4"
//       >
//         Save Colour
//       </button>

//       {/* Character Information Editing */}
//       <h1 className="mt-10 font-[Metropolis] text-xl"> EDIT CHARACTER INFORMATION: </h1>
//       <div className="space-y-3 w-96 flex flex-col items-center text-white mt-3">
//         {["username", "age", "ethnicity", "occupation"].map((label) => (
//           <input
//             key={label}
//             name={label}
//             type="text"
//             placeholder={label}
//             value={character[label as keyof typeof character]}
//             onChange={handleChange}
//             className="w-90 bg-white/20 backdrop-blur-[2px] px-4 py-1 rounded-full transition duration-300 shadow-md hover:scale-105 active:scale-98 text-sm"
//           />
//         ))}
//       </div> 

//       {/* Update Button */}
//       <button
//         onClick={handleUpdateCharacter}
//         className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition mt-4"
//       >
//         Update Character Info
//       </button> 


//       {/* Navigation */}
//       <div className="absolute bottom-4 w-full mt-6 p-1 text-[#767676] text-sm">
//         <div className=" flex justify-center space-x-2">
//           <Link to="/character-dashboard">
//             <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Status</button>
//           </Link>
//           <Link to="/daily-quests">
//             <button className="p-2 rounded-md hover:bg-gray-700">Daily Quests</button>
//           </Link>
//           <Link to="/quests">
//             <button className="p-2 rounded-md hover:bg-gray-700">Quests</button>
//           </Link>
//           <Link to="/skills">
//             <button className="p-2 rounded-md hover:bg-gray-700">Skills</button>
//           </Link>
//           <Link to="/history">
//             <button className="p-2 rounded-md hover:bg-gray-700">History</button>
//           </Link>
//           <Link to="/">
//             <button className="p-2 rounded-md text-red-500">Exit</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { SketchPicker } from "react-color";
import backgroundImage from '../assets/darkimg2.png';

export default function Settings() {
  const [color, setColor] = useState("#ffffff");
  const [showPicker, setShowPicker] = useState(false);
  const [hasCharacters, setHasCharacters] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // State for character information
  const [character, setCharacter] = useState({
    username: "",
    age: "",
    ethnicity: "",
    occupation: "",
  });

  useEffect(() => {
    const storedCharacters = JSON.parse(localStorage.getItem("characters") || "[]");
    setHasCharacters(storedCharacters.length > 0);

    if (storedCharacters.length > 0) {
      setCharacter(storedCharacters[0]);
    }
  }, []);

  const handleClearData = () => {
    localStorage.clear();
    alert("Character data has been cleared.");
    window.location.reload();
  };

  const handleExportData = () => {
    const storedCharacters = localStorage.getItem("characters");
    if (!storedCharacters) {
      alert("No character data available to export.");
      return;
    }

    const blob = new Blob([storedCharacters], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "characters.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("selectedColor");
    if (savedColor) {
      setColor(savedColor);
    }
  }, []);

  const handleSaveColor = () => {
    localStorage.setItem("selectedColor", color);
    alert(`Color ${color} saved!`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleUpdateCharacter = () => {
    const storedCharacters = JSON.parse(localStorage.getItem("characters") || "[]");

    if (storedCharacters.length > 0) {
      storedCharacters[0] = { ...character };
      localStorage.setItem("characters", JSON.stringify(storedCharacters));
      alert("Character information updated successfully!");
    }
  };

  // Close color picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center text-white font-[monospace]"
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Settings</h1>

      {/* Utility Buttons */}
      <h1 className="mt-10 font-[Metropolis] text-xl"> Data Options: </h1>
      <div className="mt-4 flex flex-row gap-3">
        <button
          onClick={handleExportData}
          className={`w-45 px-4 py-1 text-base items-center justify-center rounded-full transition ${
            hasCharacters ? "text-black bg-white hover:bg-gray-300" : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasCharacters}
        >
          Export Data
        </button>

        <button
          onClick={handleClearData}
          className="w-45 px-6 py-1 text-base text-black bg-white rounded-full hover:bg-gray-300 transition"
        >
          Clear Data
        </button>
      </div>

      {/* Colour Theme Section */}
      <h1 className="mt-10 font-[Metropolis] text-xl"> Change Colour Theme: </h1>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="mt-3 w-12 h-12 rounded-full border-2 border-white shadow-lg"
        style={{ backgroundColor: color }}
      ></button>

      {showPicker && (
        <div ref={pickerRef} className="absolute z-10 mt-3 p-2 bg-gray-900 rounded-lg shadow-lg">
          <SketchPicker color={color} onChange={(updatedColor) => setColor(updatedColor.hex)} />
        </div>
      )}

      <button onClick={handleSaveColor} className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition mt-4">
        Save Colour
      </button>

      {/* Character Information Editing */}
      <h1 className="mt-10 font-[Metropolis] text-xl"> EDIT CHARACTER INFORMATION: </h1>
      <div className="space-y-3 w-96 flex flex-col items-center text-white mt-3">
        {["username", "age", "ethnicity", "occupation"].map((label) => (
          <input
            key={label}
            name={label}
            type="text"
            placeholder={label}
            value={character[label as keyof typeof character]}
            onChange={handleChange}
            className="w-90 bg-white/20 backdrop-blur-[2px] px-4 py-1 rounded-full transition duration-300 shadow-md hover:scale-105 active:scale-98 text-sm"
          />
        ))}
      </div>

      <button onClick={handleUpdateCharacter} className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition mt-4">
        Update Character Info
      </button>

      {/* Navigation */}
      <div className="absolute bottom-4 w-full mt-6 p-1 text-[#767676] text-sm">
        <div className="flex justify-center space-x-2">
          {/* <Link to="/character-dashboard">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Status</button>
          </Link>
          <Link to="/daily-quests">
            <button className="p-2 rounded-md hover:bg-gray-700">Daily Quests</button>
          </Link>
          <Link to="/quests">
            <button className="p-2 rounded-md hover:bg-gray-700">Quests</button>
          </Link>
          <Link to="/skills">
            <button className="p-2 rounded-md hover:bg-gray-700">Skills</button>
          </Link>
          <Link to="/history">
            <button className="p-2 rounded-md hover:bg-gray-700">History</button>
          </Link>
          <Link to="/">
            <button className="p-2 rounded-md text-red-500">Exit</button>
          </Link>

          
        </div>  */}
       
      <Link to="/">
        <button className="w-45 mt-3 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition">
          BACK
        </button>
      </Link>
      </div>
        

      </div>
    </div>
  );
}
