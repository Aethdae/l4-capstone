import { Route, Routes } from "react-router";
import Navbar from "./components/navigation/Navbar";
import HomePage from "./components/navigation/HomePage";
import Continent from "./components/navigation/Continent";
import Continents from "./components/navigation/Continents";
import City from "./components/navigation/City";
import Footer from "./components/navigation/Footer";
import Cities from "./components/navigation/Cities";
import WorldManager from "./components/management/WorldManager";
import Npcs from "./components/navigation/Npcs";
import Npc from "./components/navigation/Npc";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/continents/:continent" element={<Continent />} />
          <Route path="/cities/:city" element={<City />} />
          <Route path="/npcs/:npc" element={<Npc />} />
          <Route path="/npcs" element={<Npcs />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/continents" element={<Continents />} />
          <Route path="/management" element={<WorldManager />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
