"use client";
import "./globals.css";
import LeftNav from "./components/LeftNav";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import axios from "axios";

export default function RootLayout({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [pKey, setPkey] = useState("");
  const [viewMode, setViewMode] = useState("");

  const getTokenData = async () => {
    try {
      const getData = await axios.get(`api/credentials/${pKey}`);
      if (getData.data.token) {
        setCurrency(getData.data.currency);
        setViewMode(getData.data.payment_view_mode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenData();
    setPkey(sessionStorage.getItem("p_key"));
  }, [pKey]);
  return (
    <html lang="en">
      <Toaster richColors position="top-center" />
      <body
        className={`grid place-items-center  ${
          viewMode === "MODAL" ? " bg-transparent" : " bg-[#304767] login-bg h-screen"
        } `}
      >
        <div className="w-full grid place-items-center ">
          <div className="flex  lg:w-[33%] w-[90%] sm:w-[60%] mt-10 sm:mt-0  rounded-lg drop-shadow-xl bg-white ">
            {currency == "GHS" && (
              <div className="  sm:min-w-[25%] w-[20%] bg-[#cc042bed] text-white rounded-s-lg">
                <ul className="  flex flex-col   p-4  ">
                  <li className="font-bold   hidden sm:block  py-2 my-2 pl-2">
                    Pay with{" "}
                  </li>
                  <LeftNav />
                </ul>
              </div>
            )}
            <div className="  w-full shadow-xl p-5 ">{children}</div>
          </div>
          <p className="text-gray-300 pt-5 font-thin inline-flex items-center gap-2">
            <FaLock />
            Secured by <span className="font-bold shadow-xl">Eganow</span>
          </p>
        </div>
      </body>
    </html>
  );
}
