
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import backgroundImage from "../assets/darkimg2.png";
// // import { loadCharacter, storeCharacter } from "../utils/charLoader"; // Import character loader functions

// export default function Settings() {
//   const [selectedColors, setSelectedColors] = useState<string[]>([]);
//   const [hasCharacters, setHasCharacters] = useState(false);

//   // State for character information
//   const [character, setCharacter] = useState({
//     username: "",
//     age: "",
//     ethnicity: "",
//     occupation: "",
//   });

//   //  spider chart col1, progress bar col spider chart grid col, container col 
//   const themes = {
//     blue: ["#8C94B8", "#396185", "#5D5E60", "#1D282C"],
//     green: ["#4B8D72", "#209E1A", "#64736C", "#202D36"],
//     red: ["#740D28", "#B5221B", "#3E3B3B", "#3C2827"],
//     purple: ["#45216B", "#6F5C8A", "#4A4750", "#2B2533"],
//     monochrome: ["#989898", "#A9A9A9", "#434343", "#2B2B2B"],
//   };

//   useEffect(() => {
//     // Load selected colours from local storage
//     const savedColors = localStorage.getItem("selectedColors");

//     if (savedColors) {
//       setSelectedColors(JSON.parse(savedColors)); // Load only the colour values
//     } else {
//       setSelectedColors(themes.blue); // Default to blue if no theme is saved
//     }

//     // Load character data from local storage
//     const storedCharacters = JSON.parse(localStorage.getItem("characters") || "[]");
//     setHasCharacters(storedCharacters.length > 0);
//     if (storedCharacters.length > 0) {
//       setCharacter(storedCharacters[0]);
//     }
//   }, []);

//   const handleSaveTheme = (themeKey: keyof typeof themes) => {
//     const selectedThemeColors = themes[themeKey]; 
//     localStorage.setItem("selectedColors", JSON.stringify(selectedThemeColors)); // Save selected colours to local storage
//     setSelectedColors(selectedThemeColors);
//     alert(`Theme saved!`);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setCharacter((prevCharacter) => ({
//       ...prevCharacter,
//       [name]: value,
//     }));
//   };

//   const handleUpdateCharacter = () => {
//     const storedCharacters = JSON.parse(localStorage.getItem("characters") || "[]");

//     if (storedCharacters.length > 0) {
//       storedCharacters[0] = { ...character };
//       localStorage.setItem("characters", JSON.stringify(storedCharacters));
//       alert("Character information updated successfully!");
//     }
//   };

//   const handleClearData = () => {
//     localStorage.clear(); // Clear all local storage data
//     alert("Character data has been cleared.");
//     window.location.reload(); // Reload to reset the page
//   };

//   return (
//     <div
//       className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center text-white font-[monospace]"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Settings</h1>

//       {/* Utility Buttons */}
//       <h1 className="mt-10 font-[Metropolis] text-xl"> Data Options: </h1>
//       <div className="mt-4 flex flex-row gap-3">
//         <button
//           className={`w-45 px-4 py-1 text-base items-center justify-center rounded-full transition ${
//             hasCharacters ? "text-black bg-white hover:bg-gray-300" : "bg-gray-600 text-gray-400 cursor-not-allowed"
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

//       {/* Colour Theme Section */}
//       <h1 className="mt-10 font-[Metropolis] text-xl"> Change Colour Theme: </h1>
//       <div className="mt-3 flex flex-wrap gap-3">
//         {Object.keys(themes).map((theme) => (
//           <button
//             key={theme}
//             onClick={() => handleSaveTheme(theme as keyof typeof themes)}
//             className="px-4 py-2 rounded-full bg-white text-black shadow-md hover:bg-gray-300 transition"
//           >
//             {theme.charAt(0).toUpperCase() + theme.slice(1)}
//           </button>
//         ))}
//       </div>

