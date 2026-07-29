import React from "react";

export default function CityCard({ city }) {
  return (
    <div>
      <p>{city?.name}</p>
    </div>
  );
}
