'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { BarChart3, Download, ArrowLeft } from 'lucide-react'

interface Response {
  timestamp: string
  data: Record<string, any>
}

interface Question {
  id: string
  title: string
  type: string
}

interface FormData {
  id: string
  title: string
  questionData: Question[]
  responses: number
}

export default function FormResponses() {
  const params = useParams()
  const [form, setForm] = useState<FormData | null>(null)
  const [responses, setResponses] = useState<Response[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem('sparkforms_data') || '[]')
    const currentForm = forms.find((f: any) => f.id === params.id)
    if (currentForm) {
      setForm(currentForm)

      const formResponses = JSON.parse(
        localStorage.getItem(`responses_${params.id}`) || '[]'
      )
      setResponses(formResponses)
    }
    setLoading(false)
  }, [params.id])

  const downloadCSV = () => {
    if (!form) return

    // Create CSV header
    const headers = ['Timestamp', ...form.questionData.map(q => q.title)]
    const csvContent = [
      headers.join(','),
      ...responses.map(response => [
        new Date(response.timestamp).toLocaleString(),
        ...form.questionData.map(q => {
          const value = response.data[q.id]
          if (Array.isArray(value)) {
            return `"${value.join('; ')}"`
          }
          return `"${value || ''}"`
        })
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.title}-responses.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Form not found</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <ArrowLeft size={20} />
              Back
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Form Responses</h1>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Form Info */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{form.title}</h2>
          <p className="text-gray-600 mb-4">
            <BarChart3 className="inline mr-2" size={20} />
            {responses.length} Response{responses.length !== 1 ? 's' : ''} Received
          </p>
        </div>

        {/* Responses Table */}
        {responses.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-200">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No responses yet</h3>
            <p className="text-gray-600">
              Share your form to start collecting responses
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Timestamp
                    </th>
                    {form.questionData.map(question => (
                      <th
                        key={question.id}
                        className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      >
                        {question.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {responses.map((response, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(response.timestamp).toLocaleString()}
                      </td>
                      {form.questionData.map(question => (
                        <td key={question.id} className="px-6 py-4 text-sm text-gray-700">
                          {Array.isArray(response.data[question.id])
                            ? response.data[question.id].join('; ')
                            : response.data[question.id] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
