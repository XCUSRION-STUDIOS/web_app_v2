
export default function DailyQuests() {
    return (
<div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
        <div className="w-full mt-auto p-1 text-[#767676] text-sm">
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => window.location.href = "/character-dashboard"}
            className="text-[#767676] p-1 rounded-md hover:bg-gray-700"
          >
            Status
          </button>
          <button
            onClick={() => window.location.href = "/daily-quests"}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            Daily Quests
          </button>
          <button
            onClick={() => window.location.href = "/quests"}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            Quests
          </button>
          <button
            onClick={() => window.location.href = "/skills"}
            className="p-2 rounded-md hover:bg-gray-700"
          >
            Skills
          </button>
          <button
            onClick={() => window.location.href = "/history"}
            className="p-2 rounded-md  hover:bg-gray-700"
          >
            History
          </button>
          <button
            onClick={() => window.location.href = "/"}
            className="p-2 rounded-md text-red-500"
          >
            Exit
          </button>
          </div>
        </div>


      </div>
    );
  }
  