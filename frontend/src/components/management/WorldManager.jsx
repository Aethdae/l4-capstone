import React, { useEffect, useState } from "react";
import AddContinentForm from "./AddContinentForm";
import AddCityForm from "./AddCityForm";
import AddNPCForm from "./AddNPCForm";
import ManagementPlaceholder from "./ManagementPlaceholder";
import WorldManagerButtons from "./WorldManagerButtons";
import { States } from "../../helpers/states";

export default function WorldManager() {
  const [adding, setAdding] = useState(States.NONE);

  return (
    <div className="flex flex-col items-center">
      <WorldManagerButtons
        onContinent={() => {
          setAdding(States.CONTINENT);
        }}
        onCity={() => {
          setAdding(States.CITY);
        }}
        onNPC={() => {
          setAdding(States.NPC);
        }}
        currActive={adding}
      />
      {adding == States.CONTINENT && <AddContinentForm />}
      {adding == States.CITY && <AddCityForm />}
      {adding == States.NPC && <AddNPCForm />}
      {adding == States.NONE && <ManagementPlaceholder />}
    </div>
  );
}
