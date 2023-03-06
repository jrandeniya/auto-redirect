import { NextRequest, NextResponse } from "next/server";
const crypto = require("crypto");

const MERCHANT_PASSWORD = process.env.MERCHANT_PASSWORD || "";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = {
    merchantCode: "fwdome",
    invoiceNO: body.invoiceId,
    amount: body.amount,
    callback: body.callback,
    currencyCode: "THB",
    desc: "test",
    customerRef: "USR1",
    customerPhone: "0800000000",
    channelGroupID: "7",
    channelID: "32",
    responseType: "iframe",
  };

  const values = [...Object.values(data), MERCHANT_PASSWORD].join("");
  const sumData = crypto.createHash("md5").update(values).digest("hex");

  console.log("data", data);
  console.log("values", values);
  console.log("sumData", sumData);

  try {
    const response = await fetch(
      "https://test-api-checkout.t2p.co.th/api/payment/charge",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, sumData }),
      }
    );

    return NextResponse.json(await response.json());
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: JSON.stringify(e) });
  }
}
