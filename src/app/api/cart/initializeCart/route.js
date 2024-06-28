import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    const response = await axios.get(`https://api.chec.io/v1/carts`, {
      headers: {
        "X-Authorization": process.env.NEXT_PUBLIC_API_KEY,
      },
    });

    if (response.status !== 201) {
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
