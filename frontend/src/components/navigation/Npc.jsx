import React, { useEffect, useState } from "react";
import NpcCard from "../cards/NpcCard";
import { useParams } from "react-router";
import { FLASK_GET_NPCS_URL } from "../../helpers/consts";

export default function Npc() {
  const params = useParams();
  const [npc, setNpc] = useState({});
  async function grabNpc() {
    try {
      const res = await fetch(FLASK_GET_NPCS_URL + `/${params.npc}`);
      if (!res.ok) {
        throw new Error("Failed to get NPC!");
      }
      const { npc } = await res.json();
      setNpc(npc);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    grabNpc();
  }, []);
  return (
    <div className="flex flex-col min-h-[40vh] gap-10 z-10 justify-around items-center bg-black w-[80vw] [border-style:groove] mx-auto border-4 border-white">
      <div className="w-[80%] mx-auto py-10">
        {npc.name?.length > 0 && <NpcCard npc={npc} inDepth={true} />}
      </div>
    </div>
  );
}
