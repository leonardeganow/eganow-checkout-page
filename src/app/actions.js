"use server";
import { cookies } from "next/headers";

export default async  function getCookiesHandler() {
  const cookieStore =  cookies();
  const response =  cookieStore.getAll();
  console.log(response);
  return response;

}
