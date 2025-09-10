'use client'
import { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import AdminList from '../../components/admin/AdminList'
import AdminForm from '../../components/admin/AdminForm'
import PermissionManager from '../../components/admin/PermissionManager'

export default function AdminYonetimiPage() {
  const [activeTab, setActiveTab] = useState('ayarlar')
  const [activeAdminTab, setActiveAdminTab] = useState('liste')

  // Örnek admin verileri
  const [admins] = useState([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@gurbet.biz',
      role: 'Super Admin',
      status: 'active' as const,
      lastLogin: '2 saat önce',
      createdAt: '15.03.2024'
    },
    {
      id: 2,
      name: 'Fatma Demir',
      email: 'fatma@gurbet.biz',
      role: 'Admin',
      status: 'active' as const,
      lastLogin: '1 gün önce',
      createdAt: '10.02.2024'
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      email: 'mehmet@gurbet.biz',
      role: 'Moderator',
      status: 'inactive' as const,
      lastLogin: '3 gün önce',
      createdAt: '05.01.2024'
    },
    {
      id: 4,
      name: 'Ayşe Özkan',
      email: 'ayse@gurbet.biz',
      role: 'Satış',
      status: 'active' as const,
      lastLogin: '5 saat önce',
      createdAt: '20.06.2024'
    },
    {
      id: 5,
      name: 'Can Yıldız',
      email: 'can@gurbet.biz',
      role: 'Temsilci',
      status: 'active' as const,
      lastLogin: '1 saat önce',
      createdAt: '25.06.2024'
    }
  ])

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sağ İçerik Alanı */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header */}
        <Header />

        {/* Ana İçerik */}
        <main className="flex-1 p-4 w-full">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Admin Yönetimi</h1>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveAdminTab('liste')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeAdminTab === 'liste'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Admin Listesi
                </button>
                <button
                  onClick={() => setActiveAdminTab('ekle')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeAdminTab === 'ekle'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Yeni Admin Ekle
                </button>
                <button
                  onClick={() => setActiveAdminTab('yetkiler')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeAdminTab === 'yetkiler'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Yetki Yönetimi
                </button>
              </nav>
            </div>

            {/* Tab İçerikleri */}
            {activeAdminTab === 'liste' && (
              <AdminList admins={admins} />
            )}

            {activeAdminTab === 'ekle' && (
              <AdminForm />
            )}

            {activeAdminTab === 'yetkiler' && (
              <PermissionManager />
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 