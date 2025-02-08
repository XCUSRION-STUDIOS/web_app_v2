
// import { Radar } from "react-chartjs-2";
// import "chart.js/auto";
// import { Link, useNavigate } from 'react-router-dom';

// import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import CharacterImage from '../assets/characterimage.png';
// import OtherImage from '../assets/otherimage.png';
// import { useState, useEffect } from "react";

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

//   const [themeColor, setThemeColor] = useState<string[]>(["#398FFF"]);

//   useEffect(() => {
//     const savedColor = localStorage.getItem("selectedColors");
//     if (savedColor) {
//       const parsedColors = JSON.parse(savedColor); // Parse the string to an array
//       setThemeColor(parsedColors);
//     }
//   }, []);

    
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
//     Physical: 10,
//     Spiritual: 12,
//     Mental: 15,
//     Social: 10,
//     Emotional: 9,
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
//         data: Object.values(skillLevels),
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
//         display: false, // Hide the legend (key)
//       },
//     },
//     scales: {
//       r: {
//         pointLabels: {
//           display: true, // Hide category labels (Thing 1, Thing 2, etc.)
//           color: RadarCol
//         },
//         ticks: {
//           display: false, // Hide numbers on the chart
//         },
//         grid: {
//           color: RadarGridCol,
//           lineWidth: 1,
//         },
//         angleLines: {
//           color: RadarGridCol, // Change the colour of the axis lines
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

//           <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
//             <p className="italic text-white text-center">"Only a fool trips on what is behind him"</p>
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
//               <p>⭐ XP: 100/20000</p>
//             </div>
//           </Card>

//           <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
//             <p className="text-white">💎 Gems: 3000</p>
//           </Card>

//           <div className="mt-4">
//             <p>Physical: Lv. 10</p>
//             <Progress value={50} max={20} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//             <p>Spiritual: Lv. 12</p>
//             <Progress value={50} max={20} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//             <p>Mental: Lv. 15</p>
//             <Progress value={50} max={20} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//             <p>Social: Lv. 8</p>
//             <Progress value={50} max={20} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//             <p>Emotional: Lv. 9</p>
//             <Progress value={50} max={20} PrimCol={PrimCol} SecCol={SecCol} className="h-[5px]" />
//           </div>
//         </div>

//         {/* Centre Panel */}
//         <div className="mt-10 w-full md:w-2/4 p-4 flex flex-col items-center text-center">
//           <h1 className="text-2xl">Level: 1</h1>
//           <p>Title: <span className="italic">None</span></p>
//           <p>Class: <span className="italic">None</span></p>
//           <div className="mt-4 w-full max-w-md">
//             <Radar data={chartData} options={options} />
//           </div>

//           <div className="mt-3 w-full max-w-md">
//             <Card className="bg-white border-none rounded-[5px]">
//               <p className="text-black">❤️ Health: 10/20</p>
//             </Card>
//             <Progress value={50} max={20} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
//             <Card className="mt-2 bg-white border-none rounded-[5px]">
//               <p>⚡Energy: 10/20</p>
//             </Card>
//             <Progress value={50} max={20} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
//             <Card className="mt-2 bg-white border-none rounded-[5px]">
//               <p>😊 Mood: 10/20</p>
//             </Card>
//             <Progress value={50} max={20} PrimCol={PrimCol} SecCol={SecCol} className="mt-2 h-[10px]" />
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

//            <Link to="/history">
//            <button className="text-[#767676] p-2 rounded-md  hover:bg-gray-700">
//              History
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
//               <p>No daily quests available.</p>
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

interface Character {
  username: string;
  age: string;
  height: string;
  ethnicity: string;
  occupation: string;
  relationship: string;
  physical: string;
  spiritual: string;
  mental: string;
  social: string;
  emotional: string;
  createdAt: number;
}


export default function CharacterDashboard() {
  const navigate = useNavigate();
  const [storedCharacters, setStoredCharacters] = useState<Character[]>([]);
  const [dailyQuests, setDailyQuests] = useState<{ id: number; name: string; completed: boolean }[]>([]);
  const [themeColor, setThemeColor] = useState<string[]>(["#8C94B8", "#396185", "#5D5E60", "#1D282C"]);
  const [statInfo, setStatInfo] = useState<StatInfo>(loadStats); // Load stats here
  console.log(setStatInfo);


function calculateXPForLevel(level: number): number {
  const baseXP = 100; // Starting XP for level 1
  const growthFactor = 1.5; // How much the XP increases for each level
  return Math.round(baseXP * Math.pow(growthFactor, level - 1));
}

function calculateStatXPForStat(statLevel: number): number {
  const baseStatXP = 10; // Starting Stat XP required for level 1
  const growthFactor = 1.25; // How much the XP required increases per stat point
  return Math.round(baseStatXP * Math.pow(growthFactor, statLevel - 1));
}

  useEffect(() => {
    const savedColor = localStorage.getItem("selectedColors");
    if (savedColor) {
      const parsedColors = JSON.parse(savedColor); // Parse the string to an array
      setThemeColor(parsedColors);
    }
  }, []);

    
    const RadarCol = themeColor[0];  // Main background
    const PrimCol = themeColor[1];      // Primary button
    const RadarGridCol = themeColor[2];        // Text
    const SecCol = themeColor[3];      // Borders
    console.log("RadarCol:",RadarCol );
    
  // Fetch characters from localStorage on mount
  useEffect(() => {
    const characters = JSON.parse(localStorage.getItem("characters") || "[]");

    if (characters.length === 0) {
      // Redirect to character creation page if no characters are found
      navigate("/character-creation");
    } else {
      setStoredCharacters(characters);
    }
  }, [navigate]);

  const daysSinceCreation = storedCharacters[0]?.createdAt
    ? Math.floor((Date.now() - storedCharacters[0].createdAt) / (1000 * 60 * 60 * 24))
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
        data: Object.values(skillLevels),
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
        display: false, // Hide the legend (key)
      },
    },
    scales: {
      r: {
        pointLabels: {
          display: true, // Hide category labels (Thing 1, Thing 2, etc.)
          color: RadarCol
        },
        ticks: {
          display: false, // Hide numbers on the chart
        },
        grid: {
          color: RadarGridCol,
          lineWidth: 1,
        },
        angleLines: {
          color: RadarGridCol, // Change the colour of the axis lines
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
      {storedCharacters.map((char, index) => (
      <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
        {/* Left Panel */}
        <div className="mt-10 w-full md:w-1/4 p-4">
          <Card key={index} className="p-2 bg-[#262626] border-none rounded-[5px]">
            <h2 className="text-lg text-center font-bold font-[Metropolis] text-[#398FFF]"
             style={{ color: PrimCol }}
            >Character: {char.username}</h2>
          </Card>

          <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
            <p className="italic text-white text-center">"Only a fool trips on what is behind him"</p>
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

           <Link to="/history">
           <button className="text-[#767676] p-2 rounded-md  hover:bg-gray-700">
             History
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

          <Card  key={index} className="text-white mt-4 p-2 border-none rounded-[5px] font-[monospace]" style={{backgroundColor: SecCol }}>
            <h2 className="text-lg font-bold" style={{color: PrimCol }}>Bio</h2>
            <p>Age: {char.age}</p> 
            <p>Height (cm): {char.height}</p>
            <p>Ethnicity: {char.ethnicity}</p>
            <p>Occupation: {char.occupation} </p>
            <p>Days since Ascension: {daysSinceCreation} </p>
         </Card>

        </div>
      </div>
      ))}
    </div>
  );
}
