import React, { useEffect, useRef, useState } from "react";
import { FLASK_GET_CONTINENTS_URL } from "../../helpers/consts";
import {
  formContainerClasses,
  formLabelClasses,
  formSelectClasses,
  formSubmitButtonClasses,
  textFormInputClasses,
} from "../../helpers/htmlClasses";
import { upperFirstLetter } from "../../helpers/helperFunctions";

export default function AddCityForm({ setCreated, itemCreated }) {
  const intAreas = useRef([""]);
  const intElements = [];
  const [continents, setContinents] = useState([]);
  const [name, setName] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [renderState, setRenderState] = useState("");
  const [interestAreaElements, setInterestAreaElements] = useState([{}]);

  useEffect(() => {
    getContinents();
  }, []);

  useEffect(() => {
    intElements.forEach((element, i) => {
      document.getElementById(element).value = intAreas.current[i] || "";
    });
  }, [renderState]);

  async function getContinents() {
    try {
      const res = await fetch(FLASK_GET_CONTINENTS_URL);
      const { continents } = await res.json();
      setContinents(continents);
    } catch (error) {
      console.error(error);
    }
  }
  function handleAreaChange(e, index) {
    e.preventDefault();
    intAreas.current[index] = e.target.value;
  }
  function addInterestArea() {
    setInterestAreaElements(() => [...interestAreaElements, { area: "" }]);
  }
  async function handleSubmitForm(e) {
    e.preventDefault();
    console.log("Submitted nothing atm PH", {
      name,
      selectedContinent,
      intAreas,
    });
  }

  return (
    <section className={formContainerClasses.join(" ")}>
      <form
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
        className="flex flex-col gap-4"
      >
        <label className={formLabelClasses.join(" ")}>
          Name
          <input
            className={textFormInputClasses.join(" ")}
            aria-required
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName((prev) => e.target.value);
              setRenderState(crypto.randomUUID());
            }}
          ></input>
        </label>
        {interestAreaElements.map((item, i) => {
          if (!intElements.includes("area-" + i)) {
            intElements.push("area-" + i);
          }
          return (
            <label
              key={crypto.randomUUID()}
              className={formLabelClasses.join(" ")}
            >
              Area
              <input
                className={textFormInputClasses.join(" ")}
                type="text"
                name={"area-" + i}
                id={"area-" + i}
                onChange={(e) => {
                  e.preventDefault();
                  handleAreaChange(e, i);
                }}
              ></input>
            </label>
          );
        })}
        <label className={formLabelClasses.join(" ")}>
          City
          <select
            className={formSelectClasses.join(" ")}
            value={selectedContinent}
            onChange={(e) => {
              setSelectedContinent(e.target.value);
              setRenderState(crypto.randomUUID());
            }}
            name="city"
            id="city"
          >
            <option value="">Select a continent</option>
            {continents.map((continent) => (
              <option key={crypto.randomUUID()} value={continent.name}>
                {upperFirstLetter(continent.name)}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={(e) => {
            addInterestArea();
            setRenderState(crypto.randomUUID());
          }}
        >
          Add area
        </button>

        <button className={formSubmitButtonClasses.join(" ")}>Add City</button>
      </form>
    </section>
  );
}
