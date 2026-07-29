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
  const [continents, setContinents] = useState([]);
  const [name, setName] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [interestAreaElements, setInterestAreaElements] = useState([{}]);
  const interestAreas = useRef([{ value: "" }]);
  useEffect(() => {
    getContinents();
  }, []);
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
    interestAreas.current[index].value = e.target.value;
    setInterestAreaElements(() => [...interestAreaElements]);
  }
  function addInterestArea() {
    setInterestAreaElements(() => [...interestAreaElements, {}]);
    interestAreas.current = [...interestAreas.current, { value: "" }];
    return false;
  }
  async function handleSubmitForm() {}

  return (
    <section className={formContainerClasses.join(" ")}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
              setName(e.target.value);
            }}
          ></input>
        </label>
        {interestAreaElements.map((area, i) => (
          <label
            key={crypto.randomUUID()}
            className={formLabelClasses.join(" ")}
          >
            Area
            <input
              className={textFormInputClasses.join(" ")}
              type="text"
              name={"name-" + i}
              id={"name-" + i}
            ></input>
          </label>
        ))}
        <label className={formLabelClasses.join(" ")}>
          City
          <select
            className={formSelectClasses.join(" ")}
            value={selectedContinent}
            onChange={(e) => {
              setSelectedContinent(e.target.value);
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
            e.preventDefault();
            addInterestArea();
          }}
        >
          Add area
        </button>

        <button className={formSubmitButtonClasses.join(" ")}>Add City</button>
      </form>
    </section>
  );
}
