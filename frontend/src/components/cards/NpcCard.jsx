import React from "react";
import { baseCardClasses } from "../../helpers/htmlClasses";
import { Link } from "react-router";

export default function NpcCard({ npc }) {
  return (
    <div className={baseCardClasses.join(" ")}>
      {console.log(npc)}
      <p className="text-4xl text-white font-bold">{npc?.name}</p>
      <p className="text-2xl text-white">
        Info: {npc.info?.replaceAll('"', "")}
      </p>
      <p className="text-2xl text-white">City: {npc?.city}</p>
      <Link to={`/npcs/${npc?.name}`}>test</Link>
    </div>
  );
}
