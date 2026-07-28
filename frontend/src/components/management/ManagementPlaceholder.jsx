import React from "react";

export default function ManagementPlaceholder() {
  return (
    <section className="flex min-h-[90vh] z-10 justify-center items-center bg-black w-[50vw] [border-style:groove] border-4 border-white">
      <div className="flex bg-gray-800 px-20 py-20 rounded-2xl shadow-md/50 shadow-white hover:shadow-md/80 hover:bg-gray-700">
        <h2 className="text-4xl font-bold text-shadow-black text-shadow-lg">
          Choose content to add.
        </h2>
      </div>
    </section>
  );
}
