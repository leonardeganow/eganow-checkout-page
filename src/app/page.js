"use client";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "./defaultFormValues";
import { validationSchema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { GiTakeMyMoney } from "react-icons/gi";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/lib/styles.scss";

import { useEffect } from "react";
import { getPaymentServices, makeCollection } from "./api";

export default function Home() {
  //NOTE - useform
  const { register, handleSubmit, reset, watch, formState, setValue } = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(validationSchema),
      defaultValues: defaultFormValues,
    }
  );

  const onSubmit = async (values) => {
    if(values){

      const data = {
        narration: `${values.name} pays GHS${values.amount}`,
        ...values
      }
      console.log(data);
      // try {
    }
    //   const response = await makeCollection();
    // } catch (error) {}
  };

  const getPaymentServicesHandler = async () => {
    try {
      const response = await getPaymentServices();
      if (response.Status) {
        const serviceId =
          response?.PaymentTypesAndSvcList[2]?.PayPartnerServiceId;
        setValue("serviceId", serviceId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setValue("amount", 2);
    getPaymentServicesHandler();
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mt-5 pb-5 "
    >
      <h1 className="text-center font-semibold text-md mb-5 text-gray-500">
        Enter your card details to pay
      </h1>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3 relative">
          <label
            className=" block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 relative "
            for="grid-password"
          >
            CARD NUMBER
          </label>

          <input
            className={clsx({
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
              "border-green-500 border-2":
                formState.dirtyFields?.accountNoOrCardNoOrMSISDN &&
                !!!formState.errors?.accountNoOrCardNoOrMSISDN === true,
              "border-red-500 border-2":
                !!formState.errors?.accountNoOrCardNoOrMSISDN === true,
            })}
            id=""
            type="number"
            {...register("accountNoOrCardNoOrMSISDN")}
            placeholder="0000 0000 0000 0000"
          />

          <div className="card absolute -top-[45px] -right-[100px]">
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
            for="grid-password"
          >
            Full name
          </label>

          <input
            className={clsx({
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
              "border-green-500 border-2":
                formState.dirtyFields?.name &&
                !!!formState.errors?.name === true,
              "border-red-500 border-2": !!formState.errors?.name === true,
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
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
          <label
            className=" block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2 "
            for="grid-first-name"
          >
            EXP MONTH
          </label>
          <input
            className={clsx({
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
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
            <p className="text-sm text-red-500">
              {formState?.errors?.expiryMonth?.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-4">
          <label className=" block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2">
            EXP YEAR
          </label>
          <input
            className={clsx({
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
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
            <p className="text-sm text-red-500">
              {formState?.errors?.expiryYear?.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className=" block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2">
            CARD CVV
          </label>
          <input
            className={clsx({
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
              "border-green-500 border-2":
                formState.dirtyFields?.cvv && !!!formState.errors?.cvv === true,
              "border-red-500 border-2": !!formState.errors?.cvv === true,
            })}
            type="number"
            placeholder="123"
            {...register("cvv")}
          />
          {formState?.errors?.cvv?.message && (
            <p className="text-sm text-red-500">
              {formState?.errors?.cvv?.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#1f8fff] w-full flex justify-center items-center gap-2 text-white py-2 rounded-lg cursor-pointer active:bg-green-800"
      >
        <GiTakeMyMoney size={25} />
        Pay
      </button>
    </form>
  );
}
