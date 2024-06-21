"use client";

import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Select from "react-dropdown-select";

import { defaultFormValues } from "./defaultFormValues";
import { validationSchema } from "./validationSchema";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdMobileScreenShare } from "react-icons/md";

import { customAlphabet } from "nanoid";
// import { getAccHolderInfo, makeCollection } from "../api/token/route";
import { useRouter } from "next/navigation";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
import Header from "../components/Header";

const options = [
  {
    value: "MTNMOMGH0233SC1001000101",
    label: "MTN",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/MTN-logo.jpg/1121px-MTN-logo.jpg",
  },
  {
    value: "VODCASGH0233SC10010001",
    label: "TELECEL",
    logo: "https://www.telecel.com.gh/img/Telecel-Icon-Red.png",
  },
];

function Page() {
  const router = useRouter();
  // INITIALIZE NANOID
  const nanoid = customAlphabet("0123456789", 12);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });
  const [momoName, setMomoName] = useState("");
  const [url, setUrl] = useState("sd");
  const [nameLoading, setNameLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [currency, setCurrency] = useState()
  const [amount, setAmount] = useState()

  // HANDLE SELECT OPTION
  const handleSelectChange = (selectedOption) => {
    setValue("provider", selectedOption[0].value);
  };

  const number = watch("momoNumber");
  const network = watch("provider");

  const accountHolder = async () => {
    const data = {
      serviceId: network,
      accountNoOrCardNoOrMSISDN: number,
      token: localStorage.getItem("token"),
      xAuth: localStorage.getItem("xauth"),
    };
    try {
      const response = await axios.post("/api/getKyc", data);
      if (!response.data.data.Status) {
        toast.warning(response.data.data.Message);
        setNameLoading(false);
      }
      // console.log(response.data.data);
      setMomoName(response?.data?.data?.AccountName);
      setNameLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    localStorage.removeItem("3ds");
    setUrl(localStorage.getItem("callBack_url"));

    if (number.length == 10 && network) {
      setNameLoading(true);
      accountHolder();
    }
  }, [number, network, url]);

  // HANDLE FORM SUBMISSION
  const onSubmit = async (values) => {
    // console.log(values);
    const transactionId = nanoid(); //GENERATE TRANSACTION ID
    const data = {
      serviceId: values.provider,
      accountNoOrCardNoOrMSISDN: values.momoNumber,
      transactionId: transactionId,
      narration: "Payment of goods and services",
      amount: localStorage.getItem("amount"),
      name: momoName,
      token: localStorage.getItem("token"),
      xAuth: localStorage.getItem("xauth"),
    };
    try {
      const response = await axios.post("/api/makecollection/", data);
      localStorage.setItem("transactionId", transactionId);
      if (
        response.data.data.Status &&
        response.data.data.TransStatus == "PENDING"
      ) {
        router.push("/processing");
      }
      if (!response.data.data.Status) {
        toast.error(response.data.data.Message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [pKey, setPkey] = useState("");

  const getTokenData = async () => {
    try {
      const getData = await axios.get(`api/credentials/${pKey}`);
      if (getData.data.token) {
        setCurrency(getData.data.currency);
        setAmount(getData.data.amount);
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
    <div className="">
      <Header pathname={"momo"} loader={loader} currency={currency} amount={amount}/> 
      <div className="text-center flex justify-center items-center pt-5">
        <MdMobileScreenShare size={35} color="red" />
      </div>

      <form
        className="flex flex-col items-center justify-center  mb-5  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <small className="text-center text-xs text-gray-400 block  p-3">
          Enter your mobile money number and select a provider to start your
          payment
        </small>

        <div className="sm:w-[80%] w-full">
          <div className="w-full relative mb-5">


            <input
              className={clsx({
                "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2  mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                "border-green-500 border-2":
                  formState.dirtyFields?.momoNumber &&
                  !!!formState.errors?.momoNumber === true,
                "border-red-500 border-2":
                  !!formState.errors?.momoNumber === true,
              })}
              id=""
              type="string"
              {...register("momoNumber")}
              placeholder="Enter your momo number"
            />

            {formState?.errors?.momoNumber?.message && (
              <small className="text-sm text-red-500">
                {formState?.errors?.momoNumber?.message}
              </small>
            )}
          </div>

          <div className="mb-5">
            <Select
              options={options}
              {...register("provider")}
              onChange={handleSelectChange}
              placeholder="Choose a provider"
              color="#e5e7ebff"
              className="bg-gray-200 rounded-lg border-0 outline-none focus:outline-none text-gray-800"
              style={{
                outline: "none",
                borderRadius: "3px",
                padding: "5px",
              }}
              itemRenderer={({ item, methods }) => (
                <div
                  key={item.value}
                  className="flex items-center p-2 cursor-pointer"
                  onClick={() => methods.addItem(item)}
                >
                  {/* Render the logo */}
                  <img
                    src={item.logo}
                    alt={item.label}
                    className="w-10 h-6 mr-2 object-contain"
                  />
                  {/* Render the label */}
                  <span>{item.label}</span>
                </div>
              )}
              contentRenderer={({ props, state }) => (
                <div className="flex items-center">
                  {/* Render the logo of the selected item */}
                  {state.values.length > 0 && (
                    <img
                      src={state.values[0].logo}
                      alt={state.values[0].label}
                      className="w-auto h-6 mr-2 bg-gray-100 object-contain"
                    />
                  )}
                  {/* Render the label of the selected item */}
                  <span>
                    {state.values.length > 0
                      ? state.values[0].label
                      : props.placeholder}
                  </span>
                </div>
              )}
            />

            {!watch("provider") && formState?.errors?.provider?.message && (
              <small className="text-sm text-red-500">
                {formState?.errors?.provider?.message}
              </small>
            )}
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3 ">
              <input
                className={clsx({
                  "appearance-none block font-md text-md w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-2 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                  "border-green-500 border-2":
                    formState.dirtyFields?.name &&
                    !!!formState.errors?.name === true,
                  "border-red-500 border-2": !!formState.errors?.name === true,
                })}
                id=""
                type="text"
                {...register("name")}
                placeholder="Momo name"
                value={nameLoading ? "Loading..." : momoName}
                disabled
              />

              {formState?.errors?.name?.message && (
                <p className="text-sm text-red-500">
                  {formState?.errors?.name?.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            // disabled={formState.isSubmitting}
            disabled={momoName ? false : true}
            className="bg-[#1f8fff] pay-btn w-full"
          >
            {formState.isSubmitting ? (
              <Rings
                visible={true}
                height="30"
                width="30"
                color="white"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <div className="flex justify-center items-center gap-2">
                <GiTakeMyMoney size={25} />
                Pay
              </div>
            )}
          </button>
          <button
            onClick={() => {
              window.location.href = url;
            }}
            className="back-btn w-full mt-2"
          >
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
