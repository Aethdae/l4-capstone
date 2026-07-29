import React, { useEffect, useState } from "react";
import AddContinentForm from "./AddContinentForm";
import AddCityForm from "./AddCityForm";
import AddNPCForm from "./AddNPCForm";
import ManagementPlaceholder from "./ManagementPlaceholder";
import WorldManagerButtons from "./WorldManagerButtons";
import { States } from "../../helpers/states";
import ContinentCard from "../cards/ContinentCard";
import NpcCard from "../cards/NpcCard";
import CityCard from "../cards/CityCard";

export default function WorldManager() {
  const [adding, setAdding] = useState(States.NONE);
  const [itemAdded, setItemAdded] = useState({});

  return (
    <div className="flex flex-col items-center shadow-2xs shadow-white">
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
      {adding == States.CONTINENT && (
        <AddContinentForm setCreated={setItemAdded} itemCreated={itemAdded} />
      )}
      {adding == States.CITY && (
        <AddCityForm setCreated={setItemAdded} itemCreated={itemAdded} />
      )}
      {adding == States.NPC && (
        <AddNPCForm setCreated={setItemAdded} itemCreated={itemAdded} />
      )}
      {adding == States.NONE && <ManagementPlaceholder />}
      {/* {itemAdded.continent?.name && <ContinentCard continent={itemAdded} />} */}
      {/* {itemAdded.npc?.name && <NpcCard npc={itemAdded} />} */}
      {/* {itemAdded.city?.name && <CityCard city={itemAdded} />} */}
    </div>
  );
}
