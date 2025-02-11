import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import backgroundImage from '../assets/darkimg2.png';
import { loadStats, StatInfo } from "../lib/statLoader";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  purchased: boolean;
}

export default function Skills() {
  const [statInfo, _] = useState<StatInfo>(loadStats());
  const [permanentPerks, setPermanentPerks] = useState<string[]>([]);
  const [temporaryQuirks, setTemporaryQuirks] = useState<string[]>([]);
  const [inventory, setInventory] = useState<{ name: string; description: string }[]>([]);

  useEffect(() => {
    const storedPerks = JSON.parse(localStorage.getItem("permanentPerks") || "[]");
    const storedInventoryIds: number[] = JSON.parse(localStorage.getItem("inventory") || "[]");

    const itemShop: ShopItem[] = JSON.parse(localStorage.getItem("itemShop") || "[]");
    const customizationShop: ShopItem[] = JSON.parse(localStorage.getItem("customizationShop") || "[]");

    const shopItemsMap = [...itemShop, ...customizationShop].reduce((acc, item) => {
      acc[item.id] = { name: item.name, description: item.description };
      return acc;
    }, {} as Record<number, { name: string; description: string }>);

    const inventoryDetails = storedInventoryIds.map(id => shopItemsMap[id] || { name: "Unknown Item", description: "No description available." });

    const tempBuffs = Object.entries(statInfo.temp_buffs_val)
      .filter(([_, value]) => value !== 1)
      .map(([key, value]) => {
        const percentageChange = Math.abs((value - 1) * 100).toFixed(2);
        const changeType = value > 1 ? "increase" : "decrease";
        return `${key}: ${percentageChange}% ${changeType}`;
      });

    setPermanentPerks(storedPerks);
    setTemporaryQuirks(tempBuffs);
    setInventory(inventoryDetails);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col items-center text-white font-[monospace] p-6"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="text-3xl font-bold mb-4 font-[Metropolis]">Skills + Inventory</h1>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {/* Equipped Permanent Perks */}
        <div className="w-1/3 p-4 bg-white/10 backdrop-blur-[2px] rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center">Permanent Effects</h2>
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
          <h2 className="text-xl font-bold text-center">Temporary Effects</h2>
          <ul className="mt-2 text-sm text-center">
            {temporaryQuirks.length > 0 ? (
              temporaryQuirks.map((quirk, index) => <li key={index}>- {quirk}</li>)
            ) : (
              <p className="text-gray-400">No temporary quirks equipped.</p>
            )}
          </ul>
        </div>

        {/* Inventory Table */}
        <div className="w-1/3 p-4 bg-white/10 backdrop-blur-[2px] rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center mb-2">Inventory</h2>
          {inventory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center border-collapse border-b border-t border-gray-700">
                <thead className=" text-white">
                  <tr>
                    <th className="border-b border-gray-700 p-2">Item Name</th>
                    <th className="border-b border-gray-700 p-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-900">
                      <td className="border-b border-gray-700 p-2 font-semibold">{item.name}</td>
                      <td className="border-b border-gray-700 p-2">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center">Inventory is empty.</p>
          )}
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
