import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Import your page components
import CharacterDashboard from './pages/CharacterDashboard.tsx';
import HomePage from './pages/HomePage.tsx'; // Your existing home page
import LoadCharacter from './pages/LoadCharacter.tsx';
import NewCharacter from './pages/NewCharacter.tsx';
import Settings from './pages/Settings.tsx';
import Skills from './pages/Skills.tsx';
import Shop from './pages/Shop.tsx';
import Quests from './pages/Quests.tsx';
import DailyQuests from './pages/DailyQuests.tsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-character" element={<NewCharacter />} />
        <Route path="/load-character" element={<LoadCharacter />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/character-dashboard" element={<CharacterDashboard />} />
        <Route path="/quests" element={<Quests />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/daily-quests" element={<DailyQuests />} />
      </Routes>
    </Router>
  );
};

export default App;

