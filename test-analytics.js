// Test script for analytics tracking

async function testAnalytics() {
  const baseUrl = 'http://localhost:3000/api/track-download';
  
  console.log('Testing Analytics Tracking...\n');
  console.log('This will add sample data to test the analytics calculations\n');
  
  // 產生一些測試資料
  const testScenarios = [
    // 5 個純點擊
    { platform: 'ios', action: 'click' },
    { platform: 'android', action: 'click' },
    { platform: 'ios', action: 'click' },
    { platform: 'android', action: 'click' },
    { platform: 'ios', action: 'click' },
    
    // 3 個跳過
    { platform: 'ios', action: 'skip' },
    { platform: 'android', action: 'skip' },
    { platform: 'ios', action: 'skip' },
    
    // 2 個完整提交
    {
      platform: 'ios',
      action: 'submit',
      userData: {
        name: '張三',
        email: 'zhang@example.com',
        phone: '0912345678',
        interest: '需要情感支持',
        newsletter: true
      }
    },
    {
      platform: 'android',
      action: 'submit',
      userData: {
        name: '李四',
        email: 'li@example.com',
        phone: '0987654321',
        interest: '想找人聊天',
        newsletter: true
      }
    },
    
    // 1 個部分提交（只有 email）
    {
      platform: 'ios',
      action: 'submit',
      userData: {
        email: 'test@example.com',
        newsletter: false
      }
    },
    
    // 1 個部分提交（沒有 email）
    {
      platform: 'android',
      action: 'submit',
      userData: {
        name: '王五',
        interest: '好奇想試試',
      }
    }
  ];
  
  console.log(`將發送 ${testScenarios.length} 筆測試資料...\n`);
  
  for (let i = 0; i < testScenarios.length; i++) {
    const scenario = testScenarios[i];
    const userAgents = [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)',
      'Mozilla/5.0 (Linux; Android 11; SM-G991B)',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    ];
    
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': userAgents[i % userAgents.length]
        },
        body: JSON.stringify(scenario)
      });
      
      const data = await response.json();
      console.log(`[${i + 1}/${testScenarios.length}] ${scenario.action} - ${scenario.platform}: ${response.status === 200 ? '✓' : '✗'}`);
      
      if (response.status !== 200) {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error(`[${i + 1}] Error:`, error.message);
    }
    
    // 避免太快發送請求
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n測試完成！請檢查 Google Sheets 中的：');
  console.log('1. Downloads 工作表 - 應該有新增的測試資料');
  console.log('2. Analytics 工作表 - 應該顯示以下統計：');
  console.log('   - 總點擊次數: 13');
  console.log('   - 純點擊: 5');
  console.log('   - 提交表單: 4');
  console.log('   - 跳過表單: 3');
  console.log('   - 表單提交率: ~30.77%');
  console.log('   - Email 收集率: 75% (3/4 提交有 email)');
}

testAnalytics();