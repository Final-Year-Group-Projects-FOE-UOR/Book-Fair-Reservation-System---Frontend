/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
const Base_URL_users = process.env.Base_URL;

const adminPaths = [
  "/admin/dashboard",
  "/admin/booking-requests",
  "/admin/stall-availability",
  "/admin/reservations",
  "/admin/manage-staff",
  "/admin/stall-configuration",
  "/admin/map-management",
];

const userPaths = ["/my-bookings", "/booking", "/profile"];

const validateUser = async (jwt: string) => {
  try {
    const url = `${Base_URL_users}/users/validate`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data.success;
  } catch (error: any) {
    console.error("Error getting user:", error.message);
    return false;
  }
};

const checkRole = (role: string, url: string) => {
  console.log(role);
  console.log(url);
  let simpleRole = "";
  switch (role.split("_")[1].toLocaleLowerCase()) {
    case "admin":
      simpleRole = "admin";
      break;
    case "moderator":
      simpleRole = "employee";
      break;
    default:
      simpleRole = "user";
  }
  console.log("hi", simpleRole);
  if (url.includes("/admin")) {
    if (simpleRole !== "admin") {
      return false;
    }
  } else if (url.includes("/employee")) {
    console.log("hi employee", simpleRole);
    if (simpleRole !== "employee") {
      return false;
    }
  } else if (!url.includes("/employee") && !url.includes("/admin")) {
    if (simpleRole !== "user") {
      return false;
    }
  }
  return true;
};

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value || "";
  const role = request.cookies.get("role")?.value || "";
  const validated = await validateUser(jwt);
  const roleChecked = checkRole(role, request.url);

  if (!validated || !roleChecked) {
    console.log(request.url.includes("/admin"));
    const redirectUrl = request.url.includes("/admin")
      ? "/admin/login"
      : request.url.includes("/employee")
        ? "/employee/login"
        : "/auth/login";
    // Create redirect response
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    // Delete the jwt cookie
    response.cookies.delete("jwt");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/booking-requests",
    "/admin/stall-availability",
    "/admin/reservations",
    "/admin/manage-staff",
    "/admin/stall-configuration",
    "/admin/map-management",
    "/employee/booking-requests",
    "/employee/stall-availability",
    "/employee/reservations",
    "/my-bookings",
    "/booking",
    "/profile",
  ],
};
