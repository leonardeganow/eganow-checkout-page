"use client";

import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import Select from "react-dropdown-select";

import { defaultFormValues } from "./defaultFormValues";
import { validationSchema } from "./validationSchema";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdMobileScreenShare } from "react-icons/md";

import { customAlphabet } from 'nanoid';
import { getAccHolderInfo, makeCollection } from "../api";
import { Amount } from "../constants";
import { useRouter } from 'next/navigation'
import { Rings } from "react-loader-spinner";


const options = [
  {
    value: "MTNMOMGH0233SC1001000101",
    label: "MTN",
  },
  {
    value: "VODCASGH0233SC10010001",
    label: "TELECEL",
  },
];

function Page() {
  const router = useRouter()
  // INITIALIZE NANOID
  const nanoid = customAlphabet('0123456789', 12);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });

  // HANDLE SELECT OPTION
  const handleSelectChange = (selectedOption) => {
    setValue("provider", selectedOption[0]?.value);
  };

  // HANDLE FORM SUBMISSION
  const onSubmit = async(values) => {
      const transactionId = nanoid(); //GENERATE TRANSACTION ID
      const data = {
        ServiceId : values.provider,
        accountNoOrCardNoOrMSISDN : values.momoNumber,
        transactionId : transactionId,
        narration : 'Payment of goods and services',
        amount : Amount
      }
      try {
        const response = await makeCollection(data);
        if(response.Status && response.TransStatus == "PENDING"){
          router.push('/processing')
        }
        console.log(response)
      } catch (error) {
        console.error(error)
      }
  };


  return (
    <div className="">
      <div className="text-center flex justify-center items-center pt-5">
        <MdMobileScreenShare size={35} color="red" />
      </div>

      <form
        className="flex flex-col items-center justify-center mb-10 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <small className="text-center text-xs text-gray-400 block lg:px-10 p-3">
          Enter your mobile money number and select a provider to start your
          payment
        </small>

        <div className="w-[80%]">
          
          <div className="w-full relative mb-5">
            <label
              className=" block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 relative "
              for="grid-password"
            >
              Momo Number
            </label>

            <input
              className={clsx({
                "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
                "border-green-500 border-2":
                  formState.dirtyFields?.momoNumber &&
                  !!!formState.errors?.momoNumber === true,
                "border-red-500 border-2":
                  !!formState.errors?.momoNumber === true,
              })}
              id=""
              type="string"
              {...register("momoNumber")}
              placeholder="0000000000"
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
              className="bg-gray-200 py-3 rounded-lg border-0 outline-none focus:outline-none text-gray-800"
              style={{
                outline: "none",
                borderRadius: "3px",
                padding: "10px",
              }}
            />

            {!watch("provider") && formState?.errors?.provider?.message && (
              <small className="text-sm text-red-500">
                {formState?.errors?.provider?.message}
              </small>
            )}
          </div>

          <button
        type="submit"
        disabled={formState.isSubmitting}
        className="bg-[#1f8fff] w-full flex justify-center items-center  text-white py-2 rounded-lg cursor-pointer active:bg-green-800"
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

          {/* <button
            type="submit"
            className="bg-[#1f8fff] w-full flex justify-center items-center gap-2 text-white py-2 rounded-lg cursor-pointer active:bg-green-800"
          >
            <GiTakeMyMoney size={25} />
            Confirm
          </button> */}
        </div>
        {/* <small className="text-gray-400 text-xs text-center p-5">
          Lorem ipsum dolor sit amet consectetur adipisicingfvfgg elit. Quos id
          perspiciatis laboriosam aut rerum fugiat!!!!
        </small> */}
      </form>


      {/* <section className="flex justify-center items-center">
        Loading...
      </section> */}


    </div>
  );
}

export default Page;
