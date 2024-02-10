import React from "react";
import UnAllocatedDevice from "../AllDevices/unAllocatedDevice";
import AllocatedDevice from "../AllDevices/allocatedDevice";

type Props = {};

function AllocateSmartDevice({}: Props) {
  const [activeTab, setActiveTab] = React.useState("UnAllocated Devices");
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2  border-gray-200 rounded-lg">
        <div className="flex flex-col justify-center items-center text-orange-500">
          <div className="block  bg-cover max-w-md  justify-center mt-10">
            <img
              src={"/allocate_device.svg"}
              alt="LoginImage"
              width={350}
              height={350}
            />
          </div>
          {/* {} */}

          <div className="text-sm font-medium text-center border-b  text-gray-400 border-gray-700 mt-10">
            <ul className="flex flex-wrap -mb-px cursor-pointer">
              <li
                className=""
                onClick={() => setActiveTab("Allocated Devices")}
              >
                <p
                  className={`inline-block p-4 00 border-b-2  rounded-t-lg ${
                    activeTab === "Allocated Devices"
                      ? "text-blue-500 border-blue-500"
                      : " hover:border-gray-300 hover:text-gray-300"
                  }  `}
                >
                  Allocated Devices
                </p>
              </li>
              <li
                className=""
                onClick={() => setActiveTab("UnAllocated Devices")}
              >
                <p
                  className={`inline-block p-4 00 border-b-2  rounded-t-lg ${
                    activeTab === "UnAllocated Devices"
                      ? "text-blue-500 border-blue-500"
                      : " hover:border-gray-300 hover:text-gray-300"
                  }  `}
                  aria-current="page"
                >
                  UnAallocated Devices
                </p>
              </li>
            </ul>
          </div>

          {/* {} */}

          {activeTab === "UnAllocated Devices" && <UnAllocatedDevice />}
          {activeTab === "Allocated Devices" && <AllocatedDevice />}

          {/* {} */}
        </div>
      </div>
    </div>
  );
}

export default AllocateSmartDevice;
