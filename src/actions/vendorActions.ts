/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { VendorInfo } from "@/components/vendor/types";
import axios from "axios";
const Base_URL = process.env.Base_URL;

export const fetchVendorByEmail = async (jwt: string, email: string) => {
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

export const saveVendorProfile = async (
  jwt: string,
  vendorData: VendorInfo,
) => {
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

export const updateVendor = async (jwt: string, email: string, vendor: VendorInfo) => {
  "use server";
  const body = {
    businessName: vendor.businessName,
    genres: vendor.genres,
  }
  const url = `${Base_URL}/vendors?email=${email}`;
  try {
    console.log(body);
    const response = await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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

export const addReservation = async (
  jwt: string,
  body: {
    stallIds: (number | null)[];
    userId: number;
    userEmail: string;
  }
) => {
  "use server";
  const url = `${Base_URL}/reservations`;
  console.log(url);
  console.log(jwt);
  try {
    const response = await axios.post(url, body, {
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

export const getAllVendors = async (jwt: string) => {
  "use server";
  const url = `${Base_URL}/vendors/all`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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
