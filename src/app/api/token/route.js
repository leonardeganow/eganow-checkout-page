import axios from "axios";
import {
  BASE_URL,
  MERCHANT_AUTH,
  MERCHANT_PASSWORD,
  MERCHANT_USERNAME_ID,
} from "../../constants";
import { NextResponse } from "next/server";

/**
 * GET ACCESS TOKEN
 * @returns
 */
export const dynamic = "force-dynamic"; // defaults to auto
export async function GET() {
  try {
    const data = await axios.get(`${BASE_URL}/accesstoken`, {
      headers: {
        Authorization:
          "Basic " + btoa(MERCHANT_USERNAME_ID + ":" + MERCHANT_PASSWORD),
        "Content-Type": "application/json", // Adjust content type as needed
      },
    });
    // localStorage.setItem("token", data.data.Token);
    // console.log(data.data);
    // setCookie('token','data.data')
    return NextResponse.json({ data: data.data }, { status: 200 });
  } catch (error) {
    throw error;
  }
}
