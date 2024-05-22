import axios from "axios";
import { BASE_URL, MERCHANT_AUTH } from "../../constants";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * GET ACCESS TOKEN
 * @returns
 */

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request) {
  const res = await request.json();
  console.log(res);
  try {
    const xAuth = res.auth;
    console.log(xAuth);
    const data = await axios.get(`${BASE_URL}/accesstoken`, {
      headers: {
        Authorization: "Basic " + btoa(res.username + ":" + res.password),
        "Content-Type": "application/json", // Adjust content type as needed
      },
    });

    cookies().set("token", data.data.Token);
    cookies().set("xauth", xAuth);
    cookies().set({
      name: 'name',
      value: 'lee',
      httpOnly: true,
      path: '/',
    })
    if (data.data.Token) {
      redirect("/");
      // return NextResponse.json({ data: data.data }, { status: 200 });
    }
  } catch (error) {
    throw error;
  }
}

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const response = cookieStore.getAll();

   return NextResponse.json({ data: response }, { status: 200 })
  } catch (error) {
    throw error;
  }
}
