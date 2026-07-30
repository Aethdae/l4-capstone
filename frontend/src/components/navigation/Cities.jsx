import React, { useEffect, useState } from "react";
import { FLASK_GET_CITIES_URL } from "../../helpers/consts";
import CityCard from "../cards/CityCard";
import {
  cardContainerClasses,
  cardContainerClassesSmall,
} from "../../helpers/htmlClasses";

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
  return cities.length > 4 ? (
    <div className={cardContainerClasses.join(" ")}>
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  ) : (
    <div className={cardContainerClassesSmall.join(" ")}>
      {cities.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
}
