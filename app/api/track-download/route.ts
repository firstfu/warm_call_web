import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

interface DownloadTrackingData {
  platform: 'ios' | 'android'
  timestamp?: string
  userAgent?: string
  referrer?: string
  deviceType?: string
  ipAddress?: string
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

function getGoogleAuth() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!serviceAccountEmail || !privateKey) {
    throw new Error('Google API credentials not configured')
  }

  return new JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: SCOPES,
  })
}


async function appendToSheet(data: DownloadTrackingData) {
  const auth = getGoogleAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const sheetId = process.env.GOOGLE_SHEET_ID
  const sheetName = process.env.GOOGLE_SHEET_NAME || 'Downloads'

  if (!sheetId) {
    throw new Error('Google Sheet ID not configured')
  }

  const values = [[
    data.timestamp || new Date().toISOString(),
    data.platform === 'ios' ? 'iOS' : 'Android',
    data.ipAddress || '',
    data.userAgent || '',
    data.referrer || '',
    data.deviceType || '',
    new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
  ]]

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:G`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error appending to Google Sheets:', error)
    throw error
  }
}

function detectDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase()

  if (/iphone|ipod/.test(ua)) return 'iPhone'
  if (/ipad/.test(ua)) return 'iPad'
  if (/android/.test(ua)) {
    if (/mobile/.test(ua)) return 'Android Phone'
    return 'Android Tablet'
  }
  if (/windows phone/.test(ua)) return 'Windows Phone'
  if (/macintosh|mac os x/.test(ua)) return 'Mac'
  if (/windows/.test(ua)) return 'Windows'
  if (/linux/.test(ua)) return 'Linux'

  return 'Unknown'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { platform } = body

    if (!platform || !['ios', 'android'].includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform specified' },
        { status: 400 }
      )
    }

    const userAgent = request.headers.get('user-agent') || ''
    const referrer = request.headers.get('referer') || ''
    const xForwardedFor = request.headers.get('x-forwarded-for')
    const xRealIp = request.headers.get('x-real-ip')
    const ipAddress = xForwardedFor?.split(',')[0] || xRealIp || ''

    const trackingData: DownloadTrackingData = {
      platform,
      timestamp: new Date().toISOString(),
      userAgent,
      referrer,
      deviceType: detectDeviceType(userAgent),
      ipAddress,
    }

    await appendToSheet(trackingData)

    return NextResponse.json({
      success: true,
      message: 'Download tracked successfully',
      data: {
        platform,
        timestamp: trackingData.timestamp,
        deviceType: trackingData.deviceType,
      }
    })

  } catch (error) {
    console.error('Error tracking download:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json(
      {
        error: 'Failed to track download',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 })
}