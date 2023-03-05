import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";

import DateTimePicker from "react-datetime-picker";

const EditContent = () => {
  const titleRef = React.useRef();
  let { uuid } = useParams();
  const data = JSON.parse(localStorage.getItem("data")) || [];
  const fetchData = data.find((a) => a.uuid === uuid);
  const [title, setTitle] = useState(fetchData?.name);
  const [value, setValue] = useState(fetchData?.description);
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(new Date(fetchData?.date));

  const deletePost = () => {
    const flag = window.confirm("Are you sure you want to delete this post?");
    if (flag) {
      let index = data.findIndex((a) => a.uuid === fetchData.uuid);
      data.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(data));
      navigate(`/${data[0]?.uuid}`);
    }
  };

  const editPost = () => {
    let description = value.replace(/(<([^>]+)>)/gi, "");
    description = description.replace(/&(nbsp|amp|quot|lt|gt);/g, " ");
    const newData = {
      uuid,
      name: title,
      description,
      date: dateValue.toUTCString(),
    };

    data.forEach((element, index) => {
      if (element.uuid === newData.uuid) {
        data[index] = newData;
      }
    });

    localStorage.setItem("data", JSON.stringify(data));
    data.length === 0 ? navigate("/") : navigate(`/${data[0].uuid}`);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[80%]">
          <input
            ref={titleRef}
            autoFocus
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            placeholder="Title"
            className="w-full py-3 text-2xl font-semibold outline-none"
          />

          {/* Date Time */}
          <div>
            <DateTimePicker
              className="outline-none rounded"
              onChange={setDateValue}
              value={dateValue}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-[20%]">
          <button
            onClick={editPost}
            className="bg-green-300 px-5 py-1 mx-3 rounded-md hover:bg-green-500 hover:text-white"
          >
            Save
          </button>

          <button
            onClick={deletePost}
            className="bg-red-300 px-5 py-1 rounded-md hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
      <ReactQuill
        className="h-[55vh] mt-2"
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default EditContent;
