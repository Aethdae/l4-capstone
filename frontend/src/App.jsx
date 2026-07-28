import { Route, Routes } from "react-router";
import Navbar from "./components/navigation/Navbar";
import HomePage from "./components/navigation/HomePage";
import Continent from "./components/navigation/Continent";
import Continents from "./components/navigation/Continents";
import City from "./components/navigation/City";
import Footer from "./components/navigation/Footer";
import Cities from "./components/navigation/Cities";
import WorldManager from "./components/management/WorldManager";

export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/api/world/continents/:continent"
            element={<Continent continent={"test"} />}
          />
          <Route
            path="/api/world/cities/:city"
            element={<City city={"city"} />}
          />
          <Route path="/cities" element={<Cities />} />
          <Route path="/continents" element={<Continents />} />
          <Route path="/management" element={<WorldManager />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
