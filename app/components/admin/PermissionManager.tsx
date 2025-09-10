'use client'
import { useState } from 'react'
import { Check, X } from 'lucide-react'
import React from 'react'

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
}

interface PermissionManagerProps {
  onSave: (roles: Role[]) => void
}

export default function PermissionManager({ onSave }: PermissionManagerProps) {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'super-admin',
      name: 'Super Admin',
      description: 'Tüm yetkilere sahip',
      permissions: ['users', 'flights', 'payments', 'reports', 'settings', 'admin']
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Çoğu yetkiye sahip',
      permissions: ['users', 'flights', 'payments', 'reports']
    },
    {
      id: 'moderator',
      name: 'Moderator',
      description: 'Sınırlı yetkiye sahip',
      permissions: ['users', 'flights']
    },
    {
      id: 'sales',
      name: 'Satış',
      description: 'Satış işlemleri ve müşteri yönetimi',
      permissions: ['users', 'flights', 'payments']
    },
    {
      id: 'representative',
      name: 'Temsilci',
      description: 'Müşteri temsilcisi yetkileri',
      permissions: ['users', 'flights']
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Sadece görüntüleme',
      permissions: ['reports']
    }
  ])

  const permissions: Permission[] = [
    { id: 'users', name: 'Kullanıcı Yönetimi', description: 'Kullanıcıları görüntüleme, düzenleme, silme', category: 'Yönetim' },
    { id: 'flights', name: 'Uçuş Yönetimi', description: 'Uçuşları görüntüleme, düzenleme, silme', category: 'Yönetim' },
    { id: 'payments', name: 'Ödeme Yönetimi', description: 'Ödemeleri görüntüleme, onaylama', category: 'Finans' },
    { id: 'reports', name: 'Raporlar', description: 'Raporları görüntüleme, oluşturma', category: 'Analiz' },
    { id: 'settings', name: 'Sistem Ayarları', description: 'Site ayarlarını düzenleme', category: 'Sistem' },
    { id: 'admin', name: 'Admin Yönetimi', description: 'Admin kullanıcılarını yönetme', category: 'Sistem' }
  ]

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permissionId)
        return {
          ...role,
          permissions: hasPermission
            ? role.permissions.filter(p => p !== permissionId)
            : [...role.permissions, permissionId]
        }
      }
      return role
    }))
  }

  const getPermissionCategory = (category: string) => {
    const categoryPermissions = permissions.filter(p => p.category === category)
    return categoryPermissions
  }

  const categories = Array.from(new Set(permissions.map(p => p.category)))

  return (
    <div className="space-y-6">
      {/* Yetki Matrisi */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yetki
              </th>
              {roles.map(role => (
                <th key={role.id} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {role.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map(category => (
              <React.Fragment key={category}>
                <tr className="bg-gray-50">
                  <td colSpan={roles.length + 1} className="px-6 py-2">
                    <h4 className="text-sm font-medium text-gray-900">{category}</h4>
                  </td>
                </tr>
                {getPermissionCategory(category).map(permission => (
                  <tr key={permission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                        <div className="text-sm text-gray-500">{permission.description}</div>
                      </div>
                    </td>
                    {roles.map(role => (
                      <td key={role.id} className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handlePermissionToggle(role.id, permission.id)}
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                            role.permissions.includes(permission.id)
                              ? 'bg-green-100 text-green-600 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {role.permissions.includes(permission.id) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={() => onSave(roles)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Yetkileri Kaydet
        </button>
      </div>
    </div>
  )
} 