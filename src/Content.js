import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import parse from "html-react-parser";

const Content = () => {
  let { uuid } = useParams();
  const data = JSON.parse(localStorage.getItem("data")) || [];
  const fetchData = data.find((a) => a.uuid === uuid) || [];
  const navigate = useNavigate();
  const [value, setValue] = useState(fetchData?.description);

  const deletePost = () => {
    const flag = window.confirm("Are you sure you want to delete this post?");
    if (flag) {
      let index = data.findIndex((a) => a.uuid === fetchData.uuid);
      data.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(data));
      data.length === 0 ? navigate("/") : navigate(`/${data[0].uuid}`);
    }
  };
  return fetchData ? (
    <div>
      <div className="flex justify-between">
        <div className="w-[80%]">
          <div
            autoFocus
            className="w-full py-3 text-2xl font-semibold outline-none"
          >
            {fetchData?.name}
          </div>

          {/* Date Time */}
          <div className="flex items-center space-x-2">{fetchData.date}</div>
        </div>

        {/* Buttons */}
        <div className="w-[20%]">
          <Link to="edit">
            <button className="bg-blue-300 px-5 py-1 mx-3 rounded-md hover:bg-blue-500 hover:text-white">
              Edit
            </button>
          </Link>

          <button
            onClick={deletePost}
            className="bg-red-300 px-5 py-1 rounded-md hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-5">{parse(fetchData?.description)}</div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Content;
