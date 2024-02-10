import React, { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../../../provider/authContext";
import Loader from "../../../common/loader/loader";
import axios from "axios";

type Props = {};

function AddSmartDevice({}: Props) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deviceName, setdeviceName] = useState("");

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/addDevice`,
        { deviceName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { success, message } = response.data;

      if (success) {
        toast.success("Device Added Successfully.");
      } else {
        throw new Error(message);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || "Failed to add device.");
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

  const generateDeviceName = async () => {
    try {
      setLoading(true);
      const word = await fetchRandomWord();
      const username = word.charAt(0).toUpperCase() + word.slice(1);
      setdeviceName(username);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || "Failed to generate username.");
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2  border-gray-200 rounded-lg h-[95vh]">
        {loading && <Loader />}

        <div className="flex flex-col justify-center items-center text-orange-500">
          <div className="block  bg-cover max-w-md  justify-center mt-10">
            <img
              src={"/add_device.svg"}
              alt="LoginImage"
              width={350}
              height={350}
            />
          </div>

          <div className="flex items-center w-full  px-6 max-w-lg    pt-8 pb-4 lg:pt-0">
            <div className="flex-1">
              <div className="mt-8">
                <form onSubmit={handleFormSubmit}>
                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm text-gray-400 "
                      >
                        Device Name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        name="deviceName"
                        id="deviceName"
                        value={deviceName}
                        onChange={(e) => setdeviceName(e.target.value)}
                        placeholder="Your deviceName"
                        className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-300  border border-gray-200 rounded-lg  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide transition-colors duration-300 transform bg-[#282828] rounded-lg hover:bg-[#424141] focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                      Add Smart Device
                    </button>
                  </div>

                  <div className="flex items-center justify-center mt-6">
                    <div className="border-b border-gray-400 w-full "></div>
                  </div>

                  <div className="mt-6" onClick={generateDeviceName}>
                    <div className="w-full px-4 py-2 tracking-wide transition-colors duration-300 transform bg-[#282828] rounded-lg hover:bg-[#424141] focus:outline-none focus:bg-gray-400 focus:ring focus:ring-gray-300 focus:ring-opacity-50 text-center cursor-pointer">
                      Generate Random Device Name
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

export default AddSmartDevice;
