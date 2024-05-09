import axios from "axios";
import {
  BASE_URL,
  MERCHANT_AUTH,
  MERCHANT_PASSWORD,
  MERCHANT_USERNAME_ID,
} from "../constants";

const BEARER_TOKEN =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImZWZSt6ZTYyQUpMYUZjWFUwUURQRTRzNFR3R1Mzb0krOGdlOHkwL1pLdWs9IiwiY2VydHNlcmlhbG51bWJlciI6InZCMDlweXU1L3N3NGFCbDg5WXgrQnNiYVNRMFRlN3AyNU5GRHpxeXJzcEk9IiwicHJpbWFyeXNpZCI6InU2NTdjV1JzcWoxa0h2bmwwVDZ6SEx3Z3VHWmxvOFhyUE5NeENjaUo4N1k9IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvY291bnRyeSI6IjJtNno2K3JET2wwMXlCMmNwUEFwa3c9PSIsIm5iZiI6MTcxNTI2ODQ5NSwiZXhwIjoxNzE1MjcyMDk1LCJpYXQiOjE3MTUyNjg0OTV9.L6_4fMxbcYzdBoBoTu1nIj5ZY96HnglipkWyIAMo8siUbpRYfjN18zVfB7Aa5jr1OnpzjS7I3f6dO04LK_1cmA";
export async function getAccessToken() {
  try {
    const data = await axios.get(`${BASE_URL}/accesstoken`, {
      headers: {
        Authorization:
          "Basic " + btoa(MERCHANT_USERNAME_ID + ":" + MERCHANT_PASSWORD),
        "Content-Type": "application/json", // Adjust content type as needed
      },
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getPaymentServices() {
    const myHeaders = new Headers();
    myHeaders.append("X-Auth", "");
    myHeaders.append("Authorization", `Bearer ${BEARER_TOKEN}`);
    const raw = "{\r\n\"LanguageId\" : \"En\",\r\n\"CountryCode\" : \"GH0233\"\r\n}";

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("https://eganow-merchant.egadevapi.com/eganow/api/enquiry/collectionservices", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
//   try {
//     const data = await axios.post(
//       `${BASE_URL}/enquiry/collectionservices`,
//       {
//         LanguageId: "En",
//         CountryCode: "GH0233",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${BEARER_TOKEN}`,
//           "Content-Type": "application/json",
//           xauth: "",
//         },
//       }
//     );

//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
}
