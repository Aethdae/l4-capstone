import React from "react";
import { FLASK_GET_CITIES_URL } from "../../helpers/consts";

export default function Cities() {
  async function getCities() {
    try {
      const res = await fetch(FLASK_GET_CITIES_URL);
      const { cities } = await res.json();
      setCities(cities);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="grid min-h-[90vh] z-10 justify-center items-center bg-black w-[80vw] [border-style:groove] mx-auto border-4 border-white">
      Cities
    </div>
  );
}
