// import { Radar } from "react-chartjs-2";
// import "chart.js/auto";
// import { Link } from 'react-router-dom';

// // import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Checkbox } from "@/components/ui/checkbox";
// import CharacterImage from '../assets/characterimage.png';
// import OtherImage from '../assets/otherimage.png';


// export default function CharacterDashboard() {
//   const [quests, setQuests] = useState([
//     { label: "Defeat the Beast", completed: false },
//     { label: "Collect Resources", completed: false },
//     { label: "Training Session", completed: false },
//     { label: "Protect the Village", completed: false },
//   ]);

//   const skillLevels = {
//         Physical: 10,
//         Spiritual: 12,
//         Mental: 15,
//         Social: 10,
//         Emotional: 9,
//       };

//   const chartData = {
//         labels: Object.keys(skillLevels),
//         datasets: [
//           {
//             label: "Skill Levels",
//             data: Object.values(skillLevels),
//             backgroundColor: "rgba(118, 160, 244, 0.2)",
//             borderColor: "#76A0F4",
//             borderWidth: 1,
//             pointRadius: 1,
//           },
//         ],
//       };

//   const options = {
//         plugins: {
//           legend: {
//             display: false, // Hide the legend (key)
//           },
//         },
//         scales: {
//           r: {
//             pointLabels: {
//               display: true, // Hide category labels (Thing 1, Thing 2, etc.)
//               color: '#616D87'
//             },
//             ticks: {
//               display: false, // Hide numbers on the chart
//             },
//             grid: {
//               color: '#616D87',
//               lineWidth: 1,
//             },
//             angleLines: {
//               color: '#616D87', // Change the colour of the axis lines
//               lineWidth: 1,
//             },
            
//           },
//         },
//       };
      

//   const handleQuestChange = (index: number) => {
//     const newQuests = [...quests];
//     newQuests[index].completed = !newQuests[index].completed;
//     setQuests(newQuests);
//   };

//   return (
//     <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
//       {/* Left Panel */}
//       <div className="mt-10 w-full md:w-1/4 p-4">
//         <Card className="p-2 bg-[#262626] border-none rounded-[5px]">
//           <h2 className="text-lg text-center font-bold font-[Metropolis] text-[#398FFF]">Character: Jimmy Neutron</h2>
//         </Card>

//         <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
//           <p className="italic text-white text-center">"Only a fool trips on what is behind him"</p>
//         </Card>  
        
//         <div className="mt-3">
//           <img src={CharacterImage} alt="Character" className="mt-4 rounded-lg w-full" />
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
//         <img src={OtherImage} alt="Other" className="mt-4 rounded-lg w-full" />
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

//         <Card className="text-white mt-4 p-2 bg-[#1D282C] border-none rounded-[5px] font-[monospace]">
//           <h2 className="text-lg font-bold text-[#398FFF]">Bio</h2>
//           <p>Age: 22</p> 
//           <p>Height: 5'7"</p>
//           <p>Ethnicity: XXX</p>
//           <p>Birthday: April XX</p>
//           <p>Position: Data Engineer</p>
//           <p>Days since Ascension: 1</p>
//           <p>Hobbies: XXXX</p>
//         </Card>
//       </div>



//     </div>
//   );
// }


import { Radar } from "react-chartjs-2";
import "chart.js/auto";
import { Link } from 'react-router-dom';

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import CharacterImage from '../assets/characterimage.png';
import OtherImage from '../assets/otherimage.png';
import { useState } from "react";

export default function CharacterDashboard() {
  const [quests, setQuests] = useState([
    { label: "Defeat the Beast", completed: false },
    { label: "Collect Resources", completed: false },
    { label: "Training Session", completed: false },
    { label: "Protect the Village", completed: false },
  ]);

  const [characterImage, setCharacterImage] = useState(CharacterImage);
  const [otherImage, setOtherImage] = useState(OtherImage);

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

  const handleCharacterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setCharacterImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOtherImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setOtherImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#191919] bg-cover bg-center flex flex-col md:flex-row text-white font-[monospace]">
      {/* Left Panel */}
      <div className="mt-10 w-full md:w-1/4 p-4">
        <Card className="p-2 bg-[#262626] border-none rounded-[5px]">
          <h2 className="text-lg text-center font-bold font-[Metropolis] text-[#398FFF]">Character: Jimmy Neutron</h2>
        </Card>

        <Card className="mt-3 p-1 bg-[#262626] border-none rounded-[5px]">
          <p className="italic text-white text-center">"Only a fool trips on what is behind him"</p>
        </Card>  

        <div className="mt-3">
          <img src={characterImage} alt="Character" className="mt-4 rounded-lg w-full" />
          <input type="file" onChange={handleCharacterImageChange} className="mt-2" />
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
          <Progress value={50} max={20} className="h-[5px]"/>
          <p>Mental: Lv. 15</p>
          <Progress value={50} max={20} className="h-[5px]"/>
          <p>Social: Lv. 8</p>
          <Progress value={50} max={20} className="h-[5px]"/>
          <p>Emotional: Lv. 9</p>
          <Progress value={50} max={20} className="h-[5px]"/>
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
          <Progress value={50} max={20} className="mt-2 h-[10px]"/>
        </div>
      </div>

      {/* Right Panel */}
      <div className="mt-10 w-full md:w-1/4 p-4 text-white">
        <img src={otherImage} alt="Other" className="mt-4 rounded-lg w-full" />
        <input type="file" onChange={handleOtherImageChange} className="mt-2" />

        <Card className="mt-4 p-1 bg-[#1D282C] border-none rounded-[0px]">
          <h2 className="text-base text-[#76A0F4] ">Daily Quests</h2>
        </Card>

        <Card className="p-2 bg-[#191919] border-[#1D282C] rounded-[0px]">
          {quests.map((quest, index) => (
            <div key={index} className="flex items-center space-x-2 text-white text-[10px]">
              <Checkbox checked={quest.completed} onCheckedChange={() => handleQuestChange(index)} />
              <span>{quest.label}</span>
            </div>
          ))}
        </Card>

        <Card className="text-white mt-4 p-2 bg-[#1D282C] border-none rounded-[5px] font-[monospace]">
          <h2 className="text-lg font-bold text-[#398FFF]">Bio</h2>
          <p>Age: 22</p> 
          <p>Height: 5'7"</p>
          <p>Ethnicity: XXX</p>
          <p>Birthday: April XX</p>
          <p>Position: Data Engineer</p>
          <p>Days since Ascension: 1</p>
          <p>Hobbies: XXXX</p>
        </Card>
      </div>
    </div>
  );
}
