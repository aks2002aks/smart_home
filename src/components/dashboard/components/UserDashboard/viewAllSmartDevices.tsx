import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useAuth } from "../../../../provider/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../../common/loader/loader";
import { FaFan } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa6";
import { GiPowerGenerator } from "react-icons/gi";

type Props = {};

interface Device {
  _id: string;
  alloted_to_user: string;
  deviceName: string;
  state: {
    light: number;
    fan: number;
    mis: number;
  };
}

function ViewAllSmartDevices({}: Props) {
  const { token, userId } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Device[] }>(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/getAllDevices?page=${page}&userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      const newData = response.data.data;
      setDevices((prevData) => [...prevData, ...newData]);

      if (newData.length === 0) {
        setHasMore(false);
      }
    } catch (error: any) {
      toast.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = (page: number) => {
    fetchData(page);
  };

  const handleStateChange = async (deviceType: string, deviceId: string) => {
    if (deviceType === "light") {
      devices.map((device) => {
        if (device._id === deviceId) {
          if (device.state.light === 1) {
            device.state.light = 0;
          } else {
            device.state.light = 1;
          }
        }
      });
    } else if (deviceType === "fan") {
      devices.map((device) => {
        if (device._id === deviceId) {
          if (device.state.fan === 1) {
            device.state.fan = 0;
          } else {
            device.state.fan = 1;
          }
        }
      });
    } else if (deviceType === "mis") {
      devices.map((device) => {
        if (device._id === deviceId) {
          if (device.state.mis === 1) {
            device.state.mis = 0;
          } else {
            device.state.mis = 1;
          }
        }
      });
    }
    setDevices([...devices]);
    const newState = devices.find((device) => device._id === deviceId)?.state;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/changeDeviceState`,
        {
          deviceId,
          newState,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error("Error changing state:", error);
    }
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2  border-gray-200 rounded-lg ">
        <div className="flex p-10  gap-8 justify-center items-center">
          <div className="flex flex-col gap-4 ">
            <div className="flex items-center">
              <div
                className={` w-10 h-10 rounded-full flex items-center justify-center ${"bg-red-700"}`}
              >
                <FaLightbulb size={25} className="text-black" />
              </div>
              <label className="text-md text-orange-500 ml-2">
                Light in Off State
              </label>
            </div>
            <div className="flex items-center">
              <div
                className={` w-10 h-10 rounded-full flex items-center justify-center ${"bg-red-700"}`}
              >
                <FaFan size={25} className="text-black" />
              </div>
              <label className="text-md text-orange-500 ml-2">
                Fan in Off State
              </label>
            </div>
            <div className="flex items-center">
              <div
                className={` w-10 h-10 rounded-full flex items-center justify-center ${"bg-red-700"}`}
              >
                <GiPowerGenerator size={25} className="text-black" />
              </div>
              <label className="text-md text-orange-500 ml-2">
                Generator in Off State
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${"bg-green-700"}`}
              >
                <FaLightbulb size={25} className="text-black" />
              </div>
              <label className="text-md text-orange-500 ml-2">
                Light in On State
              </label>
            </div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${"bg-green-700"}`}
              >
                <FaFan size={25} className="text-black" />
              </div>
              <label className="text-md text-orange-500 ml-2">
                Fan in On State
              </label>
            </div>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${"bg-green-700"}`}
              >
                <GiPowerGenerator size={25} className="text-black" />
              </div>
              <label className="text-md text-orange-500 ml-2">
                Generator in On State
              </label>
            </div>
          </div>
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<Loader />}
          threshold={100}
          useWindow={false}
          getScrollParent={() =>
            document.querySelector(
              ".p-4.border-2.border-gray-200.rounded-lg.w-full"
            ) as HTMLElement
          }
        >
          <div className="flex flex-row justify-center items-center flex-wrap gap-8">
            {devices.map((device, index) => (
              <div key={index} className="  w-72 h-72 bg-[#282828] rounded-md">
                <img
                  src={`https://source.unsplash.com/random/?${device.deviceName},gadgets`}
                  alt="NoData"
                  width={100}
                  height={100}
                  className="w-72 h-1/2 object-cover rounded-md"
                />
                <div className="p-4">
                  <p className="text-lg font-semibold text-white">
                    {device.deviceName}
                  </p>
                  <p className="text-sm text-gray-400">
                    Alloted to: {device.alloted_to_user}
                  </p>
                  <div className="">
                    <div className="flex justify-center items-center mt-5 gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                          device.state.light === 1
                            ? "bg-green-500"
                            : "bg-red-700"
                        }`}
                        onClick={() => handleStateChange("light", device._id)}
                      >
                        <FaLightbulb size={25} className="text-black" />
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                          device.state.fan === 1 ? "bg-green-500" : "bg-red-700"
                        }`}
                        onClick={() => handleStateChange("fan", device._id)}
                      >
                        <FaFan size={25} className="text-black" />
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                          device.state.mis === 1 ? "bg-green-500" : "bg-red-700"
                        }`}
                        onClick={() => handleStateChange("mis", device._id)}
                      >
                        <GiPowerGenerator size={25} className="text-black" />{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default ViewAllSmartDevices;
