// pages/api/credentials/[id].js
import { NextResponse } from 'next/server';
import axios from 'axios';
import { URL } from '@/app/constants';

export async function GET(request) {
  // Extract the dynamic segment
  const id = request.nextUrl.pathname.split('/').pop();

  // Parse query parameters
//   const { searchParams } = new URL(request.url);
//   const p_key = searchParams.get('p_key');

  // Log the dynamic segment and query parameter
  console.log("Dynamic Route ID:", id);

//   Uncomment and adjust the following code to make an API request with axios
  try {
    console.log(id);
    const response = await axios.get(`${URL}/retrieve/${id}`, {
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
    console.log(response);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
