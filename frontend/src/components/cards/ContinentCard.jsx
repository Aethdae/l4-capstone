import React from "react";
import { baseCardClasses } from "../../helpers/htmlClasses";
import { useNavigate } from "react-router";

export default function ContinentCard({ continent, inDepth }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/continents/${continent?.name}`)}
      className={baseCardClasses.join(" ")}
    >
      <h2 className="text-4xl bg-white text-black border border-black px-4 py-2">
        {continent?.name || "Loading..."}
      </h2>

      {inDepth && continent.info?.length > 0 && <p>Info: {continent.info}</p>}
    </div>
  );
}
