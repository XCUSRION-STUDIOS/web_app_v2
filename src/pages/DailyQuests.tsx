// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import backgroundImage from '../assets/darkimg2.png';

// export default function DailyQuests() {
//   const [dailyQuests, setDailyQuests] = useState<{ id: number; name: string; type: string; xp: number; difficulty: string; completed: boolean }[]>([]);
//   const [newQuest, setNewQuest] = useState<{ name: string; type: string; difficulty: string }>({
//     name: "",
//     type: "Physical",
//     difficulty: "Easy",
//   });

//   // Daily quests XP rewards
//   const difficultyXP: Record<string, number> = {
//     "Very Easy": 50,
//     "Easy": 100,
//     "Medium": 150,
//     "Hard": 200,
//     "Very Hard": 300,
//   };

//   // Function to load daily quests and check reset date
//   const loadDailyQuests = () => {
//     const lastResetDate = localStorage.getItem("lastResetDate");
//     const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

//     // If the last reset date is different from today, reset the daily quests
//     if (lastResetDate !== todayDate) {
//       const newDailyQuests = [
//         { id: Date.now(), name: "Daily Quest 1", type: "Physical", xp: difficultyXP["Easy"], difficulty: "Easy", completed: false },
//         { id: Date.now() + 1, name: "Daily Quest 2", type: "Mental", xp: difficultyXP["Medium"], difficulty: "Medium", completed: false },
//       ];
//       setDailyQuests(newDailyQuests);

//       // Update the last reset date in localStorage
//       localStorage.setItem("lastResetDate", todayDate);
//       localStorage.setItem("dailyQuests", JSON.stringify(newDailyQuests));
//     } else {
//       const savedQuests = localStorage.getItem("dailyQuests");
//       if (savedQuests) {
//         setDailyQuests(JSON.parse(savedQuests));
//       }
//     }
//   };

//   // Mark quest as completed
//   const completeQuest = (id: number) => {
//     const updatedQuests = dailyQuests.map((quest) =>
//       quest.id === id ? { ...quest, completed: true } : quest
//     );
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
//   };

//   // Reset the daily quests when adding or deleting a quest
//   const addQuest = () => {
//     if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

//     const xpReward = difficultyXP[newQuest.difficulty];

//     const newQuestData = { id: Date.now(), ...newQuest, xp: xpReward, completed: false };

//     const updatedQuests = [...dailyQuests, newQuestData];
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));

//     setNewQuest({ name: "", type: "Physical", difficulty: "Easy" });
//   };

//   const deleteQuest = (id: number) => {
//     const updatedQuests = dailyQuests.filter((quest) => quest.id !== id);
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
//   };

//   useEffect(() => {
//     loadDailyQuests();
//   }, []);

//   return (
//     <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center justify-between text-white font-[monospace]"
//       style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <div className="mt-5 p-6 border-indigo-500 rounded-[20px] text-white w-full max-w-3xl mx-auto">
//         <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Daily Quests</h1>
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
//             {["Physical", "Mental", "Social", "Spiritual", "Emotional"].map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//           <select
//             value={newQuest.difficulty}
//             onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           >
//             {["Very Easy", "Easy", "Medium", "Hard", "Very Hard"].map((level) => (
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
//               {dailyQuests.map((quest) => (
//                 <tr key={quest.id} className="border-b border-gray-700">
//                   <td className="p-2">{quest.name}</td>
//                   <td className="p-2">{quest.type}</td>
//                   <td className="p-2">{quest.difficulty}</td>
//                   <td className="p-2">{quest.xp}</td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => completeQuest(quest.id)}
//                       disabled={quest.completed}
//                       className={`bg-green-500 px-3 py-1 rounded mr-2 ${quest.completed ? "bg-gray-500 cursor-not-allowed" : ""}`}
//                     >
//                       {quest.completed ? "Completed" : "START"}
//                     </button>
//                     <button
//                       className="bg-gray-500 px-3 py-1 rounded mr-2"
//                       disabled={quest.completed}
//                     >
//                       {quest.completed ? "Completed" : "COMPLETE"}
//                     </button>
//                     <button
//                       onClick={() => deleteQuest(quest.id)}
//                       className="bg-red-500 px-3 py-1 rounded"
//                     >
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

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import backgroundImage from '../assets/darkimg2.png';

