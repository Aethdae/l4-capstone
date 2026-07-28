import React from "react";
import { States } from "../../helpers/states";
import WorldManagerButton from "./WorldManagerButton";

export default function WorldManagerButtons({
  onContinent,
  onCity,
  onNPC,
  currActive,
}) {
  return (
    <nav className="flex gap-4 -mb-1">
      <WorldManagerButton
        onClick={onContinent}
        type={States.CONTINENT}
        currActive={currActive}
      />
      <WorldManagerButton
        onClick={onCity}
        type={States.CITY}
        currActive={currActive}
      />
      <WorldManagerButton
        onClick={onNPC}
        type={States.NPC}
        currActive={currActive}
      />
    </nav>
  );
}
