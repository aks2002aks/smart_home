import axios from "axios";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useAuth } from "../../../../provider/authContext";
import toast from "react-hot-toast";
import Loader from "../../../common/loader/loader";
import AllocateDeviceModal from "./allocateDeviceModal";

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

function UnAllocatedDevice({}: Props) {
  const { token } = useAuth();
  const [unAllocatedDevices, setUnAllocatedDevices] = useState<Device[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAllocateModal, setShowAllocateModal] = useState(false);
  const [deviceId, setDeviceId] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get<{ data: Device[] }>(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/getUnAllocatedDevices?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newData = response.data.data;
      setUnAllocatedDevices((prevData) => [...prevData, ...newData]);

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
        {showAllocateModal && (
          <AllocateDeviceModal
            deviceName={deviceName}
            deviceId={deviceId}
            setShowAllocateModal={setShowAllocateModal}
            setUnAllocatedDevices={setUnAllocatedDevices}
            unAllocatedDevices={unAllocatedDevices}
          />
        )}
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
            {unAllocatedDevices.map((device, index) => (
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
                </div>
                <div className="flex justify-center mt-2 items-center">
                  <button
                    className=" text-white px-4 py-2 bg-[#141414] rounded-lg hover:bg-[#424141]"
                    onClick={() => {
                      setDeviceId(device._id);
                      setShowAllocateModal(true);
                      setDeviceName(device.deviceName);
                    }}
                  >
                    Allocate Device
                  </button>
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

export default UnAllocatedDevice;
