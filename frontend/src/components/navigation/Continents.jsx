import React, { useEffect, useState } from "react";
import { FLASK_GET_CONTINENTS_URL } from "../../helpers/consts";
import ContinentCard from "../cards/ContinentCard";

export default function Continents() {
  const [conts, setConts] = useState([]);
  async function getCities() {
    try {
      const res = await fetch(FLASK_GET_CONTINENTS_URL);
      if (!res.ok) {
        throw new Error("Unable to fetch continents!");
      }
      const { continents } = await res.json();
      setConts(continents);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCities();
  }, []);
  return (
    <div className="grid grid-cols-2 min-h-[90vh] z-10 justify-center p-4 items-center bg-black w-[80vw] [border-style:groove] mx-auto border-4 border-white">
      {conts.map((cont) => (
        <ContinentCard key={cont.id} continent={cont} />
      ))}
    </div>
  );
}
