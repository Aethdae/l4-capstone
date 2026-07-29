import React from "react";

export default function ContinentCard({ continent, inDepth }) {
  return (
    <div
      onClick={() => navigate(`/continents/${continent?.name}`)}
      className={baseCardClasses.join(" ")}
    >
      <h2>{continent?.name || "Loading..."}</h2>
    </div>
  );
}
