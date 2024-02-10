import React, { useState } from "react";
import Loader from "../../../common/loader/loader";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../../provider/authContext";

interface Room {
  user_id: string;
  device_id: string;
  room_name: string;
}

type Props = {
  selectedDeviceId: string;
  deviceName: string;
  setShowAssignRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  setFreeRoom: React.Dispatch<React.SetStateAction<Room[]>>;
  freeRoom: Room[];
};

function RoomDeviceAllocationModal({
  setShowAssignRoomModal,
  deviceName,
  rooms,
  setRooms,
  selectedDeviceId,
  setFreeRoom,
  freeRoom,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  const { token } = useAuth();
  const handleRoomAssigning = async () => {
    setLoading(true);

    // first delete the device from the room if it is already assigned to a room
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
      console.log(response.data);
    } catch (error: any) {}

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/AddDeviceToRoom`,
        {
          deviceId: selectedDeviceId,
          roomName: selectedRoom,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      const { success } = response.data;
      if (success) {
        toast.success("Room assigned successfully");
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

    setShowAssignRoomModal(false);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center space-x-4">
        {loading && <Loader />}
        {/* hover:bg-[#282828] */}
        <div className="bg-[#424141] rounded-lg  w-96 h-58 p-4 text-white">
          <div
            className="text-orange-500 flex justify-center items-center mb-4 cursor-pointer"
            onClick={() => setShowAssignRoomModal(false)}
          >
            <IoCloseCircleOutline size={30} />
          </div>
          <p className="text-center">
            Allocating this device{" "}
            <span className="text-orange-500">{deviceName}</span> to Room
          </p>
          <div className="relative flex justify-center items-center mt-4">
            <div className="w-full">
              <select
                name="Room"
                id="Room"
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-900 bg-gray-300  border border-gray-200 rounded-lg focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 cursor-pointer"
              >
                <option value="">Unassigned</option>
                {freeRoom.map((room, index) => (
                  <option value={room.room_name} key={index}>
                    {room.room_name}
                  </option>
                ))}
              </select>
              <div className="flex justify-center items-center ">
                <button
                  className="bg-[#141414] hover:bg-[#302f2f] text-orange-500 text-sm p-2 rounded mt-4 "
                  onClick={handleRoomAssigning}
                >
                  Assign Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDeviceAllocationModal;
