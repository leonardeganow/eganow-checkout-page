import React, { useEffect, useState } from "react";
import success from "../../../public/sucess.gif";
import animation from "../../../public/Animation.json";
import Lottie from "react-lottie";
import Link from "next/link";
import Image from "next/image";

function Success(props) {
  const [url, setUrl] = useState("");
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setUrl(encodeURI(localStorage.getItem("callBack_url")));
    setTimeout(function () {
      //code goes here
      localStorage.removeItem("amount");
      localStorage.removeItem("token");
      localStorage.removeItem("xauth");
      localStorage.removeItem("transactionId");

      // window.location.href = `${url}&status=success`;
    }, 3000);
  }, []);

  const handleDoneClick = () => {
    // Notify the parent window that payment was successful
    window.parent.postMessage('successful', '*');
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-auto h-24 text-center flex justify-center items-center">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
      <p className="text-xl font-semibold py-2 text-green-500">
        Payment Successful !
      </p>
      <small className="text-center text-gray-400 p-3 mb-4">
        Thank you for your purchase. Please wait while we redirect you back to
        the merchant
      </small>
      <div className="mb-3">
        {props.viewMode === " MODAL" ? (
          <button
            onClick={handleDoneClick}
            // href={`${url}&status=success`}
            // href={{
            //   pathname: url,
            //   query: { status: "success" },
            // }}
            className="bg-blue-500 my-4 md:px-4 md:py-2 p-2 text-sm md:text-base text-white shadow rounded "
          >
            Return to Merchant
          </button>
        ) : (
          <Link
            onClick={() => {
              localStorage.removeItem("amount");
              localStorage.removeItem("token");
              localStorage.removeItem("xauth");
              localStorage.removeItem("transactionId");
            }}
            href={`${url}&status=success`}
            // href={{
            //   pathname: url,
            //   query: { status: "success" },
            // }}
            className="bg-blue-500 my-4 md:px-4 md:py-2 p-2 text-sm md:text-base text-white shadow rounded "
          >
            Return to Merchant
          </Link>
        )}
      </div>
    </div>
  );
}

export default Success;
