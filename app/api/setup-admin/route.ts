import { createInitialAdmin } from "@/lib/admin-setup"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await createInitialAdmin()
    return NextResponse.json(result)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
