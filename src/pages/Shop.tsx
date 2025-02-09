
import { Link } from "react-router-dom";
import { useState} from "react";
import backgroundImage from "../assets/darkimg2.png";
import { loadStats, StatInfo } from "../lib/statLoader"; // Import the loader
import { Card } from "@/components/ui/card";

export default function Shop() {
  const [statInfo, setStatInfo] = useState<StatInfo>(loadStats());
  const [error, setError] = useState<string | null>(null);

  // Load inventory from local storage or initialize empty array
  const [inventory, setInventory] = useState<string[]>(
    JSON.parse(localStorage.getItem("inventory") || "[]")
  );

  const [itemShop, setItemShop] = useState([
    { name: "Health Potion", description: "Restores 50% of your health.", price: 100, purchased: false },
    { name: "XP Boost", description: "Increases XP gain by 20% for 1 hour.", price: 250, purchased: false },
    { name: "Permanent Strength Boost", description: "Increases physical stats permanently by 10%.", price: 500, purchased: false },
  ]);

  const [customizationShop, setCustomizationShop] = useState([
    { name: "Space Theme", description: "Unlocks a space-themed visual for your dashboard.", price: 30, purchased: false },
    { name: "Dark Mode", description: "Switches your shop to a dark color scheme.", price: 15, purchased: false },
    { name: "Custom Avatar Frame", description: "Adds a unique border around your profile picture.", price: 40, purchased: false },
  ]);

  // Handle buying an item
  const handlePurchase = (itemName: string, price: number, type: "item" | "customization") => {
    if (statInfo.currency < price) {
      setError("Not enough gems! 💎");
      return;
    }

    const updatedShop = type === "item" ? [...itemShop] : [...customizationShop];
    const itemIndex = updatedShop.findIndex((item) => item.name === itemName);

    if (itemIndex !== -1 && !updatedShop[itemIndex].purchased) {
      updatedShop[itemIndex].purchased = true;

      // Deduct gems
      const updatedStats = { ...statInfo, currency: statInfo.currency - price };
      setStatInfo(updatedStats);
      localStorage.setItem("statInfo", JSON.stringify(updatedStats));

      // Add to inventory and save
      const updatedInventory = [...inventory, itemName];
      setInventory(updatedInventory);
      localStorage.setItem("inventory", JSON.stringify(updatedInventory));

      // Update the correct shop
      if (type === "item") setItemShop(updatedShop);
      else setCustomizationShop(updatedShop);

      setError(null); // Clear any previous error
    }
  };

  return (
    <div
      className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center justify-between text-white font-[monospace]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="mt-4 text-3xl font-[Metropolis] text-center">SHOP</h1>
      <Card className="mt-4 text-white bg-white/20 backdrop-blur-[2px] font-bold px-3 py-1 rounded-full shadow-md">
        Gems: {statInfo.currency} 💎
      </Card>

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      {/* Shop Layout */}
      <div className="flex justify-center space-x-4 mt-10 w-full">
        {/* Items & Perks */}
        <div className="px-5 py-5 w-[45%] h-[60vh] overflow-y-scroll bg-white/10 backdrop-blur-[2px] rounded-lg shadow-sm">
          <h2 className="text-xl text-center font-bold mb-4">Items & Perks</h2>
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2">Name</th>
                <th className="py-2">Description</th>
                <th className="py-2">Price</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {itemShop.map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.description}</td>
                  <td className="py-2">{item.price}💎</td>
                  <td>
                    <button
                      onClick={() => handlePurchase(item.name, item.price, "item")}
                      className={`px-3 py-1 rounded ${
                        item.purchased ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
                      }`}
                      disabled={item.purchased}
                    >
                      {item.purchased ? "Owned" : "BUY"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Customization Shop */}
        <div className="px-5 py-5 w-[45%] h-[60vh] overflow-y-scroll bg-white/10 backdrop-blur-[2px] rounded-lg shadow-sm">
          <h2 className="text-xl text-center font-bold mb-4">Customization</h2>
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2">Name</th>
                <th className="py-2">Description</th>
                <th className="py-2">Price</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {customizationShop.map((item, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.description}</td>
                  <td className="py-2">{item.price}💎</td>
                  <td>
                    <button
                      onClick={() => handlePurchase(item.name, item.price, "customization")}
                      className={`px-3 py-1 rounded ${
                        item.purchased ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
                      }`}
                      disabled={item.purchased}
                    >
                      {item.purchased ? "Owned" : "BUY"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full mt-auto p-1 text-[#767676] text-sm">
        {/* Navigation Links */}
        <div className="flex justify-center space-x-2">
          <Link to="/character-dashboard"><button className="p-2 rounded-md hover:bg-gray-700">Status</button></Link>
          <Link to="/daily-quests"><button className="p-2 rounded-md hover:bg-gray-700">Daily Quests</button></Link>
          <Link to="/quests"><button className="p-2 rounded-md hover:bg-gray-700">Quests</button></Link>
          <Link to="/skills"><button className="p-2 rounded-md hover:bg-gray-700">Skills</button></Link>
          <Link to="/shop"><button className="p-2 rounded-md hover:bg-gray-700">Shop</button></Link>
          <Link to="/"><button className="p-2 rounded-md text-red-500">Exit</button></Link>
        </div>
      </div>
    </div>
  );
}
