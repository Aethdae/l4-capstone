import React, { useEffect, useRef, useState } from "react";
import {
  FLASK_GET_CONTINENTS_URL,
  FLASK_PUT_CITIES_URL,
} from "../../helpers/consts";
import {
  formContainerClasses,
  formLabelClasses,
  formSelectClasses,
  formSubmitButtonClasses,
  mainNavButtonClasses,
  textFormInputClasses,
  transitionClasses,
} from "../../helpers/htmlClasses";
import { upperFirstLetter } from "../../helpers/helperFunctions";
import CityCard from "../cards/CityCard";

export default function AddCityForm({ setCreated, itemCreated }) {
  const [continents, setContinents] = useState([]);
  const [interestAreaElements, setInterestAreaElements] = useState([]);
  const [formState, setFormState] = useState(() => ({
    name: "",
    selectedContinent: "",
    interestAreas: [createInterestArea()],
    info: "",
  }));

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

  function handleFormChange(e) {
    setFormState((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }

  function handleAreaChange(e, id) {
    setFormState((prev) => {
      const newInterestAreas = prev.interestAreas.map((area) => {
        return area.id === id ? { ...area, value: e.target.value } : area;
      });
      return { ...prev, interestAreas: newInterestAreas };
    });
  }

  function createInterestArea() {
    return {
      id: crypto.randomUUID(),
      value: "",
    };
  }

  function addInterestArea() {
    setFormState((prev) => ({
      ...prev,
      interestAreas: [...prev.interestAreas, createInterestArea()],
    }));
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      const areas = formState.interestAreas.map((item) => item.value);
      const res = await fetch(FLASK_PUT_CITIES_URL, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          interest_areas: areas,
          name: formState.name,
          info: formState.info,
          continent_name: formState.selectedContinent,
        }),
      });
      if (!res.ok) {
        throw new Error("Error adding City.");
      }
      const data = await res.json();
      setCreated(() => data.city);
      setFormState(() => ({
        name: "",
        info: "",
        selectedContinent: "",
        interestAreas: [createInterestArea()],
      }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={formContainerClasses.join(" ")}>
      <form
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
        className="flex flex-col gap-4 w-[60%]"
      >
        <label className={formLabelClasses.join(" ")}>
          Name
          <input
            className={textFormInputClasses.join(" ")}
            aria-required
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={handleFormChange}
          ></input>
        </label>
        {formState.interestAreas.map((area, i) => {
          return (
            <label key={area.id} className={formLabelClasses.join(" ")}>
              Area
              <input
                className={textFormInputClasses.join(" ")}
                type="text"
                name={"area-" + i}
                id={"area-" + i}
                onChange={(e) => {
                  e.preventDefault();
                  handleAreaChange(e, area.id);
                }}
                value={formState.interestAreas[i].value}
              ></input>
            </label>
          );
        })}
        <label className={formLabelClasses.join(" ")}>
          Info
          <textarea
            cols={40}
            className={textFormInputClasses.join(" ")}
            aria-required
            type="text"
            name="info"
            id="info"
            value={formState.info}
            onChange={handleFormChange}
          ></textarea>
        </label>
        <label className={formLabelClasses.join(" ")}>
          Continent
          <select
            className={formSelectClasses.join(" ")}
            value={formState.selectedContinent}
            onChange={handleFormChange}
            name="selectedContinent"
            id="selectedContinent"
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
          className={
            mainNavButtonClasses.join(" ") +
            " self-center " +
            transitionClasses.join(" ")
          }
          type="button"
          onClick={(e) => {
            addInterestArea();
          }}
        >
          Add area
        </button>

        <button
          className={
            formSubmitButtonClasses.join(" ") +
            " " +
            transitionClasses.join(" ")
          }
        >
          Add City
        </button>
      </form>
      {itemCreated?.continent && (
        <div className="w-1/2">
          <h2 className="text-center text-3xl font-bold text-white">
            Created:
          </h2>
          <CityCard city={itemCreated} />
        </div>
      )}
    </section>
  );
}
