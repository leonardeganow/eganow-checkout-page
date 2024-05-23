import axios from "axios";
import { BASE_URL, MERCHANT_AUTH, URL } from "../../constants";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * GET ACCESS TOKEN
 * @returns
 */

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request) {
  const { username, password, x_auth, amount, callback_url } =
    await request.json();
  try {
    const data = await axios.get(`${BASE_URL}/accesstoken`, {
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
        "Content-Type": "application/json", // Adjust content type as needed
      },
    });

    const values = {
      token: data.data.Token,
      x_auth,
      amount,
      callback_url,
    };

    if (data.data.Token) {
      const response = await axios.post(`${URL}/store`, values, {
        headers: {
          Authorization:
            "Basic " +
            btoa(
              process.env.EGAPAY_CHECKOUT_USERNAME +
                ":" +
                process.env.EGAPAY_CHECKOUT_PASSWORD
            ),
          "Content-Type": "application/json",
        },
      });
      return NextResponse.json(response.data, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch access token" },
      { status: 500 }
    );
  }
}

