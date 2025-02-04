// import { Radar } from "react-chartjs-2";
// import "chart.js/auto";
// import { Link } from 'react-router-dom';

// import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Checkbox } from "@/components/ui/checkbox";
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
//     const [storedCharacters, setStoredCharacters] = useState<Character[]>([]);
  
//     // Fetch characters from localStorage on mount
//     useEffect(() => {
//       const characters = JSON.parse(localStorage.getItem("characters") || "[]");
//       setStoredCharacters(characters);
//     }, []);

//   const daysSinceCreation = storedCharacters[0].createdAt
//   ? Math.floor((Date.now() - storedCharacters[0].createdAt) / (1000 * 60 * 60 * 24))
//   : 0;

//   const [quests, setQuests] = useState([
//     { label: "Defeat the Beast", completed: false },
//     { label: "Collect Resources", completed: false },
//     { label: "Training Session", completed: false },
//     { label: "Protect the Village", completed: false },
//   ]);

  

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

//   const chartData = {
//     labels: Object.keys(skillLevels),
//     datasets: [
//       {
//         label: "Skill Levels",
//         data: Object.values(skillLevels),
//         backgroundColor: "rgba(118, 160, 244, 0.2)",
//         borderColor: "#76A0F4",
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
//           color: '#616D87'
//         },
//         ticks: {
//           display: false, // Hide numbers on the chart
//         },
//         grid: {
//           color: '#616D87',
//           lineWidth: 1,
//         },
//         angleLines: {
//           color: '#616D87', // Change the colour of the axis lines
//           lineWidth: 1,
//         },
//       },
//     },
//   };

//   const handleQuestChange = (index: number) => {
//     const newQuests = [...quests];
//     newQuests[index].completed = !newQuests[index].completed;
//     setQuests(newQuests);
//   };

