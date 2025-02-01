import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/darkimg2.png';
import Logo from '../assets/xcursionlogo.png';

const handleClearData = () => {
  localStorage.removeItem("characters");
  alert("Character data has been cleared.");
  window.location.reload(); // Refresh to update state
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

export default function HomePage() {
  const [hasCharacters, setHasCharacters] = useState(false);

  useEffect(() => {
    const storedCharacters = JSON.parse(localStorage.getItem("characters") || "[]");
    setHasCharacters(storedCharacters.length > 0);
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
        className="absolute flex flex-col items-center text-center text-white"
        style={{ top: '35%' }}
      >
        <div className="border-t border-white w-64 opacity-50"></div>
        <h1 className="mt-3 text-6xl font-thin tracking-widest">INCOMPLETE ASCENSION</h1>
        <div className="mt-3 border-t border-white w-64 opacity-50"></div>
      </div>

      {/* Buttons Section */}
      <div className="mt-[45vh] flex flex-col items-center gap-3 text-white text-[1.15em]">
        <Link to="/new-character">
          <button className="text-white w-60 bg-white/20 backdrop-blur-[2px] font-bold px-4 py-2 rounded-full transition duration-300 shadow-md hover:scale-105 active:scale-98">
            NEW CHARACTER
          </button>
        </Link>

        <Link to={hasCharacters ? "/load-character" : "#"}>
          <button
            className={`w-60 font-bold px-4 py-2 rounded-full transition duration-300 shadow-md ${
              hasCharacters
                ? "text-white bg-white/20 backdrop-blur-[2px] hover:scale-105 active:scale-98"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!hasCharacters}
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

      {/* Utility Buttons */}
      <div className="mt-5 flex flex-col items-center gap-2">
        <button
          onClick={handleExportData}
          className={`w-45 px-6 py-2 text-base rounded-full transition ${
            hasCharacters
              ? "text-black bg-white hover:bg-gray-300"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!hasCharacters}
        >
          Export Data
        </button>

        <button
          onClick={handleClearData}
          className="w-45 px-6 py-2 text-base text-black bg-white rounded-full hover:bg-gray-300 transition"
        >
          Clear Data
        </button>
      </div>

      {/* Footer Section */}
      <div className="absolute bottom-4 text-white opacity-70 text-sm">
        <p className="font-[Metropolis]">www.url.com</p>
      </div>
    </div>
  );
}
