import { Link } from 'react-router-dom';

export default function DailyQuests() {
    return (
<div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
        
        <div className="w-full mt-auto p-1 text-[#767676] text-sm">
        <div className="flex justify-center space-x-2">
        <Link to="/character-dashboard">
          <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
            Status
          </button>
          </Link>

          <Link to="/daily-quests">
          <button className="p-2 rounded-md hover:bg-gray-700">
            Daily Quests
          </button>
          </Link>
          
          <Link to="/quests">
          <button  className="p-2 rounded-md hover:bg-gray-700">
            Quests
          </button>
          </Link>

          <Link to="/skills">
          <button className="p-2 rounded-md hover:bg-gray-700">
            Skills
          </button>
          </Link>

          <Link to="/history">
          <button className="p-2 rounded-md  hover:bg-gray-700">
            History
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
  