"use client";
import { useForm } from "react-hook-form";
import { defaultFormValues } from "./defaultFormValues";
import { validationSchema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { GiTakeMyMoney } from "react-icons/gi";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/lib/styles.scss";
// import "../../src/app/"

export default function Home() {
  //NOTE - useform
  const { register, handleSubmit, reset, watch, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = (values) => {
    console.log(values);
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mt-5 pb-5 "
    >
      <h1 className="text-center font-bold mb-5 text-gray-500">
        Enter your card details to pay
      </h1>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3 relative">
          <label
            className="roboto block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 relative"
            for="grid-password"
          >
            CARD NUMBER
     
          </label>

          <input
            className={clsx({
              "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ": true,
              "border-green-500 border-2":
                formState.dirtyFields?.cardNumber &&
                !!!formState.errors?.cardNumber === true,
              "border-red-500 border-2":
                !!formState.errors?.cardNumber === true,
            })}
            id=""
            roboto
            type="number"
            {...register("cardNumber")}
            placeholder="0000 0000 0000 0000"
          />

<div className="card absolute -top-[45px] -right-[100px]">
        <Cards
          number={watch("cardNumber")}
          expiry={27}
          cvc={watch("cvv")}
          name={"leonard adjei"}
          size={40}
          // focused={state.focus}
        />
      </div>
          {formState?.errors?.cardNumber?.message && (
            <p className="text-sm text-red-500">
              {formState?.errors?.cardNumber?.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/3 px-3 mb-4 md:mb-0">
          <label
            className="roboto block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2 "
            for="grid-first-name"
          >
            EXPIRY MONTH
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
            placeholder="00"
            {...register("expiryMonth")}
          />
          {formState?.errors?.expiryMonth?.message && (
            <p className="text-sm text-red-500">
              {formState?.errors?.expiryMonth?.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/3 px-3 mb-4">
          <label className="roboto block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2">
            EXPIRY YEAR
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
            placeholder="00"
            {...register("expiryYear")}
          />
          {formState?.errors?.expiryYear?.message && (
            <p className="text-sm text-red-500">
              {formState?.errors?.expiryYear?.message}
            </p>
          )}
        </div>
        <div className="w-full md:w-1/3 px-3">
          <label className="roboto block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2">
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
            placeholder="000"
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
        className="bg-green-700 w-full flex justify-center items-center gap-2 text-white py-2 rounded-lg cursor-pointer active:bg-green-800"
      >
        <GiTakeMyMoney size={25} />
        Pay
      </button>
    </form>
  );
}
