"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftNav from "./components/LeftNav";
import Image from "next/image";
import logo from "../../public/Eganowlogo.png";
import logo2 from "../../public/Eganowlogo2jpg.jpg";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Amount } from "./constants";
import { usePathname, useRouter,useParams } from "next/navigation";
import { Toaster } from "sonner";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Eganow payment page",
//   description: "payment page with card or mobile money",
// };

export default function RootLayout({ children }) {
  const [amount, setAmount] = useState("");
  const pathname = usePathname()



  const params = useParams();
  // console.log(params);
  const p_key = params.checkout;
  // console.log(params);
  // save key to session storage
  // sessionStorage.setItem("p_key", p_key);

  const getTokenData = async () => {
    try {
      const getData = await axios.get(`api/credentials/${p_key}`);
      // console.log(p_key);
      // console.log(getData.data);
      if (getData.data.token) {
        setAmount(getData.data.amount)
        // setToken(getData.data.token);
        // localStorage.setItem("token", getData.data.token);
        // localStorage.setItem("amount", getData.data.amount);
        // localStorage.setItem("xauth", getData.data.x_auth);
        // localStorage.setItem("callBack_url", getData.data.callback_url);
      }
    } catch (error) {
      console.log(error);
      // if(error.response.status == 500){
      //     toast.error('Token is expired')
      // }
    }
  };

    useEffect(() => {
   getTokenData()
  }, []);
  return (
    <html lang="en">
      <Toaster richColors position="top-center"/>
      {/* <p className="text-red-500">hello</p>
      <body className={inter.className}>{children}</body> */}
      <body className="grid place-items-center h-screen bg-[#304767] login-bg ">
        <div className="w-full grid place-items-center ">
          <div className="flex  lg:w-[33%] w-[90%] sm:w-[60%] mt-10 sm:mt-0  rounded-lg drop-shadow-xl bg-white ">
            <div className="  sm:min-w-[25%] w-[20%] bg-[#CF122B] text-white rounded-s-lg">
              <ul className="  flex flex-col   p-4  ">
                <li className="font-bold uppercase  hidden sm:block  py-2 my-2 pl-2">
                  pay with{" "}
                </li>
                {/* <hr className="border-gray-300" /> */}
                <LeftNav />
              </ul>
            </div>
            <div className="  w-full shadow-xl p-5 ">
              <div className="flex  justify-between items-center">
                <Image
                  src={logo}
                  className="hidden sm:block"
                  width={100}
                  alt="logo 1"
                />
                <Image
                  src={logo2}
                  className="block sm:hidden"
                  width={30}
                  alt="logo 2"
                />
              {pathname !== '/processing' && <div className="text-sm sm:text-base text-gray-600">
              
                  <p className="">
                    Pay{" "}
                    <span className="text-blue-500 font-medium">
                      GHS {amount}
                    </span>
                  </p>
                </div>}
              </div>
              {children}
            </div>
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
