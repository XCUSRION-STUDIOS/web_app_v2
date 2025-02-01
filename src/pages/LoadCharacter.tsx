import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/darkimg2.png';
import Logo from '../assets/xcursionlogo.png';

interface Character {
  username: string;
  age: string;
  height: string;
  ethnicity: string;
  occupation: string;
  relationship: string;
  physical: string;
  spiritual: string;
  mental: string;
  social: string;
  emotional: string;
}

// const handleClearData = () => {
//   localStorage.removeItem("characters");
//   alert("Character data has been cleared.");
// };

export default function LoadCharacter() {
  const [storedCharacters, setStoredCharacters] = useState<Character[]>([]);

  // Fetch characters from localStorage on mount
  useEffect(() => {
    const characters = JSON.parse(localStorage.getItem("characters") || "[]");
    setStoredCharacters(characters);
  }, []);

  // Check if there are no characters stored
  if (storedCharacters.length === 0) {
    return (
      <div
        className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-10">
          <img src={Logo} alt="XCURSION STUDIOS" className="h-10" />
        </div>
        <div className="text-white text-xl font-[Metropolis]">
          No character data found. Please create a character first.
        </div>
        <Link to="/create-character">
          <button className="w-45 mt-5 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition">
            Go to Character Creation
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-10">
        <img src={Logo} alt="XCURSION STUDIOS" className="h-10" />
      </div>

      <div className="space-y-5 w-150 max-w-3xl">
        {storedCharacters.map((char, index) => (
          <div
            key={index}
            className="p-4 h-35 bg-white/5 backdrop-blur-[2px] rounded-lg shadow-sm flex justify-between items-center"
          >
            <div className="flex flex-col space-y-0.5">
              <h2 className="text-xl font-light tracking-wide font-[Metropolis]">{char.username || "Unknown"}</h2>
              <p className="text-2xl font-bold">Level: 1</p>
              <p className="text-[0.75em]">Class: N/A</p>
              <p className="text-[0.75em]">Title: {char.occupation || "Unknown"}</p>
              <p className="text-[0.75em]">Age: {char.age || "Unknown"}</p>
            </div>

            <div className="flex flex-col space-y-1.5 w-48">
              <div className="flex items-center">
                <p className="text-[0.75em] w-8 text-right mr-2">HP:</p>
                <div className="flex-1 h-1 bg-gray-700 rounded-md overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: "100%" }}></div>
                </div>
              </div>

              <div className="flex items-center">
                <p className="text-[0.75em] w-8 text-right mr-2">EG:</p>
                <div className="flex-1 h-1 bg-gray-700 rounded-md overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: "50%" }}></div>
                </div>
              </div>

              <div className="flex items-center">
                <p className="text-[0.75em] w-8 text-right mr-2">MD:</p>
                <div className="flex-1 h-1 bg-gray-700 rounded-md overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link to="/character-dashboard">
        <button className="w-45 mt-10 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition">
          LOAD
        </button>
      </Link>

      <Link to="/">
        <button className="w-45 mt-3 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition">
          BACK
        </button>
      </Link>

      {/* <button
        onClick={handleClearData}
        className="w-45 mt-5 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition"
      >
        Clear Data
      </button> */}

      <div className="absolute bottom-4 text-white opacity-70 text-sm">
        <p className="font-[Metropolis]">www.url.com</p>
      </div>
    </div>
  );
}
