import React, { useState } from "react";
import ReactQuill from "react-quill";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker/dist/DateTimePicker";

const CreatePost = () => {
  const titleRef = React.useRef();
  const descriptionRef = React.useRef();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const [dateValue, setDateValue] = useState(new Date());

  const createPost = () => {
    const items = JSON.parse(localStorage.getItem("data")) || [];
    const uuid = uuidv4();
    // let description = value.replace(/(<([^>]+)>)/gi, "");
    // description = description.replace(/&(nbsp|amp|quot|lt|gt);/g, " ");
    const newData = {
      uuid,
      name,
      description: value,
      date: dateValue.toUTCString(),
    };
    const appendedData = [newData, ...items];

    localStorage.setItem("data", JSON.stringify(appendedData));
    navigate(`/${uuid}`);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[80%]">
          <input
            ref={titleRef}
            autoFocus
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="Title"
            className="w-full py-3 text-2xl font-semibold outline-none"
          />

          {/* Date Time */}
          <div>
            <DateTimePicker onChange={setDateValue} value={dateValue} />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-[20%]">
          <button
            onClick={createPost}
            className="bg-green-300 px-5 py-1 mx-3 rounded-md hover:bg-green-500 hover:text-white"
          >
            Save
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-red-300 px-5 py-1 rounded-md hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
      <ReactQuill
        ref={descriptionRef}
        className="h-72"
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default CreatePost;
