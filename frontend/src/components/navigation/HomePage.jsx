import React, { useEffect } from "react";

export default function HomePage() {
  async function pingBackend() {
    const res = fetch("localhost:5000/");
  }
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col min-h-[90vh] z-10 justify-around items-center bg-black w-[80vw] [border-style:groove] mx-auto border-4 border-white">
      <section>Welcome to site</section>
      <section>You can manage PF/DND worlds here</section>
      <section>Create things on manage page :gothere:</section>
    </div>
  );
}
