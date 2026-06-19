import { NextResponse } from "next/server";
import axios from "axios";
import { getCookie } from "cookies-next";

export async function PUT(request) {
  const ID = getCookie("cart_id", { req: request });
  const payload = await request.json();

  const itemID = payload.id;
  const quantity = payload.quantity;

  if (!ID) {
    return NextResponse.json(
      { message: "Cart ID not found in cookies" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.put(
      `https://api.chec.io/v1/carts/${ID}/items/${itemID}`,
      {
        id: payload.id,
        quantity: payload.quantity,
      },
      {
        headers: {
          "X-Authorization": process.env.CHEC_API_KEY,
        },
      }
    );

    // console.log(response);
    if (response.status !== 200) {
      return NextResponse.json(        { message: `External API call failed with status: ${response.statusText}` },        { status: response.status }      );
    }

    const data = response.data;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error calling external API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
