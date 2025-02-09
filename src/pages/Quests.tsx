// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import backgroundImage from '../assets/darkimg2.png';

// export default function Quests() {
//   const skillTypes = ["Physical", "Mental", "Social", "Spiritual", "Emotional"];
//   const difficulties = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

//   const difficultyXP: Record<string, number> = {
//     "Very Easy": 50,
//     "Easy": 100,
//     "Medium": 150,
//     "Hard": 200,
//     "Very Hard": 300,
//   };

//   const loadQuests = () => {
//     const savedQuests = localStorage.getItem("quests");
//     return savedQuests ? JSON.parse(savedQuests) : [];
//   };

//   const [quests, setQuests] = useState<{ id: number; name: string; type: string; xp: number; difficulty: string; isComplete: boolean }[]>(loadQuests);
//   const [newQuest, setNewQuest] = useState<{ name: string; type: string; difficulty: string }>({
//     name: "",
//     type: skillTypes[0],
//     difficulty: difficulties[0],
//   });

//   const addQuest = () => {
//     if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

//     const xpReward = difficultyXP[newQuest.difficulty];

//     const newQuestData = { id: Date.now(), ...newQuest, xp: xpReward, isComplete: false };

//     const updatedQuests = [...quests, newQuestData];
//     setQuests(updatedQuests);
//     localStorage.setItem("quests", JSON.stringify(updatedQuests));

//     setNewQuest({ name: "", type: skillTypes[0], difficulty: difficulties[0] });
//   };

//   const deleteQuest = (id: number) => {
//     const updatedQuests = quests.filter((quest) => quest.id !== id);
//     setQuests(updatedQuests);
//     localStorage.setItem("quests", JSON.stringify(updatedQuests));
//   };

//   const completeQuest = (id: number) => {
//     const updatedQuests = quests.map((quest) => 
//       quest.id === id ? { ...quest, isComplete: true } : quest
//     );
//     setQuests(updatedQuests);
//     localStorage.setItem("quests", JSON.stringify(updatedQuests));
//   };

//   const reopenQuest = (id: number) => {
//     const updatedQuests = quests.map((quest) => 
//       quest.id === id ? { ...quest, isComplete: false } : quest
//     );
//     setQuests(updatedQuests);
//     localStorage.setItem("quests", JSON.stringify(updatedQuests));
//   };

//   return (
//     <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center justify-between text-white font-[monospace]"
//       style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <div className="mt-5 p-6 border-indigo-500 rounded-[20px] text-white w-full max-w-3xl mx-auto">
//         <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Quest Menu</h1>
//         <div className="mt-10 flex gap-2 justify-center">
//           <input
//             type="text"
//             placeholder="Quest Name"
//             value={newQuest.name}
//             onChange={(e) => setNewQuest({ ...newQuest, name: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           />
//           <select
//             value={newQuest.type}
//             onChange={(e) => setNewQuest({ ...newQuest, type: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           >
//             {skillTypes.map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//           <select
//             value={newQuest.difficulty}
//             onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           >
//             {difficulties.map((level) => (
//               <option key={level} value={level}>{level}</option>
//             ))}
//           </select>
//           <button onClick={addQuest} className="bg-blue-500 px-4 py-2 rounded">
//             Add Quest
//           </button>
//         </div>

