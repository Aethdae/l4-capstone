import React from "react";
import { baseCardClasses } from "../../helpers/htmlClasses";
import { Link, useNavigate } from "react-router";

export default function NpcCard({ npc, inDepth }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        inDepth ? "" : navigate(`/npcs/${npc?.name}`);
      }}
      className={
        inDepth
          ? baseCardClasses.join(" ") + " cursor-default"
          : baseCardClasses.join(" ") + " cursor-pointer"
      }
    >
      <h2 className="text-4xl bg-white text-black border border-black px-4 py-2">
        {npc?.name || "Loading..."}
      </h2>
      <p className="text-2xl text-white">
        Info: {npc.info?.replaceAll('"', "")}
      </p>
      <h3 className="text-2xl text-center w-full bg-gray-600">NPCs</h3>
      {inDepth && (
        <Link to={`/cities/${npc.city}`}>
          <p className="text-2xl text-white">City: {npc?.city}</p>
        </Link>
      )}
    </div>
  );
}
