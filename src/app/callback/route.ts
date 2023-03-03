import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Success", request: request.json() });
}

export async function POST(request: NextRequest) {
  console.log(await request.json())
  return NextResponse.json({ message: "Success" });
}