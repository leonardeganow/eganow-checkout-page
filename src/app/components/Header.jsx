import Image from 'next/image'
import React from 'react'
import logo from "../../../public/Eganowlogo.png";
import logo2 from "../../../public/Eganowlogo2jpg.jpg";
import { ColorRing } from 'react-loader-spinner';

function Header(props) {
  return (
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
    {props.pathname !== "/processing" && (
      <div className="text-sm sm:text-base text-gray-600">
        {props.loader ? (
          <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={[
              "#e15b64",
              "#f47e60",
              "#f8b26a",
              "#abbd81",
              "#849b87",
            ]}
          />
        ) : (
          <p className="">
            Pay{" "}
            <span className="text-blue-500 font-medium">
             {props.currency} {props.amount}
            </span>
          </p>
        )}
      </div>
    )}
  </div>
  )
}

export default Header