//       <h2 className="mt-6 text-lg">Selected Theme Colours:</h2>
//       <div className="mt-3 flex gap-2">
//         {selectedColors.map((color, index) => (
//           <div key={index} className="w-10 h-10 rounded-full" style={{ backgroundColor: color }} />
//         ))}
//       </div>

//       {/* Character Information Editing */}
//       <h1 className="mt-10 font-[Metropolis] text-xl"> Edit Character Information: </h1>
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

//       <button
//         onClick={handleUpdateCharacter}
//         className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition mt-4"
//       >
//         Update Character Info
//       </button>

//       {/* Navigation */}
//       <Link to="/">
//         <button className="w-45 mt-3 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition">
//           BACK
//         </button>
//       </Link>
//     </div>
//   );
// }



import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import backgroundImage from "../assets/darkimg2.png";
import { loadCharacter, storeCharacter } from "../lib/charLoader"; // Import character loader functions

export default function Settings() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [character, setCharacter] = useState(() => loadCharacter());
  const [hasCharacters, setHasCharacters] = useState(() => !!localStorage.getItem("characters")); // ✅ Fix added

  //  spider chart col1, progress bar col spider chart grid col, container col 
  const themes = {
    blue: ["#8C94B8", "#396185", "#5D5E60", "#1D282C"],
    green: ["#4B8D72", "#209E1A", "#64736C", "#202D36"],
    red: ["#740D28", "#B5221B", "#3E3B3B", "#3C2827"],
    purple: ["#45216B", "#6F5C8A", "#4A4750", "#2B2533"],
    monochrome: ["#989898", "#A9A9A9", "#434343", "#2B2B2B"],
  };

  useEffect(() => {
    // Load selected colours from local storage
    const savedColors = localStorage.getItem("selectedColors");
    setSelectedColors(savedColors ? JSON.parse(savedColors) : themes.blue);
  }, []);

  const handleSaveTheme = (themeKey: keyof typeof themes) => {
    const selectedThemeColors = themes[themeKey];
    localStorage.setItem("selectedColors", JSON.stringify(selectedThemeColors));
    setSelectedColors(selectedThemeColors);
    alert("Theme saved!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  const handleUpdateCharacter = () => {
    storeCharacter(character);
    setHasCharacters(true); // ✅ Ensure export button updates
    alert("Character information updated successfully!");
  };

  const handleClearData = () => {
    localStorage.clear();
    setHasCharacters(false); // ✅ Disable export button when data is cleared
    alert("Character data has been cleared.");
    window.location.reload();
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center text-white font-[monospace]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Settings</h1>

      {/* Utility Buttons */}
      <h1 className="mt-10 font-[Metropolis] text-xl"> Data Options: </h1>
      <div className="mt-4 flex flex-row gap-3">
        <button
          className={`w-45 px-4 py-1 text-base items-center justify-center rounded-full transition ${
            hasCharacters ? "text-black bg-white hover:bg-gray-300" : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasCharacters} // ✅ Fix applied
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
      <div className="mt-3 flex flex-wrap gap-3">
        {Object.keys(themes).map((theme) => (
          <button
            key={theme}
            onClick={() => handleSaveTheme(theme as keyof typeof themes)}
            className="px-4 py-2 rounded-full bg-white text-black shadow-md hover:bg-gray-300 transition"
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      <h2 className="mt-6 text-lg">Selected Theme Colours:</h2>
      <div className="mt-3 flex gap-2">
        {selectedColors.map((color, index) => (
          <div key={index} className="w-10 h-10 rounded-full" style={{ backgroundColor: color }} />
        ))}
      </div>

      {/* Character Information Editing */}
      <h1 className="mt-10 font-[Metropolis] text-xl"> Edit Character Information: </h1>
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

      <button
        onClick={handleUpdateCharacter}
        className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition mt-4"
      >
        Update Character Info
      </button>

      {/* Navigation */}
      <Link to="/">
        <button className="w-45 mt-3 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition">
          BACK
        </button>
      </Link>
    </div>
  );
}
