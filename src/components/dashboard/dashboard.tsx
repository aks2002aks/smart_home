import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import AdminDashboardHome from "./components/AdminDashboard/home";
import RegisterUser from "./components/AdminDashboard/registerUser";
import AddSmartDevice from "./components/AdminDashboard/addSmartDevice";
import AllocateSmartDevice from "./components/AdminDashboard/allocateSmartDevice";
import AdminViewAllSmartDevices from "./components/AdminDashboard/viewAllSmartDevices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/authContext";
import UserDashboardHome from "./components/UserDashboard/home";
import CreateRoom from "./components/UserDashboard/createRoom";
import ManageSmartDevices from "./components/UserDashboard/manageSmartDevices";
import UserViewAllSmartDevices from "./components/UserDashboard/viewAllSmartDevices";

type Props = {};

function Dashboard({}: Props) {
  const { userRole } = useAuth();
  const naviagte = useNavigate();
  const [openAdminDashboard, setOpenAdminDashboard] = React.useState(false);
  const [openUserDashboard, setOpenUserDashboard] = React.useState(false);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [ActiveAdminDashboardTab, setActiveAdminDashboardTab] =
    React.useState("Admin Dashboard");
  const [ActiveUserDashboardTab, setActiveUserDashboardTab] =
    React.useState("User Dashboard");
  const asideRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        asideRef.current &&
        !asideRef.current.contains(event.target as Node)
      ) {
        setOpenSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [asideRef]);

  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        onClick={() => setOpenSidebar((prev) => !prev)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          openSidebar ? "translate-x-0" : ""
        }`}
        aria-label="Sidebar"
        ref={asideRef}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#282828] font-medium">
          <div
            className="text-2xl text-center mb-10 font-bold cursor-pointer"
            onClick={() => naviagte("/")}
          >
            SMART HOME
          </div>
          {userRole === "Admin" && (
            <div
              className="flex items-center justify-between p-2 text-orange-500 rounded-lg  hover:bg-black hover:bg-opacity-40 cursor-pointer"
              onClick={() => {
                setOpenAdminDashboard((prev) => !prev);
                setActiveAdminDashboardTab("Admin Dashboard");
              }}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-500 transition duration-75   "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Admin Dashboard</span>
              </div>

              <div className={`${openAdminDashboard && "rotate-180"}`}>
                <IoArrowDownCircleOutline size={20} />
              </div>
            </div>
          )}

          {openAdminDashboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pl-9 p-2 space-y-2 pt-4 text-opacity-70 text-white"
            >
              <div
                className="hover:bg-black hover:bg-opacity-40 cursor-pointer p-2 rounded-lg"
                onClick={() => {
                  setActiveAdminDashboardTab("Register User");
                  setOpenSidebar(false);
                }}
              >
                Register User
              </div>
              <div
                className="hover:bg-black hover:bg-opacity-40 cursor-pointer p-2 rounded-lg"
                onClick={() => {
                  setActiveAdminDashboardTab("Add Smart Device");
                  setOpenSidebar(false);
                }}
              >
                Add Smart Device
              </div>
              <div
                className="hover:bg-black hover:bg-opacity-40 cursor-pointer p-2 rounded-lg"
                onClick={() => {
                  setActiveAdminDashboardTab("Allocate Smart Device");
                  setOpenSidebar(false);
                }}
              >
                Allocate Smart Device
              </div>
              <div
                className="hover:bg-black hover:bg-opacity-40 cursor-pointer p-2 rounded-lg"
                onClick={() => {
                  setActiveAdminDashboardTab("View All Smart Devices");
                  setOpenSidebar(false);
                }}
              >
                View All Smart Devices
              </div>
            </motion.div>
          )}

          {userRole === "Customer" && (
            <div
              className="flex items-center justify-between p-2 text-orange-500 rounded-lg  hover:bg-black hover:bg-opacity-40 cursor-pointer"
              onClick={() => {
                setOpenUserDashboard((prev) => !prev);
                setActiveUserDashboardTab("User Dashboard");
              }}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-orange-500 transition duration-75   "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">User Dashboard</span>
              </div>

              <div className={`${openUserDashboard && "rotate-180"}`}>
                <IoArrowDownCircleOutline size={20} />
              </div>
            </div>
          )}

          {openUserDashboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pl-9 p-2 space-y-2 pt-4 text-opacity-70 text-white"
            >
              <div
                className="hover:bg-black hover:bg-opacity-40 cursor-pointer p-2 rounded-lg"
                onClick={() => {
                  setActiveUserDashboardTab("Create Room");
                  setOpenSidebar(false);
                }}
              >
                Create Room
              </div>
              <div
                className="hover:bg-black hover:bg-opacity-40 cursor-pointer p-2 rounded-lg"
                onClick={() => {
                  setActiveUserDashboardTab("Manage Smart Device");
                  setOpenSidebar(false);
                }}
              >
                Manage Smart Device
              </div>
              <div
                className="hover:bg-black hover:bg-opacity-40 cursor-pointer p-2 rounded-lg"
                onClick={() => {
                  setActiveUserDashboardTab("View All Smart Devices");
                  setOpenSidebar(false);
                }}
              >
                View All Smart Devices
              </div>
            </motion.div>
          )}
        </div>
      </aside>

      {userRole === "Admin" ? (
        <>
          {ActiveAdminDashboardTab === "Admin Dashboard" && (
            <AdminDashboardHome
              setOpenAdminDashboard={setOpenAdminDashboard}
              setActiveAdminDashboardTab={setActiveAdminDashboardTab}
            />
          )}
          {ActiveAdminDashboardTab === "Register User" && <RegisterUser />}
          {ActiveAdminDashboardTab === "Add Smart Device" && <AddSmartDevice />}
          {ActiveAdminDashboardTab === "Allocate Smart Device" && (
            <AllocateSmartDevice />
          )}
          {ActiveAdminDashboardTab === "View All Smart Devices" && (
            <AdminViewAllSmartDevices />
          )}
        </>
      ) : (
        <>
          {ActiveUserDashboardTab === "User Dashboard" && (
            <UserDashboardHome
              setOpenUserDashboard={setOpenUserDashboard}
              setActiveUserDashboardTab={setActiveUserDashboardTab}
            />
          )}
          {ActiveUserDashboardTab === "Create Room" && <CreateRoom />}
          {ActiveUserDashboardTab === "Manage Smart Device" && (
            <ManageSmartDevices />
          )}
          {ActiveUserDashboardTab === "View All Smart Devices" && (
            <UserViewAllSmartDevices />
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
