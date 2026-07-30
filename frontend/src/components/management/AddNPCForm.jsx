import React, { useEffect, useState } from "react";
import {
  formContainerClasses,
  formLabelClasses,
  formSelectClasses,
  formSubmitButtonClasses,
  textFormInputClasses,
} from "../../helpers/htmlClasses";
import { upperFirstLetter } from "../../helpers/helperFunctions";
import { FLASK_GET_CITIES_URL, FLASK_PUT_NPCS_URL } from "../../helpers/consts";
import NpcCard from "../cards/NpcCard";

export default function AddNPCForm({ setCreated, itemCreated }) {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [cities, setCities] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  async function getCities() {
    try {
      const res = await fetch(FLASK_GET_CITIES_URL);
      const { cities } = await res.json();
      setCities(cities);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getCities();
  }, []);
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(FLASK_PUT_NPCS_URL, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ city_name: selectedCity, name, info }),
      });
      if (!res.ok) {
        throw new Error("Error adding NPC.");
      }
      const data = await res.json();
      setCreated(() => data.npc);
      setName(() => "");
      setInfo(() => "");
      setSelectedCity(() => "");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className={formContainerClasses.join(" ")}>
      <form onSubmit={(e) => onFormSubmit(e)} className="flex flex-col gap-4">
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
        <label className={formLabelClasses.join(" ")}>
          Info (optional)
          <input
            className={textFormInputClasses.join(" ")}
            type="text"
            name="name"
            id="name"
            value={info}
            onChange={(e) => {
              setInfo(e.target.value);
            }}
          ></input>
        </label>
        <label className={formLabelClasses.join(" ")}>
          City
          <select
            className={formSelectClasses.join(" ")}
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
            name="city"
            id="city"
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={crypto.randomUUID()} value={city.name}>
                {upperFirstLetter(city.name)}
              </option>
            ))}
          </select>
        </label>
        <button className={formSubmitButtonClasses.join(" ")}>Add NPC</button>
      </form>
      {!submitted && <div className="h-[30%]"></div>}

      {itemCreated?.city && (
        <div className="w-1/2">
          <h2 className="text-center text-3xl font-bold text-white">
            Created:
          </h2>
          <NpcCard npc={itemCreated} />
        </div>
      )}
    </section>
  );
}