//         <div className="overflow-y-auto max-h-[400px] mt-10">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Type</th>
//                 <th className="p-2">Difficulty</th>
//                 <th className="p-2">XP Reward</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quests.map((quest) => (
//                 <tr key={quest.id} className="border-b border-gray-700">
//                   <td className="p-2">{quest.name}</td>
//                   <td className="p-2">{quest.type}</td>
//                   <td className="p-2">{quest.difficulty}</td>
//                   <td className="p-2">{quest.xp}</td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => completeQuest(quest.id)}
//                       className={`bg-gray-500 px-3 py-1 rounded mr-2 ${quest.isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
//                       disabled={quest.isComplete}
//                     >
//                       COMPLETE
//                     </button>
//                     <button
//                       onClick={() => reopenQuest(quest.id)}
//                       className={`bg-yellow-500 px-3 py-1 rounded mr-2 ${!quest.isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
//                       disabled={!quest.isComplete}
//                     >
//                       RE-OPEN
//                     </button>
//                     <button onClick={() => deleteQuest(quest.id)} className="bg-red-500 px-3 py-1 rounded">
//                       DELETE
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="w-full p-1 text-[#767676] text-sm">
//         <div className="flex justify-center space-x-2">
//           <Link to="/character-dashboard">
//             <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Status</button>
//           </Link>
//           <Link to="/daily-quests">
//             <button className="p-2 rounded-md hover:bg-gray-700">Daily Quests</button>
//           </Link>
//           <Link to="/quests">
//             <button className="p-2 rounded-md hover:bg-gray-700">Quests</button>
//           </Link>
//           <Link to="/skills">
//             <button className="p-2 rounded-md hover:bg-gray-700">Skills</button>
//           </Link>
//           <Link to="/history">
//             <button className="p-2 rounded-md hover:bg-gray-700">History</button>
//           </Link>
//           <Link to="/">
//             <button className="p-2 rounded-md text-red-500">Exit</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
// import backgroundImage from '../assets/darkimg2.png';
// import { loadStats, StatInfo } from "../lib/statLoader";

// export default function Quests() {
//   const [statInfo, setStatInfo] = useState<StatInfo>(loadStats());
//   const skillTypes = ["Physical", "Mental", "Social", "Spiritual", "Emotional"];
//   const difficulties = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

//   const XP_DISTRIBUTION = 0.8;

//   const difficultyRewards: Record<string, { xp: number; currency: number }> = {
//     "Very Easy": { xp: 50, currency: 5 },
//     "Easy": { xp: 100, currency: 10 },
//     "Medium": { xp: 150, currency: 15 },
//     "Hard": { xp: 200, currency: 20 },
//     "Very Hard": { xp: 300, currency: 30 },
//   };

//   const loadQuests = () => {
//     const savedQuests = localStorage.getItem("quests");
//     return savedQuests ? JSON.parse(savedQuests) : [];
//   };

//   const [quests, setQuests] = useState<{ id: number; name: string; type: string; xp: number; difficulty: string; isComplete: boolean }[]>(loadQuests);
//   const [newQuest, setNewQuest] = useState<{ name: string; type: string; difficulty: string }>({
//     name: "",
//     type: skillTypes[0],
//     difficulty: difficulties[0],
//   });

//   // const addQuest = () => {
//   //   if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

//   //   const xpReward = difficultyRewards[newQuest.difficulty];

//   //   const newQuestData = { id: Date.now(), ...newQuest, xp: xpReward, isComplete: false };

//   //   const updatedQuests = [...quests, newQuestData];
//   //   setQuests(updatedQuests);
//   //   localStorage.setItem("quests", JSON.stringify(updatedQuests));

//   //   setNewQuest({ name: "", type: skillTypes[0], difficulty: difficulties[0] });
//   // };

//   const addQuest = () => {
//     if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

//     const { xp, currency } = difficultyRewards[newQuest.difficulty];

//     const newQuestData = {
//       id: Date.now(),
//       ...newQuest,
//       xp,
//       currency,
//       completed: false,
//     };

//     const updatedQuests = [...quests, newQuestData];
//     setQuests(updatedQuests);
//     localStorage.setItem("quests", JSON.stringify(updatedQuests));

//     setNewQuest({ name: "", type: skillTypes[0], difficulty: difficulties[0] });
//   };

//   const deleteQuest = (id: number) => {
//     const updatedQuests = quests.filter((quest) => quest.id !== id);
//     setQuests(updatedQuests);
//     localStorage.setItem("quests", JSON.stringify(updatedQuests));
//   };

//   const completeQuest = (id: number) => {
//     const stats = loadStats();
//     const updatedQuests = quests.map((quest) => 
//       quest.id === id ? { ...quest, isComplete: true } : quest
//     );

//     stats.xp += quest.xp * XP_DISTRIBUTION;
//     const statKey = `${quest.type.toLowerCase()}_xp` as keyof StatInfo['stats_xp'];
//     if (statKey in stats.stats_xp) {
//       stats.stats_xp[statKey] += quest.xp * (1 - XP_DISTRIBUTION);
//     }
//     stats.currency += quest.currency;
//     }

