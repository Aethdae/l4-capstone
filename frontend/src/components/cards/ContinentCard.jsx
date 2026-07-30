import React from "react";
import {
  baseCardClasses,
  liListClasses,
  ulListClasses,
} from "../../helpers/htmlClasses";
import { Link, useNavigate } from "react-router";

export default function ContinentCard({ continent, inDepth }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        inDepth ? "" : navigate(`/continents/${continent?.name}`);
      }}
      className={
        inDepth
          ? baseCardClasses.join(" ") + " cursor-default"
          : baseCardClasses.join(" ") + " cursor-pointer"
      }
    >
      <h2 className="text-4xl bg-white text-black border border-black px-4 py-2">
        {continent?.name || "Loading..."}
      </h2>

      {continent.info?.length > 0 && <p>Info: {continent.info}</p>}
      {inDepth && (
        <>
          <h3 className="text-2xl text-center w-full bg-gray-600">Cities</h3>
          <ul className={ulListClasses.join(" ")}>
            {continent.cities?.map((city) => (
              <li key={city} className={liListClasses.join(" ")}>
                <Link to={`/cities/${city}`}>{city}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
