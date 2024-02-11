import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../provider/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../../common/loader/loader";
import RoomDeviceAllocationModal from "./roomDeviceAllocationModal";
import { BsFillDeviceSsdFill } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";

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

interface Room {
  user_id: string;
  device_id: string;
  room_name: string;
}

function ManageSmartDevices({}: Props) {
  const { token, userId } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAssignRoomModal, setShowAssignRoomModal] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [selectedDeviceName, setSelectedDeviceName] = useState("");
  const [freeRoom, setFreeRoom] = useState<Room[]>([]);

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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get<{ data: Room[] }>(
          `${process.env.REACT_APP_PUBLIC_API_URL}/api/getAllRooms`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRooms(response.data.data);
        setFreeRoom(
          response.data.data.filter(
            (room) => room.device_id === null || room.device_id === undefined
          )
        );
      } catch (error: any) {
        toast.error("Error fetching data:", error);
      }
    };
    fetchRooms();
  }, [token]);

  const findRoomAssigned = (deviceId: string) => {
    const room = rooms.find((room) => room.device_id === deviceId);
    return room ? room.room_name : "Not Assigned";
  };

  const isRoomAssigned = (deviceId: string) => {
    const room = rooms.find((room) => room.device_id === deviceId);
    return room !== undefined ? true : false;
  };

  const removeDeviceFromRoom = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/removeDeviceFromRoom`,
        {
          deviceId: selectedDeviceId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { success } = response.data;
      if (success) {
        toast.success("Device removed from room successfully");
      }
    } catch (error: any) {
      toast.error("Error fetching data:", error);
    }

    try {
      const response = await axios.get<{ data: Room[] }>(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/getAllRooms`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRooms(response.data.data);
      setFreeRoom(
        response.data.data.filter(
          (room) => room.device_id === null || room.device_id === undefined
        )
      );
    } catch (error: any) {
      toast.error("Error fetching data:", error);
    }
  };

  return (
    <div className="p-1 sm:p-4 sm:ml-64">
      {loading && <Loader />}
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
        <div className="border-2  border-gray-200 rounded-lg  flex flex-wrap gap-4 justify-center items-center p-1 sm:p-5">
          {devices.map((device, index) => (
            <div
              className="flex justify-center items-center space-x-8 p-2 border-2 border-gray-200 rounded-lg w-96"
              key={index}
            >
              <div className="hidden sm:block">
                <div className="flex items-center space-x-4 text-orange-500">
                  <img
                    src={`device.svg`}
                    alt="NoData"
                    width={35}
                    height={35}
                    className="w-28 h-1/2 object-cover rounded-md"
                  />
                  <span>{device.deviceName}</span>
                </div>
                <div className="mt-2 ml-16">
                  <img
                    src={`path.png`}
                    alt="NoData"
                    width={35}
                    height={35}
                    className="w-24 h-1/2 object-cover rounded-md"
                  />
                </div>
                <div className=" ml-4 flex flex-row-reverse items-center  text-orange-500">
                  <img
                    src={`home.svg`}
                    alt="NoData"
                    width={35}
                    height={35}
                    className="w-24 h-1/2 object-cover rounded-md"
                  />
                  <span className="mr-2">{findRoomAssigned(device._id)}</span>
                </div>
              </div>
              <div className="block sm:hidden">
                <span className="flex justify-start items-center space-x-2 mb-2">
                  <span>
                    <BsFillDeviceSsdFill />
                  </span>{" "}
                  <span>Device: {device.deviceName}</span>
                </span>
                <div className="flex items-center justify-center ">
                  <div className="border-b border-gray-400 w-full "></div>
                </div>
                <span className="flex justify-start items-center space-x-2 mt-2">
                  <span>
                    <MdMeetingRoom />
                  </span>
                  <span>Room: {findRoomAssigned(device._id)}</span>
                </span>
              </div>
              <div className="flex flex-col space-y-4">
                {isRoomAssigned(device._id) ? (
                  <>
                    <button
                      className="hover:bg-[#141414] bg-[#424141] text-white text-sm p-2 rounded"
                      onClick={() => {
                        setSelectedDeviceId(device._id);
                        setShowAssignRoomModal(true);
                        setSelectedDeviceName(device.deviceName);
                      }}
                    >
                      Change Room
                    </button>
                    <button
                      className="hover:bg-[#141414] bg-[#424141] text-white text-sm p-2 rounded"
                      onClick={() => {
                        setSelectedDeviceId(device._id);
                        removeDeviceFromRoom();
                      }}
                    >
                      Remove Room
                    </button>
                  </>
                ) : (
                  <button
                    className="hover:bg-[#141414] bg-[#424141] text-white text-sm p-2 rounded"
                    onClick={() => {
                      setSelectedDeviceId(device._id);
                      setShowAssignRoomModal(true);
                      setSelectedDeviceName(device.deviceName);
                    }}
                  >
                    Assign Room
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {showAssignRoomModal && (
        <RoomDeviceAllocationModal
          deviceName={selectedDeviceName}
          selectedDeviceId={selectedDeviceId}
          setShowAssignRoomModal={setShowAssignRoomModal}
          rooms={rooms}
          setRooms={setRooms}
          setFreeRoom={setFreeRoom}
          freeRoom={freeRoom}
        />
      )}
    </div>
  );
}

export default ManageSmartDevices;
