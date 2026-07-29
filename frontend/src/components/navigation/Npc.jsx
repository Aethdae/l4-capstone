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
    <div>
      <NpcCard npc={npc} inDepth={true} />
    </div>
  );
}
