/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axios from "axios";
const Base_URL = process.env.Base_URL;

export const createStaff = async (
  jwt: string,
  username: string,
  email: string
) => {
  "use server";
  const url = `${Base_URL}/admin/create-moderator`;
  console.log(url);
  console.log(jwt);
  try {
    const body = {
      username,
      email,
    };
    console.log(body);
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

export const getAllStaff = async (jwt: string) => {
  "use server";
  const url = `${Base_URL}/admin/moderators`;
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
