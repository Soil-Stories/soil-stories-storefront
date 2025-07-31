// app/api/auth/verify/route.ts
import { NextResponse } from "next/server"
import { verifyOtp } from "@lib/data/customer" // this can use Medusa, cookies etc.

export async function POST(req: Request) {
  const body = await req.json()
  const { otp, phone } = body

  try {
    const customer = await verifyOtp({ otp, phone })
    return NextResponse.json({ customer })
  } catch (e: any) {
    return NextResponse.json({ error: e.toString() }, { status: 400 })
  }
}
