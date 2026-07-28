import React, { useState } from "react";
import {
  managerNavButtonActiveClasses,
  managerNavButtonClasses,
  transitionClasses,
} from "../../helpers/htmlClasses";
import { States } from "../../helpers/states";

export default function WorldManagerButton({ onClick, type, currActive }) {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => {
        onClick();
        setActive(type);
      }}
      className={
        currActive === type
          ? managerNavButtonActiveClasses.join(" ") +
            transitionClasses.join(" ")
          : managerNavButtonClasses.join(" ") + transitionClasses.join(" ")
      }
    >
      {type == States.CITY && "City"}
      {type == States.CONTINENT && "Continent"}
      {type == States.NPC && "NPC"}
    </button>
  );
}
