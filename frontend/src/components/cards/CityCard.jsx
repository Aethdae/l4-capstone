import React from "react";
import { baseCardClasses } from "../../helpers/htmlClasses";
import { useNavigate } from "react-router";

export default function CityCard({ city, inDepth }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/cities/${city?.name}`);
      }}
      className={baseCardClasses.join(" ")}
    >
      <h2 className="text-4xl bg-white text-black border border-black px-4 py-2">
        {city?.name || "Loading..."}
      </h2>
      {city.info?.length > 0 && <p>Info: {city.info}</p>}
      {inDepth && (
        <>
          <h3>Areas of interest:</h3>
          <ul>
            {city.interest_areas?.map((area) => (
              <li key={crypto.randomUUID()}>{area}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
