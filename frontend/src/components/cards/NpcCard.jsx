import React from "react";
import { baseCardClasses } from "../../helpers/htmlClasses";
import { Link, useNavigate } from "react-router";

export default function NpcCard({ npc, inDepth }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/npcs/${npc?.name}`)}
      className={baseCardClasses.join(" ")}
    >
      <h2 className="text-4xl bg-white text-black border border-black px-4 py-2">
        {npc?.name || "Loading..."}
      </h2>
      <p className="text-2xl text-white">
        Info: {npc.info?.replaceAll('"', "")}
      </p>
      {inDepth && <p className="text-2xl text-white">City: {npc?.city}</p>}
    </div>
  );
}
