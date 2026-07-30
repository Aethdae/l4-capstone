import React, { useEffect } from "react";
import { FLASK_URL } from "../../helpers/consts";

export default function HomePage() {
  async function pingBackend() {
    const res = fetch(FLASK_URL);
  }
  useEffect(() => {
    pingBackend();
  }, []);
  return (
    <div className="flex flex-col min-h-[90vh] z-10 justify-around items-center bg-black w-[80vw] [border-style:groove] mx-auto border-4 border-white">
      <section className="min-h-[70vh]">
        <h2>Managing a world in any TTRPG is a difficult and arduous task.</h2>
        <p>Keeping track of locations, NPCs, events, etc.</p>
        <p>While this is not a solution, but a helpful tool along the way.</p>
      </section>
      <section className="min-h-[70vh]">
        You can manage PF/DND worlds here
      </section>
      <section className="min-h-[70vh]">
        Create things on manage page :gothere:
      </section>
    </div>
  );
}
