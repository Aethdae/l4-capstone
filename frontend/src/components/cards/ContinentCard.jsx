import React from "react";

export default function ContinentCard({ continent }) {
  return (
    <div>
      <p>{continent?.name}</p>
    </div>
  );
}