//     setQuests(updatedQuests);
//     localStorage.setItem("quests", JSON.stringify(updatedQuests));
//     localStorage.setItem("statInfo", JSON.stringify(stats));
//     setStatInfo(stats);
//   };

//   const reopenQuest = (id: number) => {
//     const updatedQuests = quests.map((quest) => 
//       quest.id === id ? { ...quest, isComplete: false } : quest
//     );
//     setQuests(updatedQuests);
//     localStorage.setItem("quests", JSON.stringify(updatedQuests));
//   };

//   return (
//     <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center justify-between text-white font-[monospace]"
//       style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <div className="mt-5 p-6 border-indigo-500 rounded-[20px] text-white w-full max-w-3xl mx-auto">
//         <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Quest Menu</h1>
//         <div className="mt-10 flex gap-2 justify-center">
//           <input
//             type="text"
//             placeholder="Quest Name"
//             value={newQuest.name}
//             onChange={(e) => setNewQuest({ ...newQuest, name: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           />
//           <select
//             value={newQuest.type}
//             onChange={(e) => setNewQuest({ ...newQuest, type: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           >
//             {skillTypes.map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//           <select
//             value={newQuest.difficulty}
//             onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           >
//             {difficulties.map((level) => (
//               <option key={level} value={level}>{level}</option>
//             ))}
//           </select>
//           <button onClick={addQuest} className="bg-blue-500 px-4 py-2 rounded">
//             Add Quest
//           </button>
//         </div>

//         <div className="overflow-y-auto max-h-[400px] mt-10">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-700">
//                 <th className="p-2">Name</th>
//                 <th className="p-2">Type</th>
//                 <th className="p-2">Difficulty</th>
//                 <th className="p-2">XP Reward</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quests.map((quest) => (
//                 <tr key={quest.id} className="border-b border-gray-700">
//                   <td className="p-2">{quest.name}</td>
//                   <td className="p-2">{quest.type}</td>
//                   <td className="p-2">{quest.difficulty}</td>
//                   <td className="p-2">{quest.xp}</td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => completeQuest(quest.id)}
//                       className={`bg-gray-500 px-3 py-1 rounded mr-2 ${quest.isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
//                       disabled={quest.isComplete}
//                     >
//                       COMPLETE
//                     </button>
//                     <button
//                       onClick={() => reopenQuest(quest.id)}
//                       className={`bg-yellow-500 px-3 py-1 rounded mr-2 ${!quest.isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
//                       disabled={!quest.isComplete}
//                     >
//                       RE-OPEN
//                     </button>
//                     <button onClick={() => deleteQuest(quest.id)} className="bg-red-500 px-3 py-1 rounded">
//                       DELETE
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="w-full p-1 text-[#767676] text-sm">
//         <div className="flex justify-center space-x-2">
//           <Link to="/character-dashboard">
//             <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">Status</button>
//           </Link>
//           <Link to="/daily-quests">
//             <button className="p-2 rounded-md hover:bg-gray-700">Daily Quests</button>
//           </Link>
//           <Link to="/quests">
//             <button className="p-2 rounded-md hover:bg-gray-700">Quests</button>
//           </Link>
//           <Link to="/skills">
//             <button className="p-2 rounded-md hover:bg-gray-700">Skills</button>
//           </Link>
//           <Link to="/history">
//             <button className="p-2 rounded-md hover:bg-gray-700">History</button>
//           </Link>
//           <Link to="/">
//             <button className="p-2 rounded-md text-red-500">Exit</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
// import React, { useState, useEffect } from "react";
import { useState} from "react";
import backgroundImage from '../assets/darkimg2.png';
import { loadStats, StatInfo } from "../lib/statLoader";

