'use client'

import { useState, useEffect } from 'react'
import { Save, RefreshCw, Eye, Search, Globe, Share2, Shield, Tag } from 'lucide-react'

interface SeoSettings {
  siteTitle: string
  siteDescription: string
  keywords: string[]
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  canonicalUrl: string
  robotsIndex: boolean
  robotsFollow: boolean
  googleVerification: string
  yandexVerification: string
}

export default function SeoPage() {
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    siteTitle: 'Gurbet.biz - Yurt Dışı Seyahat Platformu',
    siteDescription: 'Yurt dışı seyahatleriniz için en uygun fiyatlı uçak bileti, otel ve araç kiralama hizmetleri.',
    keywords: ['uçak bileti', 'yurt dışı seyahat', 'otel rezervasyonu', 'araç kiralama', 'gurbet', 'seyahat platformu'],
    ogTitle: 'Gurbet.biz - Yurt Dışı Seyahat Platformu',
    ogDescription: 'Yurt dışı seyahatleriniz için en uygun fiyatlı uçak bileti, otel ve araç kiralama hizmetleri.',
    ogImage: '/images/og-image.jpg',
    twitterTitle: 'Gurbet.biz - Yurt Dışı Seyahat Platformu',
    twitterDescription: 'Yurt dışı seyahatleriniz için en uygun fiyatlı uçak bileti, otel ve araç kiralama hizmetleri.',
    twitterImage: '/images/og-image.jpg',
    canonicalUrl: 'https://gurbet.biz',
    robotsIndex: true,
    robotsFollow: true,
    googleVerification: '',
    yandexVerification: ''
  })

  const [newKeyword, setNewKeyword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const addKeyword = () => {
    if (newKeyword.trim() && !seoSettings.keywords.includes(newKeyword.trim())) {
      setSeoSettings(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (index: number) => {
    setSeoSettings(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // API çağrısı burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000)) // Demo delay
      setMessage('SEO ayarları başarıyla kaydedildi!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Hata: SEO ayarları kaydedilemedi!')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreview = () => {
    // Ana siteyi yeni sekmede aç
    window.open('http://localhost:4000', '_blank')
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SEO Yönetimi</h1>
            <p className="text-gray-600 mt-1">Site SEO ayarlarını yönetin ve optimize edin</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handlePreview}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>Önizleme</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Kaydet</span>
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('başarıyla') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* SEO Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Temel SEO Ayarları */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Temel SEO Ayarları</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Başlığı
                </label>
                <input
                  type="text"
                  value={seoSettings.siteTitle}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Site başlığını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Açıklaması
                </label>
                <textarea
                  value={seoSettings.siteDescription}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Site açıklamasını girin"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {seoSettings.siteDescription.length}/160 karakter
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anahtar Kelimeler
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Anahtar kelime ekle"
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Tag className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {seoSettings.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      <span>{keyword}</span>
                      <button
                        onClick={() => removeKeyword(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={seoSettings.canonicalUrl}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://gurbet.biz"
                />
              </div>
            </div>
          </div>

          {/* Open Graph Ayarları */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Share2 className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Sosyal Medya (Open Graph)</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook/LinkedIn Başlığı
                </label>
                <input
                  type="text"
                  value={seoSettings.ogTitle}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, ogTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook/LinkedIn Açıklaması
                </label>
                <textarea
                  value={seoSettings.ogDescription}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, ogDescription: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook/LinkedIn Resmi
                </label>
                <input
                  type="url"
                  value={seoSettings.ogImage}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, ogImage: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/images/og-image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter Başlığı
                </label>
                <input
                  type="text"
                  value={seoSettings.twitterTitle}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, twitterTitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter Açıklaması
                </label>
                <textarea
                  value={seoSettings.twitterDescription}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, twitterDescription: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Robots ve Verification */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Robots ve Verification</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={seoSettings.robotsIndex}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, robotsIndex: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Index (Arama motorlarında göster)</span>
                </label>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={seoSettings.robotsFollow}
                    onChange={(e) => setSeoSettings(prev => ({ ...prev, robotsFollow: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Follow (Linkleri takip et)</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Verification Code
                </label>
                <input
                  type="text"
                  value={seoSettings.googleVerification}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, googleVerification: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Google Search Console verification code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yandex Verification Code
                </label>
                <input
                  type="text"
                  value={seoSettings.yandexVerification}
                  onChange={(e) => setSeoSettings(prev => ({ ...prev, yandexVerification: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yandex Webmaster verification code"
                />
              </div>
            </div>
          </div>

          {/* SEO İstatistikleri */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-5 w-5 text-orange-600" />
              <h2 className="text-lg font-semibold text-gray-900">SEO İstatistikleri</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">95</div>
                  <div className="text-sm text-gray-600">SEO Skoru</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Anahtar Kelime</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meta Title</span>
                  <span className="text-green-600">✓ Optimize</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Meta Description</span>
                  <span className="text-green-600">✓ Optimize</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Open Graph</span>
                  <span className="text-green-600">✓ Optimize</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Robots.txt</span>
                  <span className="text-green-600">✓ Mevcut</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sitemap.xml</span>
                  <span className="text-green-600">✓ Mevcut</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




