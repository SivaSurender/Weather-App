import React from "react";

function TopButtons() {
  const cities = [
    {
      id: 1,
      title: "Chennai",
    },
    {
      id: 2,
      title: "Bengaluru",
    },
    {
      id: 1,
      title: "Kerala",
    },
    {
      id: 1,
      title: "Mumbai",
    },
    {
      id: 1,
      title: "Hyderabad",
    },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button key={city.id} className="text-white text-lg font-medium">
          {city.title}
        </button>
      ))}
    </div>
  );
}

export default TopButtons;
