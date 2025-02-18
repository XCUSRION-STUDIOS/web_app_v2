import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/darkimg2.png";
import Logo from "../assets/xcursionlogo.png";
import { loadCharacter, storeCharacter } from "../lib/charLoader";

export default function NewCharacter() {
  const navigate = useNavigate();

  // Load existing character data or initialize a new one
  const [character, setCharacter] = useState(() => loadCharacter());

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value,
    }));
  };

  // Save character data to LocalStorage
  const handleCreate = () => {
    // Check for empty entries (excluding skill values)
    const isEmpty = ["username", "age", "height", "ethnicity", "occupation"].some(
      (key) => character[key as keyof typeof character].toString().trim() === ""
    );

    if (isEmpty) {
      alert("Please fill in all fields.");
      return;
    }

    // Store the new character
    const existingCharacter = loadCharacter();
    if (existingCharacter.username !== "") {  // Default character check
      alert("A character has already been created!");
      return;
    }
  
    // Store the new character
    storeCharacter({ ...character, createdAt: Date.now() });
  
    // Navigate to the Load Character page
    navigate("/load-character");
  };
    
  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Logo Section */}
      <div className="absolute top-10">
        <img src={Logo} alt="XCURSION STUDIOS" className="h-10" />
      </div>

      {/* Character Info Section */}
      <div className="mt-5 text-center">
        <h1 className="text-xl font-light tracking-wide font-[Metropolis]">CHARACTER INFO:</h1>
      </div>

      {/* Input Fields */}
      <div className="mt-6 space-y-2 w-96 flex flex-col items-center text-white">
        {["username", "age", "height", "ethnicity", "occupation"].map((label) => (
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

      {/* CREATE Button */}
      <button
        onClick={handleCreate}
        className="w-30 mt-10 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition"
      >
        CREATE
      </button>

      {/* Exit Button */}
      <Link to="/">
        <button className="w-30 mt-3 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition">
          BACK
        </button>
      </Link>

      {/* Footer Section */}
      <div className="absolute bottom-4 text-white opacity-70 text-sm">
        <p className="font-[Metropolis]">www.url.com</p>
      </div>
    </div>
  );
}




