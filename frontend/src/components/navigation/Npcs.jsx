import React, { useEffect, useState } from "react";
import NpcCard from "../cards/NpcCard";
import { FLASK_GET_NPCS_URL } from "../../helpers/consts";

export default function Npcs() {
  async function getNpcs() {
    try {
      const res = await fetch(FLASK_GET_NPCS_URL);
      if (!res.ok) {
        throw new Error("Couldn't get NPCs!");
      }
      const { npcs } = await res.json();
      setNpcs(npcs);
    } catch (error) {
      console.error(error);
    }
  }
  const [npcs, setNpcs] = useState([]);
  useEffect(() => {
    getNpcs();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-2 min-h-[90vh] z-10 justify-center items-center bg-black w-[80vw] [border-style:groove] mx-auto border-4 border-white">
      {npcs.map((npc) => (
        <NpcCard key={npc.id} npc={npc} />
      ))}
    </div>
  );
}
