import React, { useEffect, useState } from "react";
import { FLASK_GET_CONTINENTS_URL } from "../../helpers/consts";
import ContinentCard from "../cards/ContinentCard";
import {
  cardContainerClasses,
  cardContainerClassesSmall,
} from "../../helpers/htmlClasses";

export default function Continents() {
  const [conts, setConts] = useState([]);
  async function getConts() {
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
    getConts();
  }, []);
  return conts.length > 4 ? (
    <div className={cardContainerClasses.join(" ")}>
      {conts.map((cont) => (
        <ContinentCard key={cont.id} continent={cont} />
      ))}
    </div>
  ) : (
    <div className={cardContainerClassesSmall.join(" ")}>
      {conts.map((cont) => (
        <ContinentCard key={cont.id} continent={cont} />
      ))}
    </div>
  );
}
