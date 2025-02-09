import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadStats, StatInfo } from "../lib/statLoader";
import backgroundImage from '../assets/darkimg2.png';

export default function DailyQuests() {
  const [statInfo, setStatInfo] = useState<StatInfo>(loadStats());
  const [dailyQuests, setDailyQuests] = useState<{ id: number; name: string; type: string; xp: number; currency: number; difficulty: string; completed: boolean }[]>([]);
  const [newQuest, setNewQuest] = useState<{ name: string; type: string; difficulty: string }>({
    name: "",
    type: "Physical",
    difficulty: "Easy",
  });

  const XP_DISTRIBUTION = 0.8;
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [questToComplete, setQuestToComplete] = useState<number | null>(null); // ID of the quest to be completed
  const [showCompletionPopup, setShowCompletionPopup] = useState<boolean>(false);
  const [showPartialFailurePopup, setShowPartialFailurePopup] = useState<boolean>(false);
  const [showCompleteFailurePopup, setShowCompleteFailurePopup] = useState<boolean>(false);
  


  const difficultyRewards: Record<string, { xp: number; currency: number }> = {
    "Very Easy": { xp: 50, currency: 5 },
    "Easy": { xp: 100, currency: 10 },
    "Medium": { xp: 150, currency: 15 },
    "Hard": { xp: 200, currency: 20 },
    "Very Hard": { xp: 300, currency: 30 },
  };

  const handleDailyQuestLoadAndReset = () => {
    const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const lastResetDate = localStorage.getItem("lastResetDate");
  
    // Check if the quests need to be reset (i.e., it's a new day)
    if (!lastResetDate || lastResetDate !== todayDate) {
      // Save previous day's quests before resetting
      const previousQuests = localStorage.getItem("dailyQuests") || "[]";
      localStorage.setItem("previousQuests", previousQuests);
  
      // Optionally, evaluate the previous day's quests before resetting (for tracking purposes)
      evaluatePreviousDay();
  
      // Reset completion status of quests (mark as incomplete)
      const updatedQuests = JSON.parse(previousQuests).map((quest: any) => ({
        ...quest,
        completed: false, // Mark all quests as incomplete
      }));
  
      // Set the updated quests for the new day
      setDailyQuests(updatedQuests);
      localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
  
      // Update the reset date to today
      localStorage.setItem("lastResetDate", todayDate);
    } else {
      // It's not a new day, so load the quests for today
      const savedQuests = localStorage.getItem("dailyQuests");
      if (savedQuests) {
        setDailyQuests(JSON.parse(savedQuests));
      }
    }
  };
  
  // Function to complete a quest
  const completeQuest = (id: number) => {
    const quest = dailyQuests.find((quest) => quest.id === id);

    if (quest) {
      if (quest.completed) {
        setShowWarning(true); // Show warning if quest is already completed
        setQuestToComplete(id); // Set the quest ID
      } else {
        // const stats = loadStats();
        const stats = statInfo;

        const updatedQuests = dailyQuests.map((quest) =>
          quest.id === id ? { ...quest, completed: true } : quest
        );

        stats.xp += quest.xp * XP_DISTRIBUTION;
        const statKey = `${quest.type.toLowerCase()}_xp` as keyof StatInfo['stats_xp'];
        if (statKey in stats.stats_xp) {
          stats.stats_xp[statKey] += quest.xp * (1 - XP_DISTRIBUTION);
        }
        stats.currency += quest.currency;

        setDailyQuests(updatedQuests);
        localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
        localStorage.setItem("statInfo", JSON.stringify(stats));
        setStatInfo(stats);
      }
    } else {
      console.error('Quest not found!');
    }
  };
  
  const evaluatePreviousDay = () => {
    const previousQuests = localStorage.getItem("previousQuests");
    if (!previousQuests) return;
  
    const quests = JSON.parse(previousQuests);
    const incompleteQuests = quests.filter((quest: any) => !quest.completed);
    const totalQuests = quests.length;
  
    // const stats = loadStats();
    const stats = statInfo;
  
    if (incompleteQuests.length === 0) {
      // Full Completion Rewards
      
      stats.currency += 5; // Small gem reward
      stats.temp_buffs_val.xp = 0.05; // +5% XP gain tomorrow
      stats.temp_buffs_val.mood = 0.10; // +10% mood tomorrow
      console.log("Full Completion Rewards Applied");
      setShowCompletionPopup(true);
    } else if (incompleteQuests.length === totalQuests) {
      // Full Failure Consequences
      stats.temp_buffs_val.xp = 0.05; // -5% XP gain tomorrow
      stats.temp_buffs_val.mood = 0.10; // -10% mood tomorrow
      stats.temp_buffs_val.energy = 0.05; // -5% XP gain tomorrow
      setShowCompleteFailurePopup(true);
      console.log("Full Failure Consequences Applied");
    } else {
      // Partial Completion Consequences
      stats.temp_buffs_val.mood = 0.10; // -10% mood tomorrow
      setShowPartialFailurePopup(true);
      console.log("Partial Completion Consequences Applied");
    }
  
    // Save updated stats
    localStorage.setItem("statInfo", JSON.stringify(stats));
    setStatInfo(stats);
  };
  

  // Reset the daily quests when adding or deleting a quest
  const addQuest = () => {
    if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

    const { xp, currency } = difficultyRewards[newQuest.difficulty];

    const newQuestData = { id: Date.now(), ...newQuest, xp: xp, currency: currency, completed: false };

    const updatedQuests = [...dailyQuests, newQuestData];
    setDailyQuests(updatedQuests);
    localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));

    setNewQuest({ name: "", type: "Physical", difficulty: "Easy" });
  };

  const deleteQuest = (id: number) => {
    const updatedQuests = dailyQuests.filter((quest) => quest.id !== id);
    setDailyQuests(updatedQuests);
    localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
  };

  const closeWarning = () => {
    setShowWarning(false);
    setQuestToComplete(null);
  };

  useEffect(() => {
    handleDailyQuestLoadAndReset();
  }, []);

  

  useEffect(() => {
    const lastEvaluated = localStorage.getItem("lastEvaluatedDate");
    const today = new Date().toISOString().split("T")[0];
  
    if (lastEvaluated !== today) {
      evaluatePreviousDay();
      localStorage.setItem("lastEvaluatedDate", today);
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center justify-between text-white font-[monospace]"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="mt-5 p-6 border-indigo-500 rounded-[20px] text-white w-full max-w-3xl mx-auto">
        <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Daily Quests</h1>
        <div className="mt-10 flex gap-2 justify-center">
          <input
            type="text"
            placeholder="Quest Name"
            value={newQuest.name}
            onChange={(e) => setNewQuest({ ...newQuest, name: e.target.value })}
            className="p-2 bg-gray-700 rounded"
          />
          <select
            value={newQuest.type}
            onChange={(e) => setNewQuest({ ...newQuest, type: e.target.value })}
            className="p-2 bg-gray-700 rounded"
          >
            {["Physical", "Mental", "Social", "Spiritual", "Emotional"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={newQuest.difficulty}
            onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
            className="p-2 bg-gray-700 rounded"
          >
            {["Very Easy", "Easy", "Medium", "Hard", "Very Hard"].map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <button onClick={addQuest} className="bg-blue-500 px-4 py-2 rounded">
            Add Quest
          </button>
        </div>

        <div className="overflow-y-auto max-h-[400px] mt-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Difficulty</th>
                <th className="p-2">XP Reward</th>
                <th className="p-2">Gem Reward</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dailyQuests.map((quest) => (
                <tr key={quest.id} className="border-b border-gray-700">
                  <td className="p-2">{quest.name}</td>
                  <td className="p-2">{quest.type}</td>
                  <td className="p-2">{quest.difficulty}</td>
                  <td className="p-2">{quest.xp} ⭐</td>
                  <td className="p-2">{quest.currency} 💎</td>
                  <td className="p-2">
                    <button
                
                      onClick={() => completeQuest(quest.id)}
                      style={{ backgroundColor: quest.completed ? "#6B7280" : "#10B981" }}  // Grey and Green colours
                      className="px-3 py-1 rounded mr-2"
                    >
                      {quest.completed ? "Completed" : "Complete"}
                    </button>
                    <button
                      onClick={() => deleteQuest(quest.id)}
                      className="bg-red-500 px-3 py-1 rounded"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pop-ups */}
        {showCompletionPopup && (
          <div className="mt-5 justify-center text-center bg-green-600 text-white rounded-md shadow-md text-[10px]">
            <p>Well Done! All quests completed!</p>
            <p></p>
            <p>Applied Perks:</p>
            <p>+5% XP gain, +10% mood tomorrow</p>
            
          </div>
        )}

        {showPartialFailurePopup && (
          <div className="mt-5 justify-center text-center bg-orange-600 text-white rounded-md shadow-md">
            <p>You missed some quests yesterday! Consequences have been applied.</p>
            <p>Applied Debuffs:</p>
            <p>-5% mood tomorrow</p>
          </div>
        )}

        {showCompleteFailurePopup && (
          <div className="mt-5 justify-center text-center bg-red-600 text-white rounded-md shadow-md">
            <p>You missed some quests yesterday! Consequences have been applied.</p>
            <p>Applied Debuffs:</p>
            <p>-5% XP gain, -10% mood tomorrow</p>
          </div>
        )}

        {/* Warning Message */}
        {showWarning && questToComplete !== null && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 p-4 bg-red-600 text-white rounded-md shadow-md">
            <p>You cannot complete the quest "{dailyQuests.find(quest => quest.id === questToComplete)?.name}" because it's already completed!</p>
            <button
              onClick={closeWarning}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <div className="w-full p-1 text-[#767676] text-sm">
        <div className="flex justify-center space-x-2">
          <Link to="/character-dashboard">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Status</button>
          </Link>
          <Link to="/daily-quests">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Daily Quests</button>
          </Link>
          <Link to="/quests">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Quests</button>
          </Link>
          <Link to="/skills">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Skills</button>
          </Link>
          <Link to="/shop">
            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Shop</button>
          </Link>
          <Link to="/">
            <button className="p-2 rounded-md text-red-500">Exit</button>
          </Link>
        </div>
      </div>
    </div>
  );
}



