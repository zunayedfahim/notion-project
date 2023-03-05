import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Card from "./Card";
import { Link, useParams } from "react-router-dom";

const Sidebar = () => {
  let { uuid } = useParams();
  const data = JSON.parse(localStorage.getItem("data")) || [];

  return (
    <div className="w-[20%] mr-3 h-[92vh]">
      {/* Top */}
      <div className="flex justify-between mr-2 items-center h-[5vh]">
        <h1 className="text-xl font-semibold">Notes</h1>
        <Link to="/new">
          <div className="p-3 outline-none hover:bg-gray-600 hover:text-white">
            <AiOutlinePlus className="text-xl" />
          </div>
        </Link>
      </div>

      {/* Cards */}
      <div className="hover:overflow-y-auto h-[77vh]">
        {data &&
          data.map((item, index) => {
            return (
              <Link to={item.uuid} key={index}>
                <Card
                  title={item.name}
                  date={item.date}
                  description={item.description}
                  focused={item.uuid === uuid}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
