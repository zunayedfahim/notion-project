import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Card = ({ title, date, description, focused }) => {
  description = description.replace(/(<([^>]+)>)/gi, "");
  description = description.replace(/&(nbsp|amp|quot|lt|gt);/g, " ");
  return (
    <button
      className={`hover:text-white hover:bg-gray-600 p-2 my-2 outline-none rounded-sm w-full text-left ${
        focused && "bg-gray-700 text-white"
      }`}
    >
      <div className="font-semibold text-xl">{title}</div>

      {/* Date Time */}
      <div className="flex items-center space-x-2 text-xs mb-2">
        <div>{date}</div>
      </div>

      <div className="truncate text-sm">{description}</div>
    </button>
  );
};

export default Card;
