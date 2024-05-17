import axios from "axios";
import {
  BASE_URL,
  MERCHANT_AUTH,
  MERCHANT_PASSWORD,
  MERCHANT_USERNAME_ID,
} from "../constants";



/**
 * GET ACCESS TOKEN
 * @returns 
 */
export async function getAccessToken() {
  try {
    const data = await axios.get(`${BASE_URL}/accesstoken`, {
      headers: {
        Authorization:
          "Basic " + btoa(MERCHANT_USERNAME_ID + ":" + MERCHANT_PASSWORD),
        "Content-Type": "application/json", // Adjust content type as needed
      },
    });
    localStorage.setItem('token', data.data.Token)
    console.log( data.data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}


/**
 * LIST PAYMENT SERVICES
 * @returns 
 */
export async function getPaymentServices() {
  // Get Bearer token from localStorage
  const BEARER_TOKEN = localStorage.getItem('token');
  try {
    // Make the request with the Bearer token in the Authorization header
    const response = await axios.post(
      `${BASE_URL}/enquiry/collectionservices`,
      {
        LanguageId: "En",
        CountryCode: "GH0233"
      },
      {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
          'X-Auth': MERCHANT_AUTH,
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}


/** GET ACCOUNT HOLDER API
 * @params {
  "CustomerAcctNo" : "233244415669",
  "PayPartnerServiceId" : "MTNMOMG101",
}
 */
export async function getAccHolderInfo(data) {
  // Get Bearer token from localStorage
  const BEARER_TOKEN = localStorage.getItem('token');
  try {
    // Make the request with the Bearer token in the Authorization header
    const response = await axios.post(
      `${BASE_URL}/kyc/accountinfo`,
      {
        LanguageId: "En",
        CountryCode: "GH0233",
        CustomerAcctNo: "233558628473" || data?.customerAccNo,
        PayPartnerServiceId: "MTNMOMGH0233SC1001000101" ||  data?.serviceId,
      },
      {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
          'X-Auth': MERCHANT_AUTH,
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}


/**
 * 
 * @param {* }
 * @returns 
 */
export async function makeCollection(data) {
  // Get Bearer token from localStorage
  const BEARER_TOKEN = localStorage.getItem('token');
  console.log(data);
  try {
    // Make the request with the Bearer token in the Authorization header
    const response = await axios.post(
      `${BASE_URL}/transfer/debitaccount`,
      {
        "PayPartnerServiceId": data?.ServiceId,
        "Amount": data?.amount,
        "AccountNoOrCardNoOrMSISDN": data.accountNoOrCardNoOrMSISDN,
        "AccountName": data?.name || "",
        "TransactionId": data?.transactionId,
        "Narration": data?.narration,
        "TransCurrencyIso": "GHS",
        "ExpiryDateMonth": data?.expiryDate || 0,
        "ExpiryDateYear": data?.expiryMonth || 0,
        "Cvv": data?.cvv || 0,
        "LanguageId": "En"
      },
      {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
          'X-Auth': MERCHANT_AUTH,
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}


/**
 * GET THE TRANSACTION STATUS
 * @param {*} data 
 * @returns 
 */
export async function getTransactionStatus(data) {
  // Get Bearer token from localStorage
  const BEARER_TOKEN = localStorage.getItem('token');
  try {
    // Make the request with the Bearer token in the Authorization header
    const response = await axios.post(
      `${BASE_URL}/transfer/transstatus`,
      {
        "TransactionId": data.transactionId,
        "LanguageId": "En"
      },
      {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
          'X-Auth': MERCHANT_AUTH,
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle errors here
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}