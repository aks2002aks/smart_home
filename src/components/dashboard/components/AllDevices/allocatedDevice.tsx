import axios from "axios";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useAuth } from "../../../../provider/authContext";
import toast from "react-hot-toast";
import Loader from "../../../common/loader/loader";
import { FaFan, FaLightbulb } from "react-icons/fa";
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

function AllocatedDevice({}: Props) {
  const { token } = useAuth();
  const [allocatedDevices, setAllocatedDevices] = useState<Device[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Device[] }>(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/getAllocatedDevices?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      const newData = response.data.data;
      setAllocatedDevices((prevData) => [...prevData, ...newData]);

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

  return (
    <div className="p-2 w-full mt-10">
      <div className="p-4 border-2  border-gray-200 rounded-lg w-full">
        <InfiniteScroll
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<Loader />}
          useWindow={false}
          threshold={100}
          getScrollParent={() =>
            document.querySelector(
              ".p-4.border-2.border-gray-200.rounded-lg.w-full"
            ) as HTMLElement
          }
        >
          <div className="flex flex-row justify-center items-center flex-wrap gap-8">
            {allocatedDevices.map((device, index) => (
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
                      >
                        <FaLightbulb size={25} className="text-black" />
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                          device.state.fan === 1 ? "bg-green-500" : "bg-red-700"
                        }`}
                      >
                        <FaFan size={25} className="text-black" />
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                          device.state.mis === 1 ? "bg-green-500" : "bg-red-700"
                        }`}
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
        {loading && <Loader />} {/* Display loader if loading state is true */}
      </div>
    </div>
  );
}

export default AllocatedDevice;
