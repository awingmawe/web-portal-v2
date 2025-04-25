// app/api/image-proxy/route.ts

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return NextResponse.json(
      { error: 'No image URL provided' },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(imageUrl)

    const contentType = response.headers.get('content-type') || 'image/png'
    const imageBuffer = await response.arrayBuffer()

    return new NextResponse(Buffer.from(imageBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    )
  }
}
