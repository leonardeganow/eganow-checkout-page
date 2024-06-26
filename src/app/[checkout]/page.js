"use client";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "../defaultFormValues";
import { validationSchema } from "../validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { GiTakeMyMoney } from "react-icons/gi";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/lib/styles.scss";
import { customAlphabet } from "nanoid";
import { useEffect, useState } from "react";
import { Grid, Rings } from "react-loader-spinner";
import { Amount, URL } from "../constants";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import SkeletonLoader from "./SkeletonLoader";
import Header from "../components/Header";
import ReactInputMask from "react-input-mask";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/Loader";

export default function Home({ params }) {
  const [token, setToken] = useState(false);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [currency, setCurrency] = useState();
  const [amount, setAmount] = useState();
  const [viewMode, setViewMode] = useState("");

  //NOTE - useform
  const { register, handleSubmit, watch, formState, setValue ,getValues} = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });
  const router = useRouter();
  const p_key = params.checkout;
  const pathname = usePathname();

  // save key to session storage
  sessionStorage.setItem("p_key", p_key);

  const nanoid = customAlphabet("0123456789", 12);

  const getTokenData = async () => {
    setLoader(true);
    try {
      const getData = await axios.get(`api/credentials/${p_key}`);
      if (getData.data.token) {
        setLoader(false);
        setToken(getData.data.token);
        localStorage.setItem("token", getData.data.token);
        localStorage.setItem("amount", getData.data.amount);
        localStorage.setItem("xauth", getData.data.x_auth);
        localStorage.setItem("callBack_url", getData.data.callback_url);
        localStorage.setItem("currency", getData.data.currency);
        setValue("currency", getData.data.currency);
        setValue("amount", getData.data.amount);
        setCurrency(getData.data.currency);
        setAmount(getData.data.amount);
        setViewMode(getData.data.payment_view_mode);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      if (error.response.status == 500) {
        toast.error("something went wrong, please try again");
      }
    }
  };

  const formatCreditCardNumber = (creditCardNumber) => {
    if (!creditCardNumber) {
      return;
    }
    return creditCardNumber.replace(/\s+/g, "");
  };

  const onSubmit = async (values) => {
    const transactionId = nanoid(); //GENERATE TRANSACTION ID
    const {
      name,
      accountNoOrCardNoOrMSISDN,
      cvv,
      expiryMonth,
      expiryYear,
      serviceId,
    } = values;

    const data = {
      narration: `${values.name} pays ${currency} ${amount}`,
      transactionId,
      amount: getValues("amount"),
      token: localStorage.getItem("token"),
      xAuth: localStorage.getItem("xauth"),
      currency: localStorage.getItem("currency"),
      name,
      cvv,
      expiryMonth,
      expiryYear,
      accountNoOrCardNoOrMSISDN: formatCreditCardNumber(
        accountNoOrCardNoOrMSISDN
      ),
      serviceId,
    };
    console.log(data);
    try {
      const response = await axios.post("/api/makecollection/", data);
      localStorage.setItem("transactionId", transactionId);
      if (
        response.data.data.Status &&
        response.data.data.TransStatus == "PENDING"
      ) {
        router.push("/processing");
        localStorage.setItem("3ds", response.data.data.Extra);
      }
      if (!response.data.data.Status) {
        toast.error(response.data.data.Message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error");
    }
  };

  const getPaymethods = async () => {
    const body = {
      token: localStorage.getItem("token"),
      xAuth: localStorage.getItem("xauth"),
    };
    try {
      const response = await axios.post(`/api/paymentmethods/`, body);
      if (response?.data?.data?.Status) {
        const serviceId =
          response?.data?.data?.PaymentTypesAndSvcList[3]?.PayPartnerServiceId;
        setValue("serviceId", serviceId || "PAYMENTCARDGATEWAY");
      } else {
        setValue("serviceId", "PAYMENTCARDGATEWAY");
      }
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    setUrl(localStorage.getItem("callBack_url"));
  }, [url]);

  useEffect(() => {
    setAmount(watch("amount"));
  }, [watch("amount")]);

  useEffect(() => {
    getTokenData();
    getPaymethods();
  }, [token]);

  if (!viewMode) {
    return <Loader />;
  }

  return (
    <MainLayout
      viewMode={viewMode}
      currency={currency}
      pathname={pathname}
      loader={loader}
      amount={amount}
    >
      <div>
        {loader ? (
          <SkeletonLoader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full   pb-5 ">

            <h1 className="text-center font-semibold text-md mb-3 text-gray-500">
              Enter your card details to pay
            </h1>
            <div className="flex flex-wrap -mx-3 mb-2">

              <div className="w-full px-3 relative">
                <label
                  className=" block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 relative "
                  htmlFor="grid-password"
                >
                  Amount
                </label>

                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.amount &&
                      !!!formState.errors?.amount === true,
                    "border-red-500 border-2":
                      !!formState.errors?.amount === true,
                  })}
                  id=""
                  type="number"
                  {...register("amount")}
                  placeholder="Enter amount to pay"
                />

                {formState?.errors?.amount?.message && (
                  <p className="text-sm text-red-500">
                    {formState?.errors?.amount?.message}
                  </p>
                )}
              </div>

              <div className="w-full px-3 relative">
                <label
                  className=" block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 relative "
                  htmlFor="grid-password"
                >
                  CARD NUMBER
                </label>

                <ReactInputMask
                  mask="9999 9999 9999 9999"
                  maskChar=" "
                  {...register("accountNoOrCardNoOrMSISDN")}
                >
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      className={clsx({
                        "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white": true,
                        "border-green-500 border-2":
                          formState.dirtyFields?.accountNoOrCardNoOrMSISDN &&
                          !!!formState.errors?.accountNoOrCardNoOrMSISDN,
                        "border-red-500 border-2":
                          !!formState.errors?.accountNoOrCardNoOrMSISDN,
                      })}
                      placeholder="0000 0000 0000 0000"
                    />
                  )}
                </ReactInputMask>

                <div className="card absolute -top-[49px] -right-[100px]">
                  <Cards
                    number={watch("accountNoOrCardNoOrMSISDN")}
                    expiry={27}
                    cvc={watch("cvv")}
                    name={"leonard adjei"}
                    size={40}
                  // focused={state.focus}
                  />
                </div>
                {formState?.errors?.accountNoOrCardNoOrMSISDN?.message && (
                  <p className="text-sm text-red-500">
                    {formState?.errors?.accountNoOrCardNoOrMSISDN?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 ">
                <label
                  className=" block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2  "
                  htmlFor="grid-password"
                >
                  Name on card
                </label>

                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.name &&
                      !!!formState.errors?.name === true,
                    "border-red-500 border-2":
                      !!formState.errors?.name === true,
                  })}
                  id=""
                  type="text"
                  {...register("name")}
                  placeholder="Enter your name"
                />

                {formState?.errors?.name?.message && (
                  <p className="text-sm text-red-500">
                    {formState?.errors?.name?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-2 ">
              <div className=" mb-4 md:mb-0 ">
                <label
                  className=" block uppercase tracking-wide text-gray-500 text-xs md: font-medium mb-2 truncate "
                  htmlFor="grid-first-name"
                >
                  EXP MONTH
                </label>
                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.expiryMonth &&
                      !!!formState.errors?.expiryMonth === true,
                    "border-red-500 border-2":
                      !!formState.errors?.expiryMonth === true,
                  })}
                  id="grid-first-name"
                  type="text"
                  placeholder="MM"
                  {...register("expiryMonth")}
                />
                {formState?.errors?.expiryMonth?.message && (
                  <p className="text-sm text-red-500 hidden sm:block">
                    {formState?.errors?.expiryMonth?.message}
                  </p>
                )}
              </div>
              <div className="   mb-4">
                <label className=" block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2 truncate">
                  EXP YEAR
                </label>
                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.expiryYear &&
                      !!!formState.errors?.expiryYear === true,
                    "border-red-500 border-2":
                      !!formState.errors?.expiryYear === true,
                  })}
                  type="number"
                  placeholder="YY"
                  {...register("expiryYear")}
                />
                {formState?.errors?.expiryYear?.message && (
                  <p className="text-sm text-red-500 hidden sm:block">
                    {formState?.errors?.expiryYear?.message}
                  </p>
                )}
              </div>
              <div className="  ">
                <label className=" block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2 truncate">
                  CARD CVV
                </label>
                <input
                  className={clsx({
                    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2  px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                    "border-green-500 border-2":
                      formState.dirtyFields?.cvv &&
                      !!!formState.errors?.cvv === true,
                    "border-red-500 border-2": !!formState.errors?.cvv === true,
                  })}
                  type="number"
                  placeholder="123"
                  {...register("cvv")}
                />
                {formState?.errors?.cvv?.message && (
                  <p className="text-sm text-red-500 hidden sm:block">
                    {formState?.errors?.cvv?.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={formState.isSubmitting}
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
            <p
              onClick={() => {
                window.location.href = url;
              }}
              className="back-btn w-full mt-2"
            >
              Go back
            </p>
          </form>
        )}
      </div>
    </MainLayout>
  );
}
