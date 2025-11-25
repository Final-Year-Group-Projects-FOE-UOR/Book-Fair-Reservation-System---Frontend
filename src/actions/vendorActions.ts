/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { VendorInfo } from "@/components/vendor/dashboard/types";
import axios from "axios";
const Base_URL = 'http://localhost:8000/api/v3';


export const fetchVendorByEmail = async (jwt: string,email:string) => {
  "use server";
  const url = `${Base_URL}/vendors?email=${email}`;
  console.log(url);
  console.log(jwt);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

export const saveVendorProfile = async (jwt: string, vendorData:VendorInfo) => {
  "use server";
  const url = `${Base_URL}/vendors?email=${vendorData.email}`;
  console.log(url);
  console.log(jwt);
  const body = {
    businessName: vendorData.businessName,
    genres: vendorData.genres,
  };
  try {
    const response = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.log("error", error.response.data);
      return error.response.data;
    } else {
      console.log("error", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

