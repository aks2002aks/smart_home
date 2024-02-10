import React from "react";

type Props = {
  setOpenAdminDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveAdminDashboardTab: React.Dispatch<React.SetStateAction<string>>;
};

function AdminDashboardHome({
  setOpenAdminDashboard,
  setActiveAdminDashboardTab,
}: Props) {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 rounded-lg ">
        <div className="flex items-center justify-center h-48 mb-10 rounded bg-[#282828] ">
          <img
            src={`https://source.unsplash.com/random/?gadgets`}
            alt="smartDeviceImg"
            className="h-48 w-full object-cover opacity-70"
          />
        </div>
        <div className="grid grid-cols-2 gap-10 ">
          {[
            "Register User",
            "Add Smart Device",
            "Allocate Smart Device",
            "View All Smart Devices",
            "Coming Soon....",
            "Coming Soon....",
          ].map((item, index) => (
            <div
              className="relative flex items-center justify-center rounded bg-[#282828] h-28 bg-opacity-10 transition duration-300 ease-in-out transform hover:bg-opacity-90 hover:scale-105 cursor-pointer"
              key={index}
              onClick={() => {
                setOpenAdminDashboard(true);
                setActiveAdminDashboardTab(item);
              }}
            >
              <img
                src={`https://source.unsplash.com/random/?${item}`}
                alt="Backgroundimage"
                className="absolute top-0 left-0 w-full h-28 object-cover opacity-30"
              />
              <div className="flex flex-col ">
                <svg
                  className="w-3.5 h-3.5 mx-auto text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
                <p className="text-2xl text-white text-center mt-auto">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardHome;
