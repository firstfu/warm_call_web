'use client'

import { useState, useEffect } from 'react'

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  platform: 'ios' | 'android'
  onSubmit: (userData: UserData | null, action: 'submit' | 'skip') => void
}

interface UserData {
  name?: string
  email?: string
  phone?: string
  interest?: string
  newsletter?: boolean
}

export default function WaitlistModal({ isOpen, onSubmit }: WaitlistModalProps) {
  const [formData, setFormData] = useState<UserData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    newsletter: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const hasData = formData.email || formData.name || formData.phone || formData.interest
    
    if (hasData) {
      await onSubmit(formData, 'submit')
    } else {
      await onSubmit(null, 'skip')
    }
    
    setIsSubmitting(false)
  }

  const handleSkip = async () => {
    setIsSubmitting(true)
    await onSubmit(null, 'skip')
    setIsSubmitting(false)
  }

  const handleBackdropClick = async () => {
    setIsSubmitting(true)
    await onSubmit(null, 'skip')
    setIsSubmitting(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleBackdropClick}
      />
      
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-300">
        <button
          onClick={handleBackdropClick}
          disabled={isSubmitting}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
          aria-label="關閉"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-warm-400 to-purple-400 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              成為首批體驗用戶
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              留下聯絡方式，App 上線時第一時間通知您
            </p>
            
            <div className="inline-flex items-center gap-2 bg-warm-100 dark:bg-warm-900/20 text-warm-700 dark:text-warm-400 px-3 py-1.5 rounded-full text-sm font-medium mt-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              首批用戶享專屬優惠
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                姓名
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-warm-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
                placeholder="您的姓名（選填）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-warm-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
                placeholder="example@email.com（選填）"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                用於接收上線通知與專屬優惠
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                電話
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-warm-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
                placeholder="您的電話號碼（選填）"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                為什麼對暖心來電感興趣？
              </label>
              <textarea
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-warm-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all resize-none"
                placeholder="分享您的想法（選填）"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                checked={formData.newsletter}
                onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                className="w-4 h-4 text-warm-600 border-gray-300 rounded focus:ring-warm-500"
              />
              <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                願意接收產品更新與優惠訊息
              </label>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-warm-500 to-warm-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    處理中...
                  </span>
                ) : (
                  '獲取優先體驗'
                )}
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                稍後再說
              </button>
            </div>
          </form>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            您的資料將被安全保存，僅用於產品通知
          </p>
        </div>
      </div>
    </div>
  )
}