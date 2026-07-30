import React, { useEffect, useState } from "react";
import CityCard from "../cards/CityCard";
import { FLASK_GET_CITIES_URL } from "../../helpers/consts";
import { useParams } from "react-router";

export default function City() {
  const params = useParams();
  const [city, setCity] = useState({});
  async function grabCity() {
    try {
      const res = await fetch(FLASK_GET_CITIES_URL + `/${params.city}`);
      if (!res.ok) {
        throw new Error("Failed to get city!");
      }
      const data = await res.json();
      if (data.city) {
        setCity(data.city);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    grabCity();
  }, []);
  return (
    <div>
      {city.name?.length > 0 && <CityCard city={city} inDepth={true} />}
    </div>
  );
}