export default function Quests() {
  const [statInfo, setStatInfo] = useState<StatInfo>(loadStats());
  const skillTypes = ["Physical", "Mental", "Social", "Spiritual", "Emotional"];
  const difficulties = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

  const XP_DISTRIBUTION = 0.8;

  const difficultyRewards: Record<string, { xp: number; currency: number }> = {
    "Very Easy": { xp: 50, currency: 5 },
    "Easy": { xp: 100, currency: 10 },
    "Medium": { xp: 150, currency: 15 },
    "Hard": { xp: 200, currency: 20 },
    "Very Hard": { xp: 300, currency: 30 },
  };
  console.log(statInfo)

  const loadQuests = () => {
    const savedQuests = localStorage.getItem("quests");
    return savedQuests ? JSON.parse(savedQuests) : [];
  };

  const [quests, setQuests] = useState<{ id: number; name: string; type: string; xp: number; currency: number; difficulty: string; isComplete: boolean }[]>(loadQuests);
  const [newQuest, setNewQuest] = useState<{ name: string; type: string; difficulty: string }>({
    name: "",
    type: skillTypes[0],
    difficulty: difficulties[0],
  });

  const addQuest = () => {
    if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

    const { xp, currency } = difficultyRewards[newQuest.difficulty];

    const newQuestData = {
      id: Date.now(),
      ...newQuest,
      xp,
      currency,
      isComplete: false,
    };

    const updatedQuests = [...quests, newQuestData];
    setQuests(updatedQuests);
    localStorage.setItem("quests", JSON.stringify(updatedQuests));

    setNewQuest({ name: "", type: skillTypes[0], difficulty: difficulties[0] });
  };

  const deleteQuest = (id: number) => {
    const updatedQuests = quests.filter((quest) => quest.id !== id);
    setQuests(updatedQuests);
    localStorage.setItem("quests", JSON.stringify(updatedQuests));
  };

  const completeQuest = (id: number) => {
    const stats = loadStats();
    const updatedQuests = quests.map((quest) => 
      quest.id === id ? { ...quest, isComplete: true } : quest
    );

    const quest = quests.find((quest) => quest.id === id);
    if (!quest) return;

    stats.xp += quest.xp * XP_DISTRIBUTION;

    const statKey = `${quest.type.toLowerCase()}_xp` as keyof StatInfo['stats_xp'];
    if (statKey in stats.stats_xp) {
      stats.stats_xp[statKey] += quest.xp * (1 - XP_DISTRIBUTION);
    }
    stats.currency += quest.currency;

    setQuests(updatedQuests);
    localStorage.setItem("quests", JSON.stringify(updatedQuests));
    localStorage.setItem("statInfo", JSON.stringify(stats));
    setStatInfo(stats);
  };

  const reopenQuest = (id: number) => {
    const updatedQuests = quests.map((quest) => 
      quest.id === id ? { ...quest, isComplete: false } : quest
    );
    setQuests(updatedQuests);
    localStorage.setItem("quests", JSON.stringify(updatedQuests));
  };

  return (
    <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center justify-between text-white font-[monospace]"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="mt-5 p-6 border-indigo-500 rounded-[20px] text-white w-full max-w-3xl mx-auto">
        <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Quest Menu</h1>
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
            {skillTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={newQuest.difficulty}
            onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
            className="p-2 bg-gray-700 rounded"
          >
            {difficulties.map((level) => (
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
              {quests.map((quest) => (
                <tr key={quest.id} className="border-b border-gray-700">
                  <td className="p-2">{quest.name}</td>
                  <td className="p-2">{quest.type}</td>
                  <td className="p-2">{quest.difficulty}</td>
                  <td className="p-2">{quest.xp} ⭐</td>  
                  <td className="p-2">{quest.currency} 💎</td>
                  <td className="p-2">
                    <button
                      onClick={() => completeQuest(quest.id)}
                      className={`bg-gray-500 px-3 py-1 rounded mr-2 ${quest.isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={quest.isComplete}
                    >
                      COMPLETE
                    </button>
                    <button
                      onClick={() => reopenQuest(quest.id)}
                      className={`bg-yellow-500 px-3 py-1 rounded mr-2 ${!quest.isComplete ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={!quest.isComplete}
                    >
                      RE-OPEN
                    </button>
                    <button onClick={() => deleteQuest(quest.id)} className="bg-red-500 px-3 py-1 rounded">
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
