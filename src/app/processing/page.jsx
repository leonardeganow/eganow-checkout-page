"use client";
import React, { useEffect, useRef, useState } from "react";

import Pending from "../components/Pending";
import Success from "../components/Success";
import Failed from "../components/Failed";
import axios from "axios";
import dynamic from "next/dynamic";

function Page() {
  const [transactionStatus, setTransactionStatus] = useState("PENDING");
  const [savedTransactionId, setSavedTransactionId] = useState("");
  const [token, setToken] = useState("");
  const statusRef = useRef(transactionStatus);
  const [pKey, setPkey] = useState("");
  const [viewMode, setViewMode] = useState("");

  // FUNCTION TO CHECK TRANSACTION STATUS
  const getStats = async () => {
    const data = {
      token: token,
      transactionId: savedTransactionId,
      xAuth: localStorage.getItem("xauth"),
    };

    // console.log(data);
    try {
      const response = await axios.post("/api/transactionstatus/", data);
      return response.data.data.TransStatus;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getTokenData = async () => {
    try {
      const getData = await axios.get(`api/credentials/${pKey}`);
      console.log(getData.data.payment_view_mode);
      if (getData.data.token) {
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

  // console.log(transactionStatus);

  useEffect(() => {
    statusRef.current = transactionStatus;
    setSavedTransactionId(localStorage.getItem("transactionId"));
    setToken(localStorage.getItem("token"));
  }, [transactionStatus]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await getStats();
      setTransactionStatus(status);

      if (status === "SUCCESSFUL" || status === "FAILED") {
        clearInterval(interval);
      }

      console.log(status);
    }, 5000); // Check every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [savedTransactionId, token]);

  const renderStatusComponent = () => {
    switch (transactionStatus) {
      case "SUCCESSFUL":
        return <Success viewMode={viewMode} />;
      case "FAILED":
        return <Failed viewMode={viewMode} />;
      default:
        return <Pending />;
    }
  };

  return (
    <div className="w-full grid place-items-center overflow-hidden ">
      <div className="lg:w-[33%] w-[90%] sm:w-[60%] mt-10 sm:mt-0 rounded-lg drop-shadow-xl bg-white">
        {renderStatusComponent()}
      </div>
      ;
    </div>
  );
}

export default Page;
