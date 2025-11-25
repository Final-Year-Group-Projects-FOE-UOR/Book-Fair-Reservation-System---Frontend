/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
const Base_URL = process.env.Base_URL;

export const signup = async (email: string, password: string) => {
  "use server";
  try {
    const body = {
      email: email,
      password: password,
    };

    const url = `${Base_URL}/auth/register`;
    const response = await axios.post(url, body);
    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

export const login = async (email: string, password: string) => {
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

export const initialResetPassword = async (email: string, password: string) => {
  "use server";
  try {
    const body = {
      email: email,
      newPassword: password,
    };
    const url = `${Base_URL}/moderator/change-password-first-time`;
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