import React, { useState } from "react";

export default function AddContinentForm({ setCreated, itemCreated }) {
  const [name, setName] = useState("");
  return (
    <section className="flex min-h-[90vh] justify-center items-center bg-black w-[50vw] [border-style:groove] border-4 border-white">
      <form className="flex flex-col gap-4">
        Form
        <button>Add Continent</button>
      </form>
    </section>
  );
}
