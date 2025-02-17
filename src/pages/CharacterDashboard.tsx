// import { Radar } from "react-chartjs-2";
// import "chart.js/auto";
// import { Link, useNavigate } from 'react-router-dom';

// import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import CharacterImage from '../assets/characterimage.png';
// import OtherImage from '../assets/otherimage.png';
// import { useState, useEffect } from "react";
// import { loadStats, StatInfo } from "../lib/statLoader"; // Import the loader

// interface Character {
//   username: string;
//   age: string;
//   height: string;
//   ethnicity: string;
//   occupation: string;
//   relationship: string;
//   physical: string;
//   spiritual: string;
//   mental: string;
//   social: string;
//   emotional: string;
//   createdAt: number;
// }


// export default function CharacterDashboard() {
//   const navigate = useNavigate();
//   const [storedCharacters, setStoredCharacters] = useState<Character[]>([]);
//   const [dailyQuests, setDailyQuests] = useState<{ id: number; name: string; completed: boolean }[]>([]);
//   const [themeColor, _] = useState<string[]>(["#8C94B8", "#396185", "#5D5E60", "#1D282C"]);
//   const [statInfo, setStatInfo] = useState<StatInfo>(loadStats); // Load stats here
//   console.log(setStatInfo);

//   const levelUpCharacter = (level: number, xp: number, maxHealth: number, maxEnergy: number, maxMood: number ) => {
//     let updatedLevel = level;
//     let updatedXP = xp;
//     let updatedMaxHealth = maxHealth;
//     let updatedMaxEnergy = maxEnergy;
//     let updatedMaxMood = maxMood;
  
//     while (updatedXP >= calculateXPForLevel(updatedLevel)) {
//       updatedXP -= calculateXPForLevel(updatedLevel); // Subtract XP required for the current level
//       updatedLevel++; // Level up
//       updatedMaxHealth = 10 * updatedLevel + 90; // Update max health
//       updatedMaxEnergy = 10 * updatedLevel + 90; // Update max health
//       updatedMaxMood = 10 * updatedLevel + 90; // Update max health
//     }
  
//     return { updatedLevel, updatedXP, updatedMaxHealth, updatedMaxEnergy, updatedMaxMood }; // Return updated values
//   };
  
//   useEffect(() => {
//     const { updatedLevel, updatedXP, updatedMaxHealth, updatedMaxEnergy, updatedMaxMood } = levelUpCharacter(statInfo.level, statInfo.xp, statInfo.max_health, statInfo.max_energy, statInfo.max_mood);
  
//     if (updatedLevel !== statInfo.level || updatedXP !== statInfo.xp || updatedMaxHealth !== statInfo.max_health || updatedMaxEnergy !== statInfo.max_energy || updatedMaxMood !== statInfo.max_mood) {
//       setStatInfo((prev) => ({ 
//         ...prev, 
//         level: updatedLevel, 
//         xp: updatedXP, 
//         max_health: updatedMaxHealth, 
//         health: updatedMaxHealth, // Heal the difference
//         max_energy: updatedMaxHealth, 
//         energy: updatedMaxHealth, // Heal the difference
//         max_mood: updatedMaxHealth, 
//         mood: updatedMaxHealth // Heal the difference
//       }));
//     }
//   }, [statInfo.xp]);
  

//   function calculateXPForLevel(level: number): number {
//     const baseXP = 100; // Starting XP for level 1
//     const growthFactor = 1.5; // How much the XP increases for each level
//     return Math.round(baseXP * Math.pow(growthFactor, level - 1));
//   }


//   const levelUpStat = (level: number, xp: number) => {
//     let updatedLevel = level;
//     let updatedXP = xp;
  
//     while (updatedXP >= calculateStatXPForStat(updatedLevel)) {
//       updatedXP -= calculateStatXPForStat(updatedLevel); // Subtract XP required for the current level
//       updatedLevel++; // Level up
//     }
  
