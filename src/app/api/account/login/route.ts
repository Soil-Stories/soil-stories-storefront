import { NextResponse } from "next/server"
import { authenticateWithPhone } from "@lib/data/customer"

export async function POST(req: Request) {
  const body = await req.json()
  const { phone } = body
  console.log("Received phone:", phone);
  
  try {
    const { location } = await authenticateWithPhone(phone)
    return NextResponse.json({ location })
  } catch (e: any) {
    return NextResponse.json({ error: e.toString() }, { status: 400 })
  }
}