// export default function DailyQuests() {
//   const [dailyQuests, setDailyQuests] = useState<{ id: number; name: string; type: string; xp: number; difficulty: string; completed: boolean }[]>([]);
//   const [newQuest, setNewQuest] = useState<{ name: string; type: string; difficulty: string }>({
//     name: "",
//     type: "Physical",
//     difficulty: "Easy",
//   });

//   // Daily quests XP rewards
//   const difficultyXP: Record<string, number> = {
//     "Very Easy": 50,
//     "Easy": 100,
//     "Medium": 150,
//     "Hard": 200,
//     "Very Hard": 300,
//   };

//   // Function to load daily quests and check reset date
//   const loadDailyQuests = () => {
//     const lastResetDate = localStorage.getItem("lastResetDate");
//     const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

//     // If the last reset date is different from today, reset the daily quests
//     if (lastResetDate !== todayDate) {
//       const newDailyQuests = [
//         { id: Date.now(), name: "Daily Quest 1", type: "Physical", xp: difficultyXP["Easy"], difficulty: "Easy", completed: false },
//         { id: Date.now() + 1, name: "Daily Quest 2", type: "Mental", xp: difficultyXP["Medium"], difficulty: "Medium", completed: false },
//       ];
//       setDailyQuests(newDailyQuests);

//       // Update the last reset date in localStorage
//       localStorage.setItem("lastResetDate", todayDate);
//       localStorage.setItem("dailyQuests", JSON.stringify(newDailyQuests));
//     } else {
//       const savedQuests = localStorage.getItem("dailyQuests");
//       if (savedQuests) {
//         setDailyQuests(JSON.parse(savedQuests));
//       }
//     }
//   };

//   // Mark quest as completed
//   const completeQuest = (id: number) => {
//     const updatedQuests = dailyQuests.map((quest) =>
//       quest.id === id ? { ...quest, completed: true } : quest
//     );
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
//   };

//   // Reset the daily quests when adding or deleting a quest
//   const addQuest = () => {
//     if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

//     const xpReward = difficultyXP[newQuest.difficulty];

//     const newQuestData = { id: Date.now(), ...newQuest, xp: xpReward, completed: false };

//     const updatedQuests = [...dailyQuests, newQuestData];
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));

//     setNewQuest({ name: "", type: "Physical", difficulty: "Easy" });
//   };

//   const deleteQuest = (id: number) => {
//     const updatedQuests = dailyQuests.filter((quest) => quest.id !== id);
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
//   };

//   useEffect(() => {
//     loadDailyQuests();
//   }, []);

//   return (
//     <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center justify-between text-white font-[monospace]"
//       style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <div className="mt-5 p-6 border-indigo-500 rounded-[20px] text-white w-full max-w-3xl mx-auto">
//         <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Daily Quests</h1>
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
//             {["Physical", "Mental", "Social", "Spiritual", "Emotional"].map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//           <select
//             value={newQuest.difficulty}
//             onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           >
//             {["Very Easy", "Easy", "Medium", "Hard", "Very Hard"].map((level) => (
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
//               {dailyQuests.map((quest) => (
//                 <tr key={quest.id} className="border-b border-gray-700">
//                   <td className="p-2">{quest.name}</td>
//                   <td className="p-2">{quest.type}</td>
//                   <td className="p-2">{quest.difficulty}</td>
//                   <td className="p-2">{quest.xp}</td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => completeQuest(quest.id)}
//                       disabled={quest.completed}
//                       className={`bg-green-500 px-3 py-1 rounded mr-2 ${quest.completed ? "bg-gray-500 cursor-not-allowed" : ""}`}
//                     >
//                       {quest.completed ? "Completed" : "Complete"}
//                     </button>
//                     <button
//                       onClick={() => deleteQuest(quest.id)}
//                       className="bg-red-500 px-3 py-1 rounded"
//                     >
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


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import backgroundImage from '../assets/darkimg2.png';

