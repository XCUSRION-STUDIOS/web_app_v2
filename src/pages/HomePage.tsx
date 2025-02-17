import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/darkimg2.png';
import Logo from '../assets/xcursionlogo.png';
import { loadCharacter } from "../lib/charLoader"; // Assuming charLoader is in the same directory

export default function HomePage() {
  const [hasCharacter, setHasCharacter] = useState(false);

  useEffect(() => {
    // Load character from localStorage using your charLoader logic
    const existingCharacter = loadCharacter();
    
    // If the username is not empty, we have a character
    if (existingCharacter.username !== "") {
      setHasCharacter(true);
    } else {
      setHasCharacter(false);
    }
  }, []);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Logo Section */}
      <div className="absolute top-10">
        <img src={Logo} alt="XCURSION STUDIOS" className="h-10" />
      </div>

      {/* Title Section */}
      <div
        className="absolute flex flex-col items-center text-center text-white font-[Metropolis]"
        style={{ top: '35%' }}
      >
        <div className="border-t border-white w-64 opacity-50"></div>
        <h1 className="mt-3 text-6xl font-thin tracking-widest">INCOMPLETE ASCENSION</h1>
        <div className="mt-3 border-t border-white w-64 opacity-50"></div>
      </div>

      {/* Buttons Section */}
      <div className="mt-[45vh] flex flex-col items-center gap-3 text-white text-[1.15em] font-[Metropolis]">
        <Link to="/new-character">
          <button className="text-white w-60 bg-white/20 backdrop-blur-[2px] font-bold px-4 py-2 rounded-full transition duration-300 shadow-md hover:scale-105 active:scale-98">
            NEW CHARACTER
          </button>
        </Link>

        <Link to={hasCharacter ? "/load-character" : "#"}>
          <button
            className={`w-60 font-bold px-4 py-2 rounded-full transition duration-300 shadow-md ${
              hasCharacter
                ? "text-white bg-white/20 backdrop-blur-[2px] hover:scale-105 active:scale-98"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!hasCharacter}
          >
            LOAD CHARACTER
          </button>
        </Link>

        <Link to="/settings">
          <button className="text-white w-60 bg-white/20 backdrop-blur-[2px] font-bold px-4 py-2 rounded-full transition duration-300 shadow-md hover:scale-105 active:scale-98">
            SETTINGS
          </button>
        </Link>
      </div>

      {/* Footer Section */}
      <div className="absolute bottom-4 text-white opacity-70 text-sm">
        <p className="font-[Metropolis]">www.url.com</p>
      </div>
    </div>
  );
}
