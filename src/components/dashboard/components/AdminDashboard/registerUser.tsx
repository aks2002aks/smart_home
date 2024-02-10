import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Loader from "../../../common/loader/loader";
import axios from "axios";

type Props = {};

function RegisterUser({}: Props) {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Customer");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/Signup`,
        { username, password }
      );
      const { success, message } = response.data;

      if (success) {
        toast.success("User Registered Successfully");
      } else {
        throw new Error(message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || "Failed to Register. Please try again.");
    }
  };

  const fetchRandomWord = async () => {
    try {
      const response = await axios.get(
        "https://random-word-api.herokuapp.com/word"
      );
      const word = response.data[0];
      return word;
    } catch (error: any) {
      throw new Error("Failed to fetch random word.");
    }
  };

  const generateUsername = async () => {
    try {
      const word = await fetchRandomWord();
      const username = word.charAt(0).toUpperCase() + word.slice(1);
      return username;
    } catch (error: any) {
      throw new Error("Failed to generate username.");
    }
  };

  const generateUsernamePassword = async () => {
    setLoading(true);
    const randomUsername = await generateUsername();
    const randomPassword = Math.random().toString(36).substring(4);
    setUsername(randomUsername);
    setPassword(randomPassword);
    setLoading(false);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2  border-gray-200 rounded-lg h-[95vh]">
        {loading && <Loader />}

        <div className="flex flex-col justify-center items-center text-orange-500">
          <div className="block bg-cover max-w-md  justify-center mt-10">
            <img
              src={"/add_user.svg"}
              alt="LoginImage"
              width={300}
              height={300}
            />
          </div>

          <div className="flex items-center w-full  px-6 max-w-lg    pt-8 pb-4 lg:pt-0">
            <div className="flex-1">
              <div className="mt-8">
                <form onSubmit={handleFormSubmit}>
                  <div className="flex  space-x-8 ">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm text-gray-400 "
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-300  border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        required
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm text-gray-400 "
                      >
                        Role
                      </label>
                      <select
                        name="role"
                        id="role"
                        value={role}
                        onChange={handleRoleChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-300  border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 cursor-pointer"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Customer">Customer</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-400 "
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Your Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-300  border border-gray-200 rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                      >
                        {showPassword ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide transition-colors duration-300 transform bg-[#282828] rounded-lg hover:bg-[#424141] focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                      Register User
                    </button>
                  </div>

                  <div className="flex items-center justify-center mt-6">
                    <div className="border-b border-gray-400 w-full "></div>
                  </div>

                  <div className="mt-6" onClick={generateUsernamePassword}>
                    <div className="w-full px-4 py-2 tracking-wide transition-colors duration-300 transform bg-[#282828] rounded-lg hover:bg-[#424141] focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50 text-center cursor-pointer">
                      Generate Random User Credentials
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