// export default function DailyQuests() {
//   const [dailyQuests, setDailyQuests] = useState<{ id: number; name: string; type: string; xp: number; difficulty: string; completed: boolean }[]>([]);
//   const [newQuest, setNewQuest] = useState<{ name: string; type: string; difficulty: string }>({
//     name: "",
//     type: "Physical",
//     difficulty: "Easy",
//   });
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   // Daily quests XP rewards
//   const difficultyXP: Record<string, number> = {
//     "Very Easy": 50,
//     "Easy": 100,
//     "Medium": 150,
//     "Hard": 200,
//     "Very Hard": 300,
//   };

//   // Function to load daily quests and check reset date
//   const loadDailyQuests = () => {
//     const lastResetDate = localStorage.getItem("lastResetDate");
//     const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

//     // If the last reset date is different from today, reset the daily quests
//     if (lastResetDate !== todayDate) {
//       const newDailyQuests = [
//         { id: Date.now(), name: "Daily Quest 1", type: "Physical", xp: difficultyXP["Easy"], difficulty: "Easy", completed: false },
//         { id: Date.now() + 1, name: "Daily Quest 2", type: "Mental", xp: difficultyXP["Medium"], difficulty: "Medium", completed: false },
//       ];
//       setDailyQuests(newDailyQuests);

//       // Update the last reset date in localStorage
//       localStorage.setItem("lastResetDate", todayDate);
//       localStorage.setItem("dailyQuests", JSON.stringify(newDailyQuests));
//     } else {
//       const savedQuests = localStorage.getItem("dailyQuests");
//       if (savedQuests) {
//         setDailyQuests(JSON.parse(savedQuests));
//       }
//     }
//   };

//   // Mark quest as completed
//   const completeQuest = (id: number) => {
//     const updatedQuests = dailyQuests.map((quest) => {
//       if (quest.id === id && !quest.completed) {
//         // Mark as completed if not already completed
//         return { ...quest, completed: true };
//       }
//       return quest;
//     });
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));

//     // If the quest was already completed, show the error message
//     const quest = dailyQuests.find((quest) => quest.id === id);
//     if (quest && quest.completed) {
//       setErrorMessage("You cannot complete this quest again until tomorrow.");
//     } else {
//       setErrorMessage(null); // Clear error if quest was successfully completed
//     }
//   };

//   // Reset the daily quests when adding or deleting a quest
//   const addQuest = () => {
//     if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

//     const xpReward = difficultyXP[newQuest.difficulty];

//     const newQuestData = { id: Date.now(), ...newQuest, xp: xpReward, completed: false };

//     const updatedQuests = [...dailyQuests, newQuestData];
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));

//     setNewQuest({ name: "", type: "Physical", difficulty: "Easy" });
//   };

//   const deleteQuest = (id: number) => {
//     const updatedQuests = dailyQuests.filter((quest) => quest.id !== id);
//     setDailyQuests(updatedQuests);
//     localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
//   };

//   useEffect(() => {
//     loadDailyQuests();
//   }, []);

//   return (
//     <div className="h-screen w-screen bg-cover bg-[#191919] bg-center flex flex-col items-center justify-between text-white font-[monospace]"
//       style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <div className="mt-5 p-6 border-indigo-500 rounded-[20px] text-white w-full max-w-3xl mx-auto">
//         <h1 className="mt-4 text-3xl font-[Metropolis] text-center">Daily Quests</h1>
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
//             {["Physical", "Mental", "Social", "Spiritual", "Emotional"].map((type) => (
//               <option key={type} value={type}>{type}</option>
//             ))}
//           </select>
//           <select
//             value={newQuest.difficulty}
//             onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
//             className="p-2 bg-gray-700 rounded"
//           >
//             {["Very Easy", "Easy", "Medium", "Hard", "Very Hard"].map((level) => (
//               <option key={level} value={level}>{level}</option>
//             ))}
//           </select>
//           <button onClick={addQuest} className="bg-blue-500 px-4 py-2 rounded">
//             Add Quest
//           </button>
//         </div>

//         {errorMessage && (
//           <div className="mt-4 text-red-500 text-center">
//             <p>{errorMessage}</p>
//           </div>
//         )}

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
//               {dailyQuests.map((quest) => (
//                 <tr key={quest.id} className="border-b border-gray-700">
//                   <td className="p-2">{quest.name}</td>
//                   <td className="p-2">{quest.type}</td>
//                   <td className="p-2">{quest.difficulty}</td>
//                   <td className="p-2">{quest.xp}</td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => completeQuest(quest.id)}
//                       disabled={quest.completed}
//                       className={`bg-green-500 px-3 py-1 rounded mr-2 ${quest.completed ? "bg-gray-500 cursor-not-allowed" : ""}`}
//                     >
//                       {quest.completed ? "Completed" : "Complete"}
//                     </button>
//                     <button
//                       onClick={() => deleteQuest(quest.id)}
//                       className="bg-red-500 px-3 py-1 rounded"
//                     >
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from '../assets/darkimg2.png';

