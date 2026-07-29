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
      {console.log(npc)}
      <h2 className="text-4xl text-white font-bold">
        {npc?.name || "Loading..."}
      </h2>
      <p className="text-2xl text-white">
        Info: {npc.info?.replaceAll('"', "")}
      </p>
      <p className="text-2xl text-white">City: {npc?.city}</p>
    </div>
  );
}
