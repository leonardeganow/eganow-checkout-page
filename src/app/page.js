"use client";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "./defaultFormValues";
import { validationSchema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { GiTakeMyMoney } from "react-icons/gi";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/lib/styles.scss";
import { customAlphabet } from "nanoid";
import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function Home() {

  const router = useRouter();

  useEffect(() => {
    // Retrieve the path from session storage
    const dynamicPath = sessionStorage.getItem('p_key');

    // If a dynamic path is found, redirect to it
    if (dynamicPath) {
      router.replace(`/${dynamicPath}`);
    } else {
      console.warn('No dynamic path found in session storage.');
    }
  }, [router]);



  return (
    <div className="text-center">Loading...</div>
  );
}