export default function DailyQuests() {
  const [dailyQuests, setDailyQuests] = useState<{ id: number; name: string; type: string; xp: number; difficulty: string; completed: boolean }[]>([]);
  const [newQuest, setNewQuest] = useState<{ name: string; type: string; difficulty: string }>({
    name: "",
    type: "Physical",
    difficulty: "Easy",
  });
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [questToComplete, setQuestToComplete] = useState<number | null>(null); // ID of the quest to be completed

  // Daily quests XP rewards
  const difficultyXP: Record<string, number> = {
    "Very Easy": 50,
    "Easy": 100,
    "Medium": 150,
    "Hard": 200,
    "Very Hard": 300,
  };

  // Function to load daily quests and check reset date
  const loadDailyQuests = () => {
    const lastResetDate = localStorage.getItem("lastResetDate");
    const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // If the last reset date is different from today, reset the daily quests
    if (lastResetDate !== todayDate) {
      const newDailyQuests = [
        { id: Date.now(), name: "Daily Quest 1", type: "Physical", xp: difficultyXP["Easy"], difficulty: "Easy", completed: false },
        { id: Date.now() + 1, name: "Daily Quest 2", type: "Mental", xp: difficultyXP["Medium"], difficulty: "Medium", completed: false },
      ];
      setDailyQuests(newDailyQuests);

      // Update the last reset date in localStorage
      localStorage.setItem("lastResetDate", todayDate);
      localStorage.setItem("dailyQuests", JSON.stringify(newDailyQuests));
    } else {
      const savedQuests = localStorage.getItem("dailyQuests");
      if (savedQuests) {
        setDailyQuests(JSON.parse(savedQuests));
      }
    }
  };

  // Mark quest as completed
  const completeQuest = (id: number) => {
    const quest = dailyQuests.find((quest) => quest.id === id);

    if (quest?.completed) {
      setShowWarning(true); // Show warning if quest is already completed
      setQuestToComplete(id); // Set the quest ID
    } else {
      const updatedQuests = dailyQuests.map((quest) =>
        quest.id === id ? { ...quest, completed: true } : quest
      );
      setDailyQuests(updatedQuests);
      localStorage.setItem("dailyQuests", JSON.stringify(updatedQuests));
    }
  };

  // Reset the daily quests when adding or deleting a quest
  const addQuest = () => {
    if (!newQuest.name || !newQuest.type || !newQuest.difficulty) return;

    const xpReward = difficultyXP[newQuest.difficulty];

    const newQuestData = { id: Date.now(), ...newQuest, xp: xpReward, completed: false };

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

  // Close warning message
  const closeWarning = () => {
    setShowWarning(false);
    setQuestToComplete(null);
  };

  useEffect(() => {
    loadDailyQuests();
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
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dailyQuests.map((quest) => (
                <tr key={quest.id} className="border-b border-gray-700">
                  <td className="p-2">{quest.name}</td>
                  <td className="p-2">{quest.type}</td>
                  <td className="p-2">{quest.difficulty}</td>
                  <td className="p-2">{quest.xp}</td>
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

        {/* Warning Message */}
        {showWarning && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 p-4 bg-red-600 text-white rounded-md shadow-md">
            <p>You cannot complete a quest that has already been completed!</p>
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
            <button className="p-2 rounded-md hover:bg-gray-700">Daily Quests</button>
          </Link>
          <Link to="/quests">
            <button className="p-2 rounded-md hover:bg-gray-700">Quests</button>
          </Link>
          <Link to="/skills">
            <button className="p-2 rounded-md hover:bg-gray-700">Skills</button>
          </Link>
          <Link to="/history">
            <button className="p-2 rounded-md hover:bg-gray-700">History</button>
          </Link>
          <Link to="/">
            <button className="p-2 rounded-md text-red-500">Exit</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
