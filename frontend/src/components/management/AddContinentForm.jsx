import React, { useState } from "react";
import {
  formContainerClasses,
  formLabelClasses,
  formSubmitButtonClasses,
  textFormInputClasses,
  transitionClasses,
} from "../../helpers/htmlClasses";
import { FLASK_PUT_CONTINENTS_URL } from "../../helpers/consts";
import ContinentCard from "../cards/ContinentCard";

export default function AddContinentForm({ setCreated, itemCreated }) {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(FLASK_PUT_CONTINENTS_URL, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          name,
          info,
        }),
      });
      if (!res.ok) {
        throw new Error("Error adding Continent.");
      }
      const data = await res.json();
      setCreated(() => data.continent);
      setName(() => "");
      setInfo(() => "");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section className={formContainerClasses.join(" ")}>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
        <label className={formLabelClasses.join(" ")}>
          Name
          <input
            className={textFormInputClasses.join(" ")}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(() => e.target.value)}
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
              setInfo(() => e.target.value);
            }}
          ></input>
        </label>
        <button
          className={
            formSubmitButtonClasses.join(" ") +
            " " +
            transitionClasses.join(" ")
          }
        >
          Add Continent
        </button>
      </form>
      {itemCreated?.is_continent && (
        <div className="w-1/2">
          <h2 className="text-center text-3xl font-bold text-white">
            Created:
          </h2>
          <ContinentCard continent={itemCreated} />
        </div>
      )}
    </section>
  );
}
