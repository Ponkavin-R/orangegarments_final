import React, { useState } from "react";
import { FaEdit, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import UserEdit from "../components/UserEdit";

const UserAccount = () => {
  const user = useSelector((state) => state?.user?.user);
  const [editUser, setEditUser] = useState(false);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-950 dark:text-blue-950">
          My Account
        </h1>
        <button
          className="flex items-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          onClick={() => setEditUser(true)}
          aria-label="Edit Profile"
        >
          <FaEdit className="w-5 h-5" />
          <span className="ml-2 hidden sm:inline">Edit Profile</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-50 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          {user?.profilepic ? (
            <img
              src={user?.profilepic}
              className="w-32 h-32 rounded-full text-red-600 object-cover"
              alt={user?.name}
            />
          ) : (
            <FaCircleUser className="w-32 h-32 text-red-600 dark:text-red-600" />
          )}
        </div>

        {/* User Information */}
        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
          <h2 className="text-2xl font-semibold text-red-600 dark:text-red-600">
            {user?.name || "Admin"}
          </h2>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FaEnvelope className="w-5 h-5 mr-2" />
              <span>{user?.email || "Not Provided"}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <FaPhone className="w-5 h-5 mr-2" />
              <span>{user?.contact || "Not Provided"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Example Section: Address */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Address
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.address || "No address provided."}
          </p>
        </div>

        {/* Example Section: Membership */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Membership
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.membership || "Standard Member"}
          </p>
        </div>
      </div>

      {/* UserEdit Modal */}
      {editUser && <UserEdit onClose={() => setEditUser(false)} />}
    </div>
  );
};

export default UserAccount;
