// File path: pages/api/details/singleProduct.js

import { NextResponse } from "next/server";
import axios from "axios";
import { getCookie } from "cookies-next";

export async function GET(request) {
  const ID = getCookie("itemID", { req: request });

  if (!ID) {
    return NextResponse.json(
      { message: "Product ID not found in cookies" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(`https://api.chec.io/v1/products/${ID}`, {
      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    if (response.status !== 200) {
      // console.log(response);
      return NextResponse.json(
        {
          message: `External API call failed with status: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = response.data;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error calling external API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