//     return { updatedLevel, updatedXP };
//   };
  
//   useEffect(() => {
//     setStatInfo((prev) => {
//       let updatedStats = { ...prev.stats };
//       let updatedStatsXP = { ...prev.stats_xp };
//       let hasChanges = false;
  
//       Object.keys(prev.stats).forEach((statKey) => {
//         const stat = statKey as keyof StatInfo["stats"];
//         const { updatedLevel, updatedXP } = levelUpStat(prev.stats[stat], prev.stats_xp[`${stat}_xp`]);
  
//         if (updatedLevel !== prev.stats[stat] || updatedXP !== prev.stats_xp[`${stat}_xp`]) {
//           updatedStats[stat] = updatedLevel; // Update stat level
//           updatedStatsXP[`${stat}_xp`] = updatedXP; // Update remaining XP
//           hasChanges = true;
//         }
//       });
  
//       if (hasChanges) {
//         const newStatInfo = { ...prev, stats: updatedStats, stats_xp: updatedStatsXP };
//         localStorage.setItem("statInfo", JSON.stringify(newStatInfo)); // ✅ Save to local storage
//         setStatInfo(newStatInfo);
//         return newStatInfo;
//       }
  
//       return prev;
//     });
//   }, [statInfo.stats_xp]);
  



//   function calculateStatXPForStat(statLevel: number): number {
//     const baseStatXP = 100; // Starting Stat XP required for level 1
//     const growthFactor = 1.25; // How much the XP required increases per stat point
//     return Math.round(baseStatXP * Math.pow(growthFactor, statLevel - 1));
//   }

  
  
  


//     const RadarCol = themeColor[0];  // Main background
//     const PrimCol = themeColor[1];      // Primary button
//     const RadarGridCol = themeColor[2];        // Text
//     const SecCol = themeColor[3];      // Borders
//     console.log("RadarCol:",RadarCol );
    
//   // Fetch characters from localStorage on mount
//   useEffect(() => {
//     const characters = JSON.parse(localStorage.getItem("characters") || "[]");

//     if (characters.length === 0) {
//       // Redirect to character creation page if no characters are found
//       navigate("/character-creation");
//     } else {
//       setStoredCharacters(characters);
//     }
//   }, [navigate]);

//   const daysSinceCreation = storedCharacters[0]?.createdAt
//     ? Math.floor((Date.now() - storedCharacters[0].createdAt) / (1000 * 60 * 60 * 24))
//     : 0;


//   const loadImageFromStorage = (key: string, fallback: string) => {
//     return localStorage.getItem(key) || fallback;
//   };

//   const [characterImage, setCharacterImage] = useState(() =>
//     loadImageFromStorage("characterImage", CharacterImage)
//   );
//   const [otherImage, setOtherImage] = useState(() =>
//     loadImageFromStorage("otherImage", OtherImage)
//   );

//   useEffect(() => {
//     localStorage.setItem("characterImage", characterImage);
//   }, [characterImage]);

//   useEffect(() => {
//     localStorage.setItem("otherImage", otherImage);
//   }, [otherImage]);

