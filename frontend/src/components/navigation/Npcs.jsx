import React, { useEffect, useState } from "react";
import NpcCard from "../cards/NpcCard";
import { FLASK_GET_NPCS_URL } from "../../helpers/consts";
import {
  cardContainerClasses,
  cardContainerClassesSmall,
} from "../../helpers/htmlClasses";

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
  return npcs.length > 4 ? (
    <div className={cardContainerClasses.join(" ")}>
      {npcs.map((npc) => {
        return <NpcCard key={npc.id} npc={npc} />;
      })}
    </div>
  ) : (
    <div className={cardContainerClassesSmall.join(" ")}>
      {npcs.map((npc) => {
        return <NpcCard key={npc.id} npc={npc} />;
      })}
    </div>
  );
}
