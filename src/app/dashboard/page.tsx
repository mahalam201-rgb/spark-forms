'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlusCircle, Trash2, Eye } from 'lucide-react'

interface Form {
  id: string
  title: string
  description: string
  questions: number
  responses: number
  lastUpdated: string
  created: string
}

export default function Dashboard() {
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load forms from localStorage
    const savedForms = localStorage.getItem('sparkforms_data')
    if (savedForms) {
      setForms(JSON.parse(savedForms))
    }
    setLoading(false)
  }, [])

  const deleteForm = (id: string) => {
    const updated = forms.filter(f => f.id !== id)
    setForms(updated)
    localStorage.setItem('sparkforms_data', JSON.stringify(updated))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Spark Forms
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <button className="px-6 py-2 text-gray-700 font-medium hover:text-gray-900">
                Profile
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-medium hover:shadow-lg transition-shadow">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Forms</h1>
            <p className="text-gray-600">Create and manage your forms</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/forms/create"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              <PlusCircle size={20} />
              Create Form
            </Link>
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-colors">
              <span className="text-xl">✨</span>
              Generate with AI
            </button>
          </div>
        </div>

        {/* Forms Grid */}
        {forms.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No forms yet</h2>
            <p className="text-gray-600 mb-8">Create your first form to get started</p>
            <Link
              href="/forms/create"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              Create Your First Form
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div
                key={form.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="h-32 bg-gradient-to-br from-purple-200 to-blue-200"></div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                    {form.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {form.description || 'No description'}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs">Questions</p>
                      <p className="text-lg font-semibold text-gray-900">{form.questions}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Responses</p>
                      <p className="text-lg font-semibold text-gray-900">{form.responses}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mb-4">
                    Updated {new Date(form.lastUpdated).toLocaleDateString()}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      href={`/forms/${form.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                    <Link
                      href={`/forms/${form.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-50 text-purple-600 rounded font-medium hover:bg-purple-100 transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteForm(form.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded font-medium hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
