import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backgroundImage from '../assets/darkimg2.png';

export default function Skills() {
  const [permanentPerks, setPermanentPerks] = useState<string[]>([]);
  const [temporaryQuirks, setTemporaryQuirks] = useState<string[]>([]);
  const [inventory, setInventory] = useState<{ name: string; description: string }[]>([]);

  // Load equipped perks and inventory from localStorage or another data source
  useEffect(() => {
    const storedPerks = JSON.parse(localStorage.getItem("permanentPerks") || "[]");
    const storedQuirks = JSON.parse(localStorage.getItem("temporaryQuirks") || "[]");
    const storedInventory = JSON.parse(localStorage.getItem("inventory") || "[]");

    setPermanentPerks(storedPerks);
    setTemporaryQuirks(storedQuirks);
    setInventory(storedInventory);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col items-center text-white font-[monospace] p-6"
     style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="text-3xl font-bold mb-4 font-[Metropolis]">Skills & Inventory</h1>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {/* Equipped Permanent Perks */}
        <div className="w-1/3 p-4 bg-white/10 backdrop-blur-[2px] rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">Equipped Permanent Perks</h2>
          <ul className="mt-2 text-sm">
            {permanentPerks.length > 0 ? (
              permanentPerks.map((perk, index) => <li key={index}>- {perk}</li>)
            ) : (
              <p className="text-gray-400">No permanent perks equipped.</p>
            )}
          </ul>
        </div>

        {/* Equipped Temporary Quirks */}
        <div className="w-1/3 p-4 bg-white/10 backdrop-blur-[2px] rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">Equipped Temporary Quirks</h2>
          <ul className="mt-2 text-sm">
            {temporaryQuirks.length > 0 ? (
              temporaryQuirks.map((quirk, index) => <li key={index}>- {quirk}</li>)
            ) : (
              <p className="text-gray-400">No temporary quirks equipped.</p>
            )}
          </ul>
        </div>

        {/* Inventory */}
        <div className="w-1/3 p-4 bg-white/10 backdrop-blur-[2px] rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">Inventory</h2>
          <ul className="mt-2 text-sm">
            {inventory.length > 0 ? (
              inventory.map((item, index) => (
                <li key={index} className="mb-1">
                  <strong>{item.name}</strong>: {item.description}
                </li>
              ))
            ) : (
              <p className="text-gray-400">Inventory is empty.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="w-full mt-auto p-1 text-[#767676] text-sm">
        <div className="flex justify-center space-x-2">
          <Link to="/character-dashboard">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
              Status
            </button>
          </Link>

          <Link to="/daily-quests">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
              Daily Quests
            </button>
          </Link>

          <Link to="/quests">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
              Quests
            </button>
          </Link>

          <Link to="/skills">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
              Skills
            </button>
          </Link>

          <Link to="/shop">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
              Shop
            </button>
          </Link>

          <Link to="/">
            <button className="p-2 rounded-md text-red-500">
              Exit
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