//   const handleImageChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setImage: React.Dispatch<React.SetStateAction<string>>,
//     storageKey: string
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         if (reader.result) {
//           setImage(reader.result as string);
//           localStorage.setItem(storageKey, reader.result as string);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };


//   const skillLevels = {
//     Physical: statInfo.stats.physical,
//     Spiritual: statInfo.stats.spiritual,
//     Mental: statInfo.stats.mental,
//     Social: statInfo.stats.social,
//     Emotional: statInfo.stats.emotional,
//   };

//   function hexToRgba(hex: string, alpha: number): string {
//     // Remove the '#' from the hex string if it exists
//     hex = hex.replace('#', '');
  
//     // Extract the red, green, and blue components
//     const r = parseInt(hex.substring(0, 2), 16);
//     const g = parseInt(hex.substring(2, 4), 16);
//     const b = parseInt(hex.substring(4, 6), 16);
  
//     // Return the RGBA string
//     return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//   }
  

//   const chartData = {
//     labels: Object.keys(skillLevels),
//     datasets: [
//       {
//         label: "Skill Levels",
//         data: 
//         Object.values(skillLevels),
//         backgroundColor: hexToRgba(RadarCol, 0.3),
//         // "rgba(118, 160, 244, 0.2)"
//         borderColor: RadarCol,
//         borderWidth: 1,
//         pointRadius: 1,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         display: false,
//       },
//     },
//     scales: {
//       r: {
//         pointLabels: {
//           display: true,
//           color: RadarCol,
//         },
//         ticks: {
//           display: false,
//           beginAtZero: true,
//           stepSize: 1, // Adjust this based on your expected skill range
//         },
//         suggestedMin: 0, // Ensures the chart always starts from zero
//         suggestedMax: Math.max(...Object.values(skillLevels)) + 2, // Scale dynamically
//         grid: {
//           color: RadarGridCol,
//           lineWidth: 1,
//         },
//         angleLines: {
//           color: RadarGridCol,
//           lineWidth: 1,
//         },
//       },
//     },
//   };
  



//    // Load daily quests from localStorage
//    useEffect(() => {
//     const savedQuests = localStorage.getItem("dailyQuests");
//     if (savedQuests) {
//       setDailyQuests(JSON.parse(savedQuests));
//     }
//   }, []);

  

//   return (
//     <div>
//       {storedCharacters.map((char, index) => (
//       <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
//         {/* Left Panel */}
//         <div className="mt-10 w-full md:w-1/4 p-4">
//           <Card key={index} className="p-2 bg-[#262626] border-none rounded-[5px]">
//             <h2 className="text-lg text-center font-bold font-[Metropolis] text-[#398FFF]"
//              style={{ color: PrimCol }}
//             >Character: {char.username}</h2>
//           </Card>

//           <div className="mt-3 relative">
//             <img src={characterImage} alt="Character" className="mt-4 rounded-lg w-full" />
//             <input
//               type="file"
//               onChange={(e) => handleImageChange(e, setCharacterImage, "characterImage")}
//               className="hidden"
//               id="character-upload"
//             />
//             <label
//               htmlFor="character-upload"
//               className="block text-center mt-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer font-[monospace] text-[10px]"
//               style={{ backgroundColor: PrimCol }}
//             >
//               Change Character Image
//             </label>
//           </div>

//           <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
//             <div className="text-white ">
//               <p>⭐ XP: {statInfo.xp}/{calculateXPForLevel(statInfo.level)}</p>
//             </div>
//           </Card>

//           <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
//             <p className="text-white">💎 Gems: {statInfo.currency}</p>
//           </Card>

//           <div className="mt-4">
//             <p>Physical: {statInfo.stats.physical}</p>
//             <Progress value={statInfo.stats_xp.physical_xp} max={calculateStatXPForStat(statInfo.stats.physical)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//             <p>Spiritual: {statInfo.stats.spiritual}</p>
//             <Progress value={statInfo.stats_xp.spiritual_xp} max={calculateStatXPForStat(statInfo.stats.spiritual)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//             <p>Mental: {statInfo.stats.mental}</p>
//             <Progress value={statInfo.stats_xp.mental_xp} max={calculateStatXPForStat(statInfo.stats.mental)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//             <p>Social: {statInfo.stats.social}</p>
//             <Progress value={statInfo.stats_xp.social_xp} max={calculateStatXPForStat(statInfo.stats.social)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//             <p>Emotional: {statInfo.stats.emotional}</p>
//             <Progress value={statInfo.stats_xp.emotional_xp} max={calculateStatXPForStat(statInfo.stats.emotional)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//           </div>
//         </div>

//         {/* Centre Panel */}
//         <div className="mt-10 w-full md:w-2/4 p-4 flex flex-col items-center text-center">
//           <h1 className="text-2xl">Level: {statInfo.level} </h1>
//           <p>Title: <span className="italic">None</span></p>
//           <p>Class: <span className="italic">None</span></p>
//           <div className="mt-4 w-full max-w-md">
//             <Radar data={chartData} options={options} />
//           </div>

//           <div className="mt-3 w-full max-w-md">
//             <Card className="bg-white border-none rounded-[5px]">
//               <p className="text-black">❤️ Health:  {statInfo.health}/{statInfo.max_health}</p>
//             </Card>
//             <Progress value={statInfo.health} max={statInfo.max_health} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
//             <Card className="mt-2 bg-white border-none rounded-[5px]">
//               <p>⚡Energy: {statInfo.energy}/{statInfo.max_energy}</p>
//             </Card>
//             <Progress value={statInfo.energy} max={statInfo.max_energy} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
//             <Card className="mt-2 bg-white border-none rounded-[5px]">
//               <p>😊 Mood:{statInfo.mood}/{statInfo.max_mood}</p>
//             </Card>
//             <Progress value={statInfo.mood} max={statInfo.max_mood} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
//           </div>

//           <div className="w-full mt-auto p-1 text-[#767676] text-sm">
//          <div className="flex justify-center space-x-2">

//            <Link to="/character-dashboard">
//            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
//             Status
//            </button>
//            </Link>

//            <Link to="/daily-quests">
//            <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
//              Daily Quests
//            </button>
//            </Link>
          
//           <Link to="/quests">
//            <button  className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
//              Quests
//            </button>
//           </Link>

//           <Link to="/skills">
//           <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
//             Skills
//            </button>
//            </Link>

//            <Link to="/shop">
//            <button className="text-[#767676] p-2 rounded-md  hover:bg-gray-700">
//             Shop
//            </button>
//           </Link>

//            <Link to="/">
//            <button className=" p-2 rounded-md text-red-500">
//             Exit
//          </button>
//            </Link>

//            </div>
//          </div>

//         </div>

//         {/* Right Panel */}
//         <div className="mt-10 w-full md:w-1/4 p-4 text-white">
//           <img src={otherImage} alt="Other" className="mt-4 rounded-lg w-full" />
//           <input
//             type="file"
//             onChange={(e) => handleImageChange(e, setOtherImage, "otherImage")}
//             className="hidden"
//             id="other-upload"
//           />
//           <label
//             htmlFor="other-upload"
//             className="block text-center mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer font-[monospace] text-[10px]"
//             style={{ backgroundColor: PrimCol }}
//           >
//             Change Image
//           </label>

          
//           <Card className="mt-4 p-1 bg-[#1D282C] border rounded-md" style={{ backgroundColor: SecCol, borderColor: SecCol }}>
//             <h2 className="text-base text-[#76A0F4] "
//             style={{color: PrimCol }}
//             >Daily Quests</h2>
//           </Card>
          
//           <div className="mt-1 h-[200px] overflow-y-auto space-y-2 p-2 border rounded-md" style={{borderColor: SecCol }} >
//           <Card className="p-0.5 mb-6 bg-transparent border-transparent">
//             {dailyQuests.length > 0 ? (
//               <ul>
//                 {dailyQuests.map((quest) => (
//                   <li key={quest.id} className="text-[10px] text-white flex justify-between items-center mb-2 p-2" style={{ backgroundColor: SecCol }}>
//                     <span>{quest.name}</span>
//                     <span className={`text-[10px] px-1 py-1 rounded ${quest.completed ? "bg-green-500" : "bg-red-500"}`}>
//                       {quest.completed ? "Completed" : "Incomplete"}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-white">No daily quests available.</p>
//             )}
//           </Card>
//           </div>

//           <Card className="mt-4 p-2 bg-[#191919] border rounded-[0px]" style={{borderColor: SecCol}}>
//             <Link to="/quests" className="text-sm font-bold" style={{color: PrimCol }}>Go to Quest Log</Link>
//           </Card>

//           <Card  key={index} className="text-white mt-4 p-2 border-none rounded-[5px] font-[monospace]" style={{backgroundColor: SecCol }}>
//             <h2 className="text-lg font-bold" style={{color: PrimCol }}>Bio</h2>
//             <p>Age: {char.age}</p> 
//             <p>Height (cm): {char.height}</p>
//             <p>Ethnicity: {char.ethnicity}</p>
//             <p>Occupation: {char.occupation} </p>
//             <p>Days since Ascension: {daysSinceCreation} </p>
//          </Card>

//         </div>
//       </div>
//       ))}
//     </div>
//   );
// }


import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { Link, useNavigate } from 'react-router-dom';

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import CharacterImage from '../assets/characterimage.png';
import OtherImage from '../assets/otherimage.png';
import { useState, useEffect } from "react";
import { loadStats, StatInfo } from "../lib/statLoader"; // Import the loader
import { loadCharacter, } from "../lib/charLoader";



export default function CharacterDashboard() {
  const navigate = useNavigate();
  // const [storedCharacters, setStoredCharacters] = useState<Character[]>([]);
  const [character] = useState(() => loadCharacter());
  const [dailyQuests, setDailyQuests] = useState<{ id: number; name: string; completed: boolean }[]>([]);
  const [themeColor, _] = useState<string[]>(["#8C94B8", "#396185", "#5D5E60", "#1D282C"]);
  const [statInfo, setStatInfo] = useState<StatInfo>(loadStats); // Load stats here
  console.log(setStatInfo);

  const levelUpCharacter = (level: number, xp: number, maxHealth: number, maxEnergy: number, maxMood: number ) => {
    let updatedLevel = level;
    let updatedXP = xp;
    let updatedMaxHealth = maxHealth;
    let updatedMaxEnergy = maxEnergy;
    let updatedMaxMood = maxMood;
  
    while (updatedXP >= calculateXPForLevel(updatedLevel)) {
      updatedXP -= calculateXPForLevel(updatedLevel); // Subtract XP required for the current level
      updatedLevel++; // Level up
      updatedMaxHealth = 10 * updatedLevel + 90; // Update max health
      updatedMaxEnergy = 10 * updatedLevel + 90; // Update max health
      updatedMaxMood = 10 * updatedLevel + 90; // Update max health
    }
  
    return { updatedLevel, updatedXP, updatedMaxHealth, updatedMaxEnergy, updatedMaxMood }; // Return updated values
  };
  
  useEffect(() => {
    const { updatedLevel, updatedXP, updatedMaxHealth, updatedMaxEnergy, updatedMaxMood } = levelUpCharacter(statInfo.level, statInfo.xp, statInfo.max_health, statInfo.max_energy, statInfo.max_mood);
  
    if (updatedLevel !== statInfo.level || updatedXP !== statInfo.xp || updatedMaxHealth !== statInfo.max_health || updatedMaxEnergy !== statInfo.max_energy || updatedMaxMood !== statInfo.max_mood) {
      setStatInfo((prev) => ({ 
        ...prev, 
        level: updatedLevel, 
        xp: updatedXP, 
        max_health: updatedMaxHealth, 
        health: updatedMaxHealth, // Heal the difference
        max_energy: updatedMaxHealth, 
        energy: updatedMaxHealth, // Heal the difference
        max_mood: updatedMaxHealth, 
        mood: updatedMaxHealth // Heal the difference
      }));
    }
  }, [statInfo.xp]);
  

  function calculateXPForLevel(level: number): number {
    const baseXP = 100; // Starting XP for level 1
    const growthFactor = 1.5; // How much the XP increases for each level
    return Math.round(baseXP * Math.pow(growthFactor, level - 1));
  }


  const levelUpStat = (level: number, xp: number) => {
    let updatedLevel = level;
    let updatedXP = xp;
  
    while (updatedXP >= calculateStatXPForStat(updatedLevel)) {
      updatedXP -= calculateStatXPForStat(updatedLevel); // Subtract XP required for the current level
      updatedLevel++; // Level up
    }
  
    return { updatedLevel, updatedXP };
  };
  
  useEffect(() => {
    setStatInfo((prev) => {
      let updatedStats = { ...prev.stats };
      let updatedStatsXP = { ...prev.stats_xp };
      let hasChanges = false;
  
      Object.keys(prev.stats).forEach((statKey) => {
        const stat = statKey as keyof StatInfo["stats"];
        const { updatedLevel, updatedXP } = levelUpStat(prev.stats[stat], prev.stats_xp[`${stat}_xp`]);
  
        if (updatedLevel !== prev.stats[stat] || updatedXP !== prev.stats_xp[`${stat}_xp`]) {
          updatedStats[stat] = updatedLevel; // Update stat level
          updatedStatsXP[`${stat}_xp`] = updatedXP; // Update remaining XP
          hasChanges = true;
        }
      });
  
      if (hasChanges) {
        const newStatInfo = { ...prev, stats: updatedStats, stats_xp: updatedStatsXP };
        localStorage.setItem("statInfo", JSON.stringify(newStatInfo)); // ✅ Save to local storage
        setStatInfo(newStatInfo);
        return newStatInfo;
      }
  
      return prev;
    });
  }, [statInfo.stats_xp]);
  



  function calculateStatXPForStat(statLevel: number): number {
    const baseStatXP = 100; // Starting Stat XP required for level 1
    const growthFactor = 1.25; // How much the XP required increases per stat point
    return Math.round(baseStatXP * Math.pow(growthFactor, statLevel - 1));
  }

  
  
  


    const RadarCol = themeColor[0];  // Main background
    const PrimCol = themeColor[1];      // Primary button
    const RadarGridCol = themeColor[2];        // Text
    const SecCol = themeColor[3];      // Borders
    console.log("RadarCol:",RadarCol );
    
  // Fetch characters from localStorage on mount
  // useEffect(() => {
  //   const characters = JSON.parse(localStorage.getItem("characters") || "[]");

  //   if (characters.length === 0) {
  //     // Redirect to character creation page if no characters are found
  //     navigate("/character-creation");
  //   } else {
  //     setStoredCharacters(characters);
  //   }
  // }, [navigate]);
  // Check if a character exists, else navigate to character creation
  useEffect(() => {
    if (character.username === "z246zx") {
      navigate("/character-creation");
    }
  }, [character, navigate]);

  // const daysSinceCreation = storedCharacters[0]?.createdAt
  //   ? Math.floor((Date.now() - storedCharacters[0].createdAt) / (1000 * 60 * 60 * 24))
  //   : 0;
  const daysSinceCreation = character?.createdAt
  ? Math.floor((Date.now() - character.createdAt) / (1000 * 60 * 60 * 24))
  : 0;

  const loadImageFromStorage = (key: string, fallback: string) => {
    return localStorage.getItem(key) || fallback;
  };

  const [characterImage, setCharacterImage] = useState(() =>
    loadImageFromStorage("characterImage", CharacterImage)
  );
  const [otherImage, setOtherImage] = useState(() =>
    loadImageFromStorage("otherImage", OtherImage)
  );

  useEffect(() => {
    localStorage.setItem("characterImage", characterImage);
  }, [characterImage]);

  useEffect(() => {
    localStorage.setItem("otherImage", otherImage);
  }, [otherImage]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string>>,
    storageKey: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string);
          localStorage.setItem(storageKey, reader.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  const skillLevels = {
    Physical: statInfo.stats.physical,
    Spiritual: statInfo.stats.spiritual,
    Mental: statInfo.stats.mental,
    Social: statInfo.stats.social,
    Emotional: statInfo.stats.emotional,
  };

  function hexToRgba(hex: string, alpha: number): string {
    // Remove the '#' from the hex string if it exists
    hex = hex.replace('#', '');
  
    // Extract the red, green, and blue components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    // Return the RGBA string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  

  const chartData = {
    labels: Object.keys(skillLevels),
    datasets: [
      {
        label: "Skill Levels",
        data: 
        Object.values(skillLevels),
        backgroundColor: hexToRgba(RadarCol, 0.3),
        // "rgba(118, 160, 244, 0.2)"
        borderColor: RadarCol,
        borderWidth: 1,
        pointRadius: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        pointLabels: {
          display: true,
          color: RadarCol,
        },
        ticks: {
          display: false,
          beginAtZero: true,
          stepSize: 1, // Adjust this based on your expected skill range
        },
        suggestedMin: 0, // Ensures the chart always starts from zero
        suggestedMax: Math.max(...Object.values(skillLevels)) + 2, // Scale dynamically
        grid: {
          color: RadarGridCol,
          lineWidth: 1,
        },
        angleLines: {
          color: RadarGridCol,
          lineWidth: 1,
        },
      },
    },
  };
  



   // Load daily quests from localStorage
   useEffect(() => {
    const savedQuests = localStorage.getItem("dailyQuests");
    if (savedQuests) {
      setDailyQuests(JSON.parse(savedQuests));
    }
  }, []);

  

  return (
    <div>
      
      <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
        {/* Left Panel */}
        <div className="mt-10 w-full md:w-1/4 p-4">
          <Card key={0} className="p-2 bg-[#262626] border-none rounded-[5px]">
            <h2 className="text-lg text-center font-bold font-[Metropolis] text-[#398FFF]"
             style={{ color: PrimCol }}
            >Character: {character.username}</h2>
          </Card>

          <div className="mt-3 relative">
            <img src={characterImage} alt="Character" className="mt-4 rounded-lg w-full" />
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setCharacterImage, "characterImage")}
              className="hidden"
              id="character-upload"
            />
            <label
              htmlFor="character-upload"
              className="block text-center mt-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer font-[monospace] text-[10px]"
              style={{ backgroundColor: PrimCol }}
            >
              Change Character Image
            </label>
          </div>

          <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
            <div className="text-white ">
              <p>⭐ XP: {statInfo.xp}/{calculateXPForLevel(statInfo.level)}</p>
            </div>
          </Card>

          <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
            <p className="text-white">💎 Gems: {statInfo.currency}</p>
          </Card>

          <div className="mt-4">
            <p>Physical: {statInfo.stats.physical}</p>
            <Progress value={statInfo.stats_xp.physical_xp} max={calculateStatXPForStat(statInfo.stats.physical)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
            <p>Spiritual: {statInfo.stats.spiritual}</p>
            <Progress value={statInfo.stats_xp.spiritual_xp} max={calculateStatXPForStat(statInfo.stats.spiritual)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
            <p>Mental: {statInfo.stats.mental}</p>
            <Progress value={statInfo.stats_xp.mental_xp} max={calculateStatXPForStat(statInfo.stats.mental)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
            <p>Social: {statInfo.stats.social}</p>
            <Progress value={statInfo.stats_xp.social_xp} max={calculateStatXPForStat(statInfo.stats.social)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
            <p>Emotional: {statInfo.stats.emotional}</p>
            <Progress value={statInfo.stats_xp.emotional_xp} max={calculateStatXPForStat(statInfo.stats.emotional)} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
          </div>
        </div>

        {/* Centre Panel */}
        <div className="mt-10 w-full md:w-2/4 p-4 flex flex-col items-center text-center">
          <h1 className="text-2xl">Level: {statInfo.level} </h1>
          <p>Title: <span className="italic">None</span></p>
          <p>Class: <span className="italic">None</span></p>
          <div className="mt-4 w-full max-w-md">
            <Radar data={chartData} options={options} />
          </div>

          <div className="mt-3 w-full max-w-md">
            <Card className="bg-white border-none rounded-[5px]">
              <p className="text-black">❤️ Health:  {statInfo.health}/{statInfo.max_health}</p>
            </Card>
            <Progress value={statInfo.health} max={statInfo.max_health} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
            <Card className="mt-2 bg-white border-none rounded-[5px]">
              <p>⚡Energy: {statInfo.energy}/{statInfo.max_energy}</p>
            </Card>
            <Progress value={statInfo.energy} max={statInfo.max_energy} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
            <Card className="mt-2 bg-white border-none rounded-[5px]">
              <p>😊 Mood:{statInfo.mood}/{statInfo.max_mood}</p>
            </Card>
            <Progress value={statInfo.mood} max={statInfo.max_mood} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
          </div>

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
           <button  className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
             Quests
           </button>
          </Link>

          <Link to="/skills">
          <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
            Skills
           </button>
           </Link>

           <Link to="/shop">
           <button className="text-[#767676] p-2 rounded-md  hover:bg-gray-700">
            Shop
           </button>
          </Link>

           <Link to="/">
           <button className=" p-2 rounded-md text-red-500">
            Exit
         </button>
           </Link>

           </div>
         </div>

        </div>

        {/* Right Panel */}
        <div className="mt-10 w-full md:w-1/4 p-4 text-white">
          <img src={otherImage} alt="Other" className="mt-4 rounded-lg w-full" />
          <input
            type="file"
            onChange={(e) => handleImageChange(e, setOtherImage, "otherImage")}
            className="hidden"
            id="other-upload"
          />
          <label
            htmlFor="other-upload"
            className="block text-center mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer font-[monospace] text-[10px]"
            style={{ backgroundColor: PrimCol }}
          >
            Change Image
          </label>

          
          <Card className="mt-4 p-1 bg-[#1D282C] border rounded-md" style={{ backgroundColor: SecCol, borderColor: SecCol }}>
            <h2 className="text-base text-[#76A0F4] "
            style={{color: PrimCol }}
            >Daily Quests</h2>
          </Card>
          
          <div className="mt-1 h-[200px] overflow-y-auto space-y-2 p-2 border rounded-md" style={{borderColor: SecCol }} >
          <Card className="p-0.5 mb-6 bg-transparent border-transparent">
            {dailyQuests.length > 0 ? (
              <ul>
                {dailyQuests.map((quest) => (
                  <li key={quest.id} className="text-[10px] text-white flex justify-between items-center mb-2 p-2" style={{ backgroundColor: SecCol }}>
                    <span>{quest.name}</span>
                    <span className={`text-[10px] px-1 py-1 rounded ${quest.completed ? "bg-green-500" : "bg-red-500"}`}>
                      {quest.completed ? "Completed" : "Incomplete"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No daily quests available.</p>
            )}
          </Card>
          </div>

          <Card className="mt-4 p-2 bg-[#191919] border rounded-[0px]" style={{borderColor: SecCol}}>
            <Link to="/quests" className="text-sm font-bold" style={{color: PrimCol }}>Go to Quest Log</Link>
          </Card>

          <Card  key={0} className="text-white mt-4 p-2 border-none rounded-[5px] font-[monospace]" style={{backgroundColor: SecCol }}>
            <h2 className="text-lg font-bold" style={{color: PrimCol }}>Bio</h2>
            <p>Age: {character.age}</p> 
            <p>Height (cm): {character.height}</p>
            <p>Ethnicity: {character.ethnicity}</p>
            <p>Occupation: {character.occupation} </p>
            <p>Days since Ascension: {daysSinceCreation} </p>
         </Card>

        </div>
      </div>
      
    </div>
  );
}
