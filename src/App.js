import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import Content from "./Content";
import EditContent from "./EditContent";
import CreatePost from "./CreatePost";
import NoContent from "./NoContent";

export const MyContext = React.createContext();
const App = () => {
  const [menu, setMenu] = useState(true);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/",
          element: <NoContent />,
        },
        {
          path: "/:uuid",
          element: <Content />,
        },
        {
          path: "/:uuid/edit",
          element: <EditContent />,
        },
        {
          path: "/new",
          element: <CreatePost />,
        },
      ],
    },
  ]);
  return (
    <div className="mx-[2%] overflow-hidden h-screen">
      {/* Navbar */}
      <div className="flex justify-between mt-5 mb-10 h-[8vh]">
        <button
          onClick={() => setMenu(!menu)}
          className={`hover:bg-gray-600 p-3 rounded-sm ${
            !menu && "bg-gray-500 text-white"
          }`}
        >
          <RxHamburgerMenu className="text-2xl" />
        </button>
        <div className="text-center flex-1">
          <h1 className="font-semibold text-3xl">Lotion</h1>
          <div className="text-sm">Like Notion, but Worse</div>
        </div>
      </div>
      <MyContext.Provider value={menu}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </div>
  );
};

export default App;
