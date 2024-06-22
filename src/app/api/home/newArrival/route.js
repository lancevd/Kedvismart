import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request) {
  try {
    // Call the external endpoint
    const response = await axios.get(
      "https://api.chec.io/v1/products?sortBy=created_at&sortDirection=desc",
      {
        headers: {
          "X-Authorization": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    // Check if the response status is not in the 2xx range
    if (response.status != 200 ) {
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
