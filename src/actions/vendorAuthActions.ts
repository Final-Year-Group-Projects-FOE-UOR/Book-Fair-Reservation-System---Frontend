/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
const Base_URL = 'http://localhost:8000/api/v3';

export const vendorSignup = async (
  businessName: string,
  email: string,
  password: string
) => {
  "use server";
  try {
    const body = {
      email: email,
      password: password,
      username: businessName,
    };

    const url = `${Base_URL}/users/register`;
    const response = await axios.post(url, body);
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const vendorLogin = async (email: string, password: string) => {
  "use server";
  try {
    const body = {
      email: email,
      password: password,
    };
    const url = `${Base_URL}/users/login`;
    const response = await axios.post(url, body);
    return response.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.log("error", err.response.data);
      return err.response.data;
    } else {
      console.log("error", err);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};
