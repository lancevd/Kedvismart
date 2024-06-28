// File path: pages/api/details/singleProduct.js

import { NextResponse } from "next/server";
import axios from "axios";
import { getCookie } from "cookies-next";

export async function POST(request) {
  const ID = getCookie("cart_id", { req: request });
  const payload = await request.json();
console.log(`<><<>><<<<<<<<<<>>>>>>>>>>>>>>>>>>>`, payload)

  if (!ID) {
    return NextResponse.json(
      { message: "Cart ID not found in cookies" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(`https://api.chec.io/v1/carts/${ID}`, payload, {
      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    // console.log(response);
    if (response.status !== 200) {
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
