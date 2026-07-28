import React, { useEffect } from "react";

export default function HomePage() {
  async function pingBackend() {
    const res = fetch("localhost:5000/");
  }
  useEffect(() => {}, []);
  return (
    <div className="min-h-full">
      <section>Welcome to site</section>
      <section>You can manage PF/DND worlds here</section>
      <section>Create things on manage page :gothere:</section>
    </div>
  );
}
