import React, { useEffect, useState } from "react";
import { FLASK_GET_CITIES_URL } from "../../helpers/consts";
import CityCard from "../cards/CityCard";

export default function Cities() {
  const [cities, setCities] = useState([]);
  async function getCities() {
    try {
      const res = await fetch(FLASK_GET_CITIES_URL);
      if (!res.ok) {
        throw new Error("Unable to fetch cities!");
      }
      const { cities } = await res.json();
      setCities(cities);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCities();
  }, []);
  return (
    <div className="grid grid-cols-2 min-h-[90vh] z-10 justify-center p-4 items-center bg-black w-[80vw] [border-style:groove] mx-auto border-4 border-white">
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
}