//   // const handleCharacterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files) {
//   //     const file = e.target.files[0];
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       if (reader.result) {
//   //         setCharacterImage(reader.result as string);
//   //       }
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   // const handleOtherImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files) {
//   //     const file = e.target.files[0];
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       if (reader.result) {
//   //         setOtherImage(reader.result as string);
//   //       }
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };


//   return (
//     <div>
//     {/* {storedCharacters.map((char, index) => ( */}
    
//     <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
//       {/* Left Panel */}
      
//       <div className="mt-10 w-full md:w-1/4 p-4">
        
//         <Card className="p-2 bg-[#262626] border-none rounded-[5px]">
//           <h2 className="text-lg text-center font-bold font-[Metropolis] text-[#398FFF]">Character: </h2>
//         </Card>
        
        
//         <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
//           <p className="italic text-white text-center">"Only a fool trips on what is behind him"</p>
//         </Card>  

      
//         <div className="mt-3 relative">
//           <img src={characterImage} alt="Character" className="mt-4 rounded-lg w-full" />
//           <input
//             type="file"
//             onChange={(e) => handleImageChange(e, setCharacterImage, "characterImage")}
//             className="hidden"
//             id="character-upload"
//           />
//           <label
//             htmlFor="character-upload"
//             className="block text-center mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer font-[monospace] text-[10px]"
//           >
//             Change Character Image
//           </label>
//         </div>

//         <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
//           <div className="text-white ">
//             <p>⭐ XP: 100/20000</p>
//           </div>
//         </Card>

//         <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
//           <p className="text-white">💎 Gems: 3000</p>
//         </Card>

//         <div className="mt-4">
//           <p>Physical: Lv. 10</p>
//           <Progress value={50} max={20} className="h-[5px]" />
//           <p>Spiritual: Lv. 12</p>
//           <Progress value={50} max={20} className="h-[5px]"/>
//           <p>Mental: Lv. 15</p>
//           <Progress value={50} max={20} className="h-[5px]"/>
//           <p>Social: Lv. 8</p>
//           <Progress value={50} max={20} className="h-[5px]"/>
//           <p>Emotional: Lv. 9</p>
//           <Progress value={50} max={20} className="h-[5px]"/>
//         </div>
//       </div>
      

//       {/* Centre Panel */}
//       <div className="mt-10 w-full md:w-2/4 p-4 flex flex-col items-center text-center">
//         <h1 className="text-2xl">Level: 1</h1>
//         <p>Title: <span className="italic">None</span></p>
//         <p>Class: <span className="italic">None</span></p>
//         <div className="mt-4 w-full max-w-md">
//           <Radar data={chartData} options={options} />
//         </div>

//         <div className="mt-3 w-full max-w-md">
//           <Card className="bg-white border-none rounded-[5px]">
//             <p className="text-black">❤️ Health: 10/20</p>
//           </Card>
//           <Progress value={50} max={20} className="mt-2 h-[10px]" />
//           <Card className="mt-2 bg-white border-none rounded-[5px]">
//             <p>⚡Energy: 10/20</p>
//           </Card>
//           <Progress value={50} max={20} className="mt-2 h-[10px]" />
//           <Card className="mt-2 bg-white border-none rounded-[5px]">
//             <p>😊 Mood: 10/20</p>
//           </Card>
//           <Progress value={50} max={20} className="mt-2 h-[10px]"/>
//         </div>

//         <div className="w-full mt-auto p-1 text-[#767676] text-sm">
//         <div className="flex justify-center space-x-2">

//           <Link to="/character-dashboard">
//           <button className="text-[#767676] p-2 rounded-md hover:bg-gray-700">
//             Status
//           </button>
//           </Link>

//           <Link to="/daily-quests">
//           <button className="p-2 rounded-md hover:bg-gray-700">
//             Daily Quests
//           </button>
//           </Link>
          
//           <Link to="/quests">
//           <button  className="p-2 rounded-md hover:bg-gray-700">
//             Quests
//           </button>
//           </Link>

//           <Link to="/skills">
//           <button className="p-2 rounded-md hover:bg-gray-700">
//             Skills
//           </button>
//           </Link>

//           <Link to="/history">
//           <button className="p-2 rounded-md  hover:bg-gray-700">
//             History
//           </button>
//           </Link>

//           <Link to="/">
//           <button className="p-2 rounded-md text-red-500">
//             Exit
//           </button>
//           </Link>

//           </div>
//         </div>

//       </div>

//       {/* Right Panel */}
//       <div className="mt-10 w-full md:w-1/4 p-4 text-white">
       
//         <img src={otherImage} alt="Other" className="mt-4 rounded-lg w-full" />
//         <input
//           type="file"
//           onChange={(e) => handleImageChange(e, setOtherImage, "otherImage")}
//           className="hidden"
//           id="other-upload"
//         />
//         <label
//           htmlFor="other-upload"
//           className="block text-center mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer  font-[monospace] text-[10px]"
//         >
//           Change Image
//         </label>

//         <Card className="mt-4 p-1 bg-[#1D282C] border-none rounded-[0px]">
//           <h2 className="text-base text-[#76A0F4] ">Daily Quests</h2>
//         </Card>

//         <Card className="p-2 bg-[#191919] border-[#1D282C] rounded-[0px]">
//           {quests.map((quest, index) => (
//             <div key={index} className="flex items-center space-x-2 text-white text-[10px]">
//               <Checkbox checked={quest.completed} onCheckedChange={() => handleQuestChange(index)} />
//               <span>{quest.label}</span>
//             </div>
//           ))}
//         </Card>
        
//         <Card  className="text-white mt-4 p-2 bg-[#1D282C] border-none rounded-[5px] font-[monospace]">
//           <h2 className="text-lg font-bold text-[#398FFF]">Bio</h2>
//           <p>Age: </p> 
//           <p>Height (cm): </p>
//           <p>Ethnicity: </p>
//           <p>Occupation: </p>
//           <p>Days since Ascension:  </p>
//         </Card>
       
//       </div>
      
//     </div>
//      {/* ))} */}
//     </div>
//   );
// }


import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { Link, useNavigate } from 'react-router-dom';

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import CharacterImage from '../assets/characterimage.png';
import OtherImage from '../assets/otherimage.png';
import { useState, useEffect } from "react";

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

  const [quests, setQuests] = useState([
    { label: "Defeat the Beast", completed: false },
    { label: "Collect Resources", completed: false },
    { label: "Training Session", completed: false },
    { label: "Protect the Village", completed: false },
  ]);

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
    Physical: 10,
    Spiritual: 12,
    Mental: 15,
    Social: 10,
    Emotional: 9,
  };

  const chartData = {
    labels: Object.keys(skillLevels),
    datasets: [
      {
        label: "Skill Levels",
        data: Object.values(skillLevels),
        backgroundColor: "rgba(118, 160, 244, 0.2)",
        borderColor: "#76A0F4",
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
          color: '#616D87'
        },
        ticks: {
          display: false, // Hide numbers on the chart
        },
        grid: {
          color: '#616D87',
          lineWidth: 1,
        },
        angleLines: {
          color: '#616D87', // Change the colour of the axis lines
          lineWidth: 1,
        },
      },
    },
  };

  const handleQuestChange = (index: number) => {
    const newQuests = [...quests];
    newQuests[index].completed = !newQuests[index].completed;
    setQuests(newQuests);
  };

  return (
    <div>
      {storedCharacters.map((char, index) => (
      <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
        {/* Left Panel */}
        <div className="mt-10 w-full md:w-1/4 p-4">
          <Card key={index} className="p-2 bg-[#262626] border-none rounded-[5px]">
            <h2 className="text-lg text-center font-bold font-[Metropolis] text-[#398FFF]">Character: {char.username}</h2>
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
              className="block text-center mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer font-[monospace] text-[10px]"
            >
              Change Character Image
            </label>
          </div>

          <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
            <div className="text-white ">
              <p>⭐ XP: 100/20000</p>
            </div>
          </Card>

          <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
            <p className="text-white">💎 Gems: 3000</p>
          </Card>

          <div className="mt-4">
            <p>Physical: Lv. 10</p>
            <Progress value={50} max={20} className="h-[5px]" />
            <p>Spiritual: Lv. 12</p>
            <Progress value={50} max={20} className="h-[5px]" />
            <p>Mental: Lv. 15</p>
            <Progress value={50} max={20} className="h-[5px]" />
            <p>Social: Lv. 8</p>
            <Progress value={50} max={20} className="h-[5px]" />
            <p>Emotional: Lv. 9</p>
            <Progress value={50} max={20} className="h-[5px]" />
          </div>
        </div>

        {/* Centre Panel */}
        <div className="mt-10 w-full md:w-2/4 p-4 flex flex-col items-center text-center">
          <h1 className="text-2xl">Level: 1</h1>
          <p>Title: <span className="italic">None</span></p>
          <p>Class: <span className="italic">None</span></p>
          <div className="mt-4 w-full max-w-md">
            <Radar data={chartData} options={options} />
          </div>

          <div className="mt-3 w-full max-w-md">
            <Card className="bg-white border-none rounded-[5px]">
              <p className="text-black">❤️ Health: 10/20</p>
            </Card>
            <Progress value={50} max={20} className="mt-2 h-[10px]" />
            <Card className="mt-2 bg-white border-none rounded-[5px]">
              <p>⚡Energy: 10/20</p>
            </Card>
            <Progress value={50} max={20} className="mt-2 h-[10px]" />
            <Card className="mt-2 bg-white border-none rounded-[5px]">
              <p>😊 Mood: 10/20</p>
            </Card>
            <Progress value={50} max={20} className="mt-2 h-[10px]" />
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
          >
            Change Image
          </label>

          <Card className="mt-4 p-1 bg-[#1D282C] border-none rounded-[0px]">
            <h2 className="text-base text-[#76A0F4] ">Daily Quests</h2>
          </Card>

          <Card className="p-2 bg-[#191919] border-[#1D282C] rounded-[0px]">
            {quests.map((quest, index) => (
              <div key={index} className="flex items-center">
                <Checkbox
                  id={`quest-${index}`}
                  checked={quest.completed}
                  onCheckedChange={() => handleQuestChange(index)}
                  className="mr-2"
                />
                <label htmlFor={`quest-${index}`} className="text-white">{quest.label}</label>
              </div>
            ))}
          </Card>

          <Card className="mt-4 p-2 bg-[#191919] border-[#1D282C] rounded-[0px]">
            <Link to="/quests" className="text-[#76A0F4] text-sm font-bold">Go to Quest Log</Link>
          </Card>

          <Card  key={index} className="text-white mt-4 p-2 bg-[#1D282C] border-none rounded-[5px] font-[monospace]">
            <h2 className="text-lg font-bold text-[#398FFF]">Bio</h2>
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
