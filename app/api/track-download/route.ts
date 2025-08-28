import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { JWT } from 'google-auth-library'

interface DownloadTrackingData {
  platform: 'ios' | 'android'
  action: 'click' | 'submit' | 'skip'
  timestamp?: string
  userAgent?: string
  referrer?: string
  deviceType?: string
  ipAddress?: string
  userData?: {
    name?: string
    email?: string
    phone?: string
    interest?: string
    newsletter?: boolean
  }
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

async function calculateAnalytics(sheets: ReturnType<typeof google.sheets>, sheetId: string) {
  try {
    // 讀取所有資料以計算統計
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Downloads!A:M',
    })

    const rows = response.data.values || []
    if (rows.length <= 1) return // 只有標題或沒有資料

    // 跳過標題行
    const dataRows = rows.slice(1)
    
    // 計算各種指標
    const totalClicks = dataRows.length
    const clickActions = dataRows.filter((row: string[]) => row[2] === 'click').length
    const submitActions = dataRows.filter((row: string[]) => row[2] === 'submit').length
    const skipActions = dataRows.filter((row: string[]) => row[2] === 'skip').length
    
    // 計算有資料的記錄
    const recordsWithEmail = dataRows.filter((row: string[]) => row[4] && row[4].trim() !== '').length
    const recordsWithPhone = dataRows.filter((row: string[]) => row[5] && row[5].trim() !== '').length
    const recordsWithName = dataRows.filter((row: string[]) => row[3] && row[3].trim() !== '').length
    
    // 平台統計
    const iosCount = dataRows.filter((row: string[]) => row[1] === 'iOS').length
    const androidCount = dataRows.filter((row: string[]) => row[1] === 'Android').length
    
    // 訂閱意願
    const newsletterYes = dataRows.filter((row: string[]) => row[7] === '是').length
    
    // 計算轉換率
    const submitRate = totalClicks > 0 ? ((submitActions / totalClicks) * 100).toFixed(2) : '0'
    const skipRate = totalClicks > 0 ? ((skipActions / totalClicks) * 100).toFixed(2) : '0'
    const emailCaptureRate = submitActions > 0 ? ((recordsWithEmail / submitActions) * 100).toFixed(2) : '0'
    
    // 準備分析數據
    const analyticsData = [
      ['指標', '數值', '更新時間'],
      ['總點擊次數', totalClicks, new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })],
      ['純點擊 (click)', clickActions, ''],
      ['提交表單 (submit)', submitActions, ''],
      ['跳過表單 (skip)', skipActions, ''],
      ['', '', ''],
      ['表單提交率', `${submitRate}%`, ''],
      ['表單跳過率', `${skipRate}%`, ''],
      ['', '', ''],
      ['有 Email 的記錄', recordsWithEmail, ''],
      ['有電話的記錄', recordsWithPhone, ''],
      ['有姓名的記錄', recordsWithName, ''],
      ['Email 收集率 (相對於提交)', `${emailCaptureRate}%`, ''],
      ['', '', ''],
      ['iOS 點擊', iosCount, ''],
      ['Android 點擊', androidCount, ''],
      ['', '', ''],
      ['願意接收通知', newsletterYes, ''],
      ['通知訂閱率', submitActions > 0 ? `${((newsletterYes / submitActions) * 100).toFixed(2)}%` : '0%', ''],
    ]

    // 先嘗試創建 Analytics 工作表（如果不存在）
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: 'Analytics',
                gridProperties: {
                  rowCount: 30,
                  columnCount: 5
                }
              }
            }
          }]
        }
      })
      console.log('Created Analytics sheet')
    } catch (addSheetError: unknown) {
      // 工作表可能已存在，這是正常的
      const errorMessage = addSheetError instanceof Error ? addSheetError.message : String(addSheetError)
      if (!errorMessage?.includes('already exists')) {
        console.log('Analytics sheet already exists or error creating:', errorMessage)
      }
    }
    
    // 寫入或更新 Analytics 工作表
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'Analytics!A1:C20',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: analyticsData,
      },
    })

    console.log('Analytics updated successfully')
  } catch (error) {
    console.error('Error calculating analytics:', error)
  }
}

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
    data.action || 'click',
    data.userData?.name || '',
    data.userData?.email || '',
    data.userData?.phone || '',
    data.userData?.interest || '',
    data.userData?.newsletter ? '是' : '',
    data.ipAddress || '',
    data.userAgent || '',
    data.deviceType || '',
    data.referrer || '',
    new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
  ]]

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:M`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    })

    // 計算並更新分析數據
    await calculateAnalytics(sheets, sheetId)
    
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
    const { platform, action = 'click', userData } = body

    if (!platform || !['ios', 'android'].includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform specified' },
        { status: 400 }
      )
    }

    if (!['click', 'submit', 'skip'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action specified' },
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
      action,
      timestamp: new Date().toISOString(),
      userAgent,
      referrer,
      deviceType: detectDeviceType(userAgent),
      ipAddress,
      userData: userData || undefined,
    }

    await appendToSheet(trackingData)

    return NextResponse.json({
      success: true,
      message: 'Download tracked successfully',
      data: {
        platform,
        action,
        timestamp: trackingData.timestamp,
        deviceType: trackingData.deviceType,
        hasUserData: !!userData
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