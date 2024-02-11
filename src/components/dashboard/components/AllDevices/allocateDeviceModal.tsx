import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../../../../provider/authContext";
import { IoCloseCircleOutline } from "react-icons/io5";
import Loader from "../../../common/loader/loader";

type Props = {
  deviceName: string;
  deviceId: string;
  setShowAllocateModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUnAllocatedDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  unAllocatedDevices: Device[];
};

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

interface User {
  _id: string;
  username: string;
  password: string;
  role: string;
}

function AllocateDeviceModal({
  deviceName,
  setShowAllocateModal,
  deviceId,
  setUnAllocatedDevices,
  unAllocatedDevices,
}: Props) {
  const { token } = useAuth();
  const [searchUsername, setSearchUsername] = React.useState("");
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSearchUsername = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      // Call your function here
      SearchUsername();
    }
  };

  const handleDeviceAllocate = async (userId: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/allocateDevice`,
        { deviceId, userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { success, message } = response.data;
      if (!success) {
        throw new Error(message);
      }
      toast.success("Device Allocated Successfully");
      setShowAllocateModal(false);
      setUnAllocatedDevices((prevDevices) =>
        prevDevices.filter((device) => device._id !== deviceId)
      );
    } catch (error: any) {
      toast.error(error.message || "Failed to Signup. Please try again.");
    }
    setLoading(false);
  };

  const SearchUsername = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PUBLIC_API_URL}/api/serachUsername`,
        { searchUsername },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { success, message, users } = response.data;
      if (!success) {
        throw new Error(message);
      }
      setUsers(users);
    } catch (error: any) {
      toast.error(error.message || "Failed to Signup. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
      <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center space-x-4">
        {loading && <Loader />}
        {/* hover:bg-[#282828] */}
        <div className="bg-[#424141] rounded-lg  w-96 h-96 p-4 text-white">
          <div
            className="text-orange-500 flex justify-center items-center mb-4 cursor-pointer"
            onClick={() => setShowAllocateModal(false)}
          >
            <IoCloseCircleOutline size={30} />
          </div>
          <p className="text-center">
            Allocating this device{" "}
            <span className="text-orange-500">{deviceName}</span> to
          </p>
          <div
            className="relative flex justify-center items-center mt-4"
            onKeyDown={handleSearchUsername}
          >
            <input
              type="text"
              placeholder="Enter a Username"
              className="p-2 w-full rounded-lg bg-gray-300 text-black"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
            />
            <FiSearch
              className="absolute end-3 w-6 h-6 text-gray-400 cursor-pointer"
              onClick={SearchUsername}
            />
          </div>

          {users &&
            users.map((user) => (
              <div className="flex justify-between items-center mt-4">
                <p>{user.username}</p>
                <button
                  className="bg-[#141414] p-2 rounded-lg w-1/4 text-white"
                  onClick={() => handleDeviceAllocate(user._id)}
                >
                  Allocate
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllocateDeviceModal;
