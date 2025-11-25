/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Stall } from "@/components/admin/stall-configuration/types";
import axios from "axios";
const Base_URL = process.env.Base_URL;

export const createStall = async (
  jwt: string,
  stall: Stall
) => {
  "use server";
  const url = `${Base_URL}/stalls/add`;
  try {
    const body = {
      stall,
    };
    console.log(body);
    const response = await axios.post(url, body, {
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


