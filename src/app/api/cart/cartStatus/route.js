// File path: pages/api/details/singleProduct.js

import { NextResponse } from "next/server";
import axios from "axios";
import { getCookie } from "cookies-next";


export async function GET(request) {
  const ID = getCookie("cart_id", { req: request });

  try {
    const response = await axios.get(`https://api.chec.io/v1/carts/{ID}`, {
      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    if (response.status !== 200) {
      //   console.log(response);
      return NextResponse.json(
        {
          message: `Error. API response failed with status ${response.status}`,
        },
        { status: response.status }
      );
    }

    const data = response.data;
    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      statusCode: 500,
      message: "An error occured!",
    });
    console.log(error);
  }
}


/* ------------ADD ITEM TO CART -------------*/

export async function POST(request) {
  const ID = getCookie("cart_id", { req: request });
  const payload = await request.json();

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
        error,
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

/* ------------UPDATE ITEM IN CART -------------*/

export async function PUT(request) {
  const ID = getCookie("cart_id", { req: request });
  const payload = await request.json();
  console.log(`<><<>><<<<<<<<<<>>>>>>>>>>>>>>>>>>>`, payload);

  const itemID = payload.id;
  const quantity = item.quantity

  if (!ID) {
    return NextResponse.json(
      { message: "Cart ID not found in cookies" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      `https://api.chec.io/v1/carts/${ID}/items/${itemID.id}`,
      quantity,
      {
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    // console.log(response);
    if (response.status !== 200) {
      return NextResponse.json(error, { status: response.status });
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