"use client";
import React, { useEffect, useState } from "react";

// import { getTransactionStatus } from "../api/token/route";
import Pending from "../components/Pending";
import Success from "../components/Success";
import Failed from "../components/Failed";
import axios from "axios";

function Page() {
  const savedTransactionId = localStorage.getItem("transactionId");
  const token = localStorage.getItem("token");
  const [transactionStatus, setTransactionStatus] = useState("PENDING");

  // FUNCTION TO CHECK TRANSACTION STATUS
  const getStats = async () => {
    console.log(savedTransactionId);
    const data={
      token: token,
      transactionId : savedTransactionId
    }
    try {
      const response = await axios.post("/api/transactionstatus/",data)
      console.log(response.data.data)
      return response.data.data.TransStatus
    } catch (error) {
      console.error(error)
      return false
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await getStats();
      setTransactionStatus(status);
    }, 5000); // Check every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const renderStatusComponent = () => {
    switch (transactionStatus) {
      case "SUCCESSFUL":
        return <Success />;
      case "FAILED":
        return <Failed />;
      default:
        return <Pending />;
    }
  };

  return <div>{renderStatusComponent()}</div>;
}

export default Page;
