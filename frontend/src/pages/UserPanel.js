import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaHeart, FaBars, FaShoppingCart } from "react-icons/fa";
import { RiFolderUploadFill } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import SummaryApi from "../common/API";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = async () => {
    const fetchDate = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method,
      credentials: "include",
    });

    const data = await fetchDate.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex sm:flex-row max-h-[calc(100vh-70px)] flex-col p-4 gap-4">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={` top-0 mt-4 overflow-y-scroll custom-scrollbar left-0 z-20 w-80 h-90 transition-transform  sm:translate-x-0 bg-gray-50 dark:bg-gray-800 ${
          isSidebarVisible ? "block" : "hidden"
        } sm:block`}
        aria-label="Sidebar"
      >
        <div className=" h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center ps-2.5 mb-5">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-24 h-24 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaCircleUser className="text-white text-4xl" />
            )}
            <h2 className="self-center ms-4 text-xl font-semibold text-white">
              {user?.name ? user?.name : "Admin"}
            </h2>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="my-account"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BsPersonCircle className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="wishlist"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaHeart className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="ms-3">Wishlist</span>
              </Link>
            </li>
            <li>
              <Link
                to="cart"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaShoppingCart className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="ms-3">Cart</span>
              </Link>
            </li>
            <li>
              <Link
                to="my-orders"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RiFolderUploadFill className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400" />
                <span className="ms-3">Orders</span>
              </Link>
            </li>
            <li>
              <button
                className="flex items-center p-2 text-red-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={handleLogout}
              >
                <FaPowerOff className="w-5 h-5 transition duration-75 dark:text-gray-400" />
                <span className="ms-3">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Content */}
      <main
        className={`bg-white min-h-[calc(100vh-130px)] sm:max-h-[calc(100vh-210px)] w-full m-4 rounded overflow-y-scroll custom-scrollbar ${
          isSidebarVisible ? "hidden" : "block"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserPanel;
