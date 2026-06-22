// Empty API route handler for backend
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Backend API stub" });
}
