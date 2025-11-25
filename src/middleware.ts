/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
const Base_URL_users = process.env.Base_URL;

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

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value || "";
  const validated = await validateUser(jwt);

  if (!validated) {
    console.log(request.url.includes("/admin"));
    const redirectUrl = request.url.includes("/admin") ? "/admin/login" : request.url.includes("/employee") ? "/employee/login" : "/login";
    // Create redirect response
    const response = NextResponse.redirect(
      new URL(redirectUrl, request.url)
    );
    // Delete the jwt cookie
    response.cookies.delete("jwt");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard:path*", "/admin/manage-staff:path*"],
};
