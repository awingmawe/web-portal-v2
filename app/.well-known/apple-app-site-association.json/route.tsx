import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export const GET = async () => {
  try {
    // Determine the environment
    const env =
      process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 'prod' : 'dev'

    // Construct the file path
    const filePath = path.join(
      process.cwd(),
      'public',
      'app-link',
      env,
      'apple-app-site-association.json'
    )

    // Read the JSON file
    const fileContent = await readFile(filePath, 'utf-8')
    const jsonData = JSON.parse(fileContent)

    // Return the JSON response
    return NextResponse.json(jsonData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error reading JSON file:', error)
    return NextResponse.json(
      { error: 'File not found or invalid JSON' },
      { status: 500 }
    )
  }
}
