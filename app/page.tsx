'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.fade-in-section')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-100 to-white dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-warm-300 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className={`max-w-5xl mx-auto text-center z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warm-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-warm-500"></span>
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">24小時陪伴不打烊</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-warm-600 to-purple-600 bg-clip-text text-transparent">
            暖心來電
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            在你最需要的時刻，給你最溫暖的陪伴
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
            一通來電，一份關懷。讓溫暖的聲音陪你度過每個需要支持的時刻
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-warm-500 to-warm-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <span className="flex items-center gap-2">
                立即下載 App
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="px-8 py-4 bg-white dark:bg-gray-800 text-warm-600 dark:text-warm-400 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 border border-warm-200 dark:border-warm-800">
              了解更多
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-warm-600 mb-1">50萬+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">溫暖陪伴次數</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warm-600 mb-1">4.8⭐</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">用戶滿意度</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warm-600 mb-1">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">隨時陪伴</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 px-4 fade-in-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
            你是否也有這樣的時刻？
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">深夜獨處</h3>
              <p className="text-gray-600 dark:text-gray-400">
                加班後回到空蕩的房間，想找人說說話，卻不知道該打給誰
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">壓力爆表</h3>
              <p className="text-gray-600 dark:text-gray-400">
                工作遇到挫折，想聽聽鼓勵的話，但不想讓家人朋友擔心
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">思念家人</h3>
              <p className="text-gray-600 dark:text-gray-400">
                異鄉打拼特別想家，渴望聽到熟悉的關懷聲音
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-warm-50 dark:from-gray-900 dark:to-gray-800 fade-in-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            專為你設計的溫暖功能
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
            每個功能都是為了給你最貼心、最即時的情感支持
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-r from-warm-400 to-warm-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">即時來電</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  一鍵觸發，10秒內接到溫暖來電，立即獲得情感支持
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">預約關懷</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  設定每日暖心時刻，讓關懷成為你生活中的期待
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-r from-warm-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">角色扮演</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  選擇媽媽、摯友、伴侶等角色，聽到最想聽的聲音
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-warm-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">傾訴模式</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  安全的情緒出口，說出心裡話，釋放內心壓力
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-r from-warm-500 to-warm-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">情境定制</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  豐富場景選擇，從晚安到加油，總有適合當下的溫暖
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">隱私安全</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  端對端加密，你的情緒和秘密永遠安全私密
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 fade-in-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
            簡單三步，溫暖即達
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-warm-300 via-purple-300 to-warm-300"></div>
            
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg relative z-10">
                <div className="w-12 h-12 bg-warm-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">選擇場景</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  根據當下心情，選擇最適合的關懷場景
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg relative z-10">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">定制體驗</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  選擇喜歡的聲音和角色，讓體驗更貼心
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg relative z-10">
                <div className="w-12 h-12 bg-warm-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">接聽溫暖</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  接起來電，讓溫暖的聲音陪伴你
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black fade-in-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
            每個時刻，都值得被溫柔以待
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-warm-400 to-warm-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">深夜失眠時</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  當夜深人靜，輾轉難眠，一通溫柔的晚安來電，陪你慢慢入睡
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">清晨起床前</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  新的一天開始，先接一通充滿正能量的早安電話，讓今天充滿動力
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-warm-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">工作受挫後</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  專案失敗、被主管責罵，聽聽鼓勵的話語，重新找回自信
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-warm-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">重要時刻前</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  面試、考試、提案前，接一通加油打氣的來電，讓你更有信心
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 fade-in-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800 dark:text-gray-200">
            聽聽他們的暖心故事
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-warm-400 to-warm-600 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">小琳</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">設計師</div>
                </div>
                <div className="ml-auto text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "每天晚上10點的預約來電，已經成為我最期待的時刻。像是有個朋友每天都記得關心我。"
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">阿哲</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">大學生</div>
                </div>
                <div className="ml-auto text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "期中考壓力很大的時候，媽媽角色的關懷來電真的讓我哭了，就像真的媽媽在身邊。"
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-warm-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">美美</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">行銷專員</div>
                </div>
                <div className="ml-auto text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                "傾訴模式讓我可以說出心裡話，即使知道是AI，但那份被聆聽的感覺很真實。"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-warm-500 via-purple-500 to-warm-500 fade-in-section opacity-0 translate-y-10 transition-all duration-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            現在就開始你的暖心旅程
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            下載暖心來電，讓每一天都充滿溫暖陪伴
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group px-8 py-4 bg-white text-warm-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
              <span className="flex items-center justify-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.05-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                App Store
              </span>
            </button>
            <button className="group px-8 py-4 bg-white text-warm-600 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
              <span className="flex items-center justify-center gap-3">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l13.69 8.5c.65.4.65 1.29 0 1.7l-13.69 8.5c-.5.24-1.84.24-1.84-.35zm4.58-8.43L16 7v10l-8.42-4.93z"/>
                </svg>
                Google Play
              </span>
            </button>
          </div>

          <p className="mt-8 text-white/80">
            免費下載，部分進階功能需付費解鎖
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-warm-600 to-purple-600 bg-clip-text text-transparent">
                暖心來電
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                你的口袋裡的溫暖避風港
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">產品</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-warm-600 transition-colors">功能介紹</a></li>
                <li><a href="#" className="hover:text-warm-600 transition-colors">使用教學</a></li>
                <li><a href="#" className="hover:text-warm-600 transition-colors">價格方案</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">支援</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-warm-600 transition-colors">常見問題</a></li>
                <li><a href="#" className="hover:text-warm-600 transition-colors">聯絡我們</a></li>
                <li><a href="#" className="hover:text-warm-600 transition-colors">意見回饋</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">關於</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="#" className="hover:text-warm-600 transition-colors">品牌故事</a></li>
                <li><a href="#" className="hover:text-warm-600 transition-colors">隱私政策</a></li>
                <li><a href="#" className="hover:text-warm-600 transition-colors">使用條款</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2025 暖心來電 WarmCall. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: animate-in 0.6s ease-out forwards;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  )
}