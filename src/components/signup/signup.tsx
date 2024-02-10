import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../common/loader/loader";
import axios from "axios";

type Props = {};

function Signup({}: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
        toast.success("Signup Successful");
        navigate("/login");
      } else {
        throw new Error(message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || "Failed to Signup. Please try again.");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className=" container mx-auto pt-12 text-orange-500">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="lg:block hidden bg-cover max-w-md  justify-center mr-24">
            <img src={"/login.svg"} alt="LoginImage" width={300} height={300} />
          </div>

          <div className="flex items-center w-full  px-6 max-w-lg    pt-8 pb-4 lg:pt-0">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto pl-3">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    width={150}
                    height={150}
                    className="mr-4"
                  />
                </div>
                <div className="text-2xl text-center mb-5 font-bold cursor-default">
                  <span>SMART HOME</span>
                </div>
              </div>

              <div className="mt-8">
                <form onSubmit={handleFormSubmit}>
                  <div>
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
                      className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-400  border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                    />
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
                        className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-400  border border-gray-200 rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
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
                      Sign up
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400 cursor-default">
                  Already Have Account ?{" "}
                  <Link
                    to={"/login"}
                    className="text-orange-500 focus:outline-none focus:underline hover:underline"
                  >
                    Login
                  </Link>
                </p>

                <div className="flex items-center justify-center mt-6">
                  <div className="border-b border-gray-400 w-full mr-4"></div>
                  <div className="text-sm text-center text-gray-400">or</div>
                  <div className="border-b border-gray-400 w-full ml-4"></div>
                </div>

                <p className="mt-6 text-sm text-center text-gray-400 cursor-default">
                  Having Trouble To Register Account ? Email at{" "}
                  <span className="text-orange-500 cursor-text">
                    admin@SmartHome.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
