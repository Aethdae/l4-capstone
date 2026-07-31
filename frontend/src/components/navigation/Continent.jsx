import React, { useEffect, useState } from "react";
import { FLASK_GET_CONTINENTS_URL } from "../../helpers/consts";
import ContinentCard from "../cards/ContinentCard";
import { useParams } from "react-router";

export default function Continent() {
  const params = useParams();
  const [cont, setCont] = useState({});
  async function grabCont() {
    try {
      const res = await fetch(
        FLASK_GET_CONTINENTS_URL + `/${params.continent}`,
      );
      if (!res.ok) {
        throw new Error("Failed to get continent!");
      }
      const { continent } = await res.json();
      setCont(continent);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    grabCont();
  }, []);
  return (
    <div className="flex flex-col min-h-[40vh] gap-10 z-10 justify-around items-center bg-black w-[80vw] [border-style:groove] mx-auto border-4 border-white">
      <div className="w-[80%] mx-auto py-10">
        {cont.name?.length > 0 && (
          <ContinentCard continent={cont} inDepth={true} />
        )}
      </div>
    </div>
  );
}
