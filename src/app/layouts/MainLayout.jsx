import React from "react";
import LeftNav from "../components/LeftNav";
import { FaLock } from "react-icons/fa";
import Header from "../components/Header";

function MainLayout({ children, viewMode, currency,pathname,loader,amount }) {
  return (
    <div
      className={`grid place-items-center ${
        viewMode !== "MODAL" ? "login-bg bg-[#304767] h-screen" : ""
      }`}
    >
      <div className="w-full grid place-items-center">
        <div className="flex lg:w-[33%] w-[90%] sm:w-[60%] mt-10 sm:mt-0 rounded-lg drop-shadow-xl bg-white">
          {currency === "GHS" && (
            <div className="sm:min-w-[25%] w-[20%] bg-[#cc042bed] text-white rounded-s-lg">
              <ul className="flex flex-col p-4">
                <li className="font-bold hidden sm:block py-2 my-2 pl-2">
                  Pay with{" "}
                </li>
                <LeftNav />
              </ul>
            </div>
          )}
          <div className="w-full shadow-xl p-5">
            <Header
              pathname={pathname}
              loader={loader}
              currency={currency}
              amount={amount}
            />
            {children}
          </div>
        </div>
        <p className="text-gray-300 pt-5 font-thin inline-flex items-center gap-2">
          <FaLock />
          Secured by <span className="font-bold shadow-xl">Eganow</span>
        </p>
      </div>
    </div>
  );
}

export default MainLayout;
