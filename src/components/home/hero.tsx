import React from "react";
import { LuLayoutTemplate } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  const listUsers = [
    {
      name: "Users",
      number: "2k",
      icon: <FaUserCheck size={24} />,
    },
    {
      name: "Device Sold",
      number: "10k",
      icon: <FaWpforms size={24} />,
    },
    {
      name: "Device Created",
      number: "50k",
      icon: <LuLayoutTemplate size={24} />,
    },
  ];

  return (
    <div className="max-w-screen-xl mt-16 px-8 xl:px-16 mx-auto" id="about">
      <div className="grid grid-flow-row md:grid-flow-col grid-rows-0 md:grid-rows-1 md:grid-cols-2 gap-8 py-6 md:py-16">
        <div className=" flex flex-col justify-center items-start row-start-2 md:row-start-1">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
            <strong>Smart Home:</strong> Where AI Meets Every Home!
          </h1>
          <p className="text-black-500 mt-4 mb-6">
            Experience the future with Smart Homes: where technology seamlessly
            integrates into everyday life, adapting to your needs. From
            automated lighting to AI-powered assistants, enjoy personalized
            comfort and convenience. Enhance security, optimize energy usage,
            and embrace sustainability. Welcome to a world where homes are not
            just smart – they're brilliant.
          </p>

          <Link
            to={"/dashboard"}
            className="bg-orange-500 p-3 rounded-2xl text-white hover:bg-orange-700"
          >
            Get Started
          </Link>
        </div>
        <div className="flex w-full">
          <div className=" w-full">
            <img
              src={"home_page.png"}
              alt="homeimage"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="relative w-full flex">
        <div className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          {listUsers.map((listUser, index) => (
            <div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  <div className="h-6 w-6">{listUser.icon}</div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {listUser.number}+
                  </p>
                  <p className="text-lg text-black-500">{listUser.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
