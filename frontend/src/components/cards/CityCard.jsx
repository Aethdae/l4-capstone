import React from "react";
import {
  baseCardClasses,
  liListClasses,
  ulListClasses,
} from "../../helpers/htmlClasses";
import { Link, useNavigate } from "react-router";

export default function CityCard({ city, inDepth }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        inDepth ? "" : navigate(`/cities/${city?.name}`);
      }}
      className={
        inDepth
          ? baseCardClasses.join(" ") + " cursor-default"
          : baseCardClasses.join(" ") + " cursor-pointer"
      }
    >
      <h2 className="text-4xl bg-white text-black border border-black px-4 py-2">
        {city?.name || "Loading..."}
      </h2>
      {city.info?.length > 0 && <p>Info: {city.info}</p>}
      {inDepth && (
        <>
          <h3 className="text-2xl text-center w-full bg-gray-600 border-b-2 border-white">
            NPCs
          </h3>
          <ul className={ulListClasses.join(" ")}>
            {city.npcs?.map((npc) => (
              <Link key={crypto.randomUUID()} to={`/npcs/${npc.name}`}>
                <li className={liListClasses.join(" ")}>{npc.name}</li>
              </Link>
            ))}
          </ul>
          <h3 className="text-2xl text-center w-full bg-gray-600 border-b-2 border-white">
            Areas of interest
          </h3>
          <ul className={ulListClasses.join(" ")}>
            {city.interest_areas?.map((area) => (
              <Link key={crypto.randomUUID()} to={`/cities/${area}`}>
                <li className={liListClasses.join(" ")}>{area}</li>
              </Link>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
