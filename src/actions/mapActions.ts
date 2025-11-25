/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Stall } from "@/components/admin/stall-configuration/types";
import axios from "axios";
const Base_URL = process.env.Base_URL;

export const addMap = async (jwt: string, mapUrl: string) => {
  "use server";
  const url = `${Base_URL}/admin/map/update`;
  try {
    const body = {
      mapUrl,
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

export const getMap = async (jwt: string) => {
  "use server";
  const url = `${Base_URL}/admin/map`;
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

export const updateMapStall = async (jwt: string, stall: Stall) => {
  "use server";
  const stallId = stall.id;
  const url = `${Base_URL}/stalls/update/${stallId}`;
  try {
    const body = {
      ...stall,
    };
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