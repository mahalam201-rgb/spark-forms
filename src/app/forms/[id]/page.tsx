'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Question {
  id: string
  title: string
  type: 'short-answer' | 'long-answer' | 'multiple-choice' | 'dropdown' | 'checkboxes'
  options?: string[]
  required: boolean
}

interface FormData {
  id: string
  title: string
  description: string
  questionData: Question[]
}

export default function ViewForm() {
  const params = useParams()
  const [form, setForm] = useState<FormData | null>(null)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const forms = JSON.parse(localStorage.getItem('sparkforms_data') || '[]')
    const currentForm = forms.find((f: any) => f.id === params.id)
    if (currentForm) {
      setForm(currentForm)
    }
    setLoading(false)
  }, [params.id])

  const handleResponse = (questionId: string, value: any) => {
    setResponses({
      ...responses,
      [questionId]: value,
    })
  }

  const handleSubmit = () => {
    // Save response
    const allResponses = JSON.parse(
      localStorage.getItem(`responses_${params.id}`) || '[]'
    )
    allResponses.push({
      timestamp: new Date().toISOString(),
      data: responses,
    })
    localStorage.setItem(`responses_${params.id}`, JSON.stringify(allResponses))

    // Update form response count
    const forms = JSON.parse(localStorage.getItem('sparkforms_data') || '[]')
    const updatedForms = forms.map((f: any) =>
      f.id === params.id ? { ...f, responses: f.responses + 1 } : f
    )
    localStorage.setItem('sparkforms_data', JSON.stringify(updatedForms))

    setSubmitted(true)
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
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank you!</h2>
          <p className="text-gray-600 mb-8">Your response has been recorded.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Spark Forms
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Form Header */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm border border-gray-200">
          <div className="h-24 bg-gradient-to-br from-purple-200 to-blue-200 rounded-lg mb-6"></div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{form.title}</h1>
          <p className="text-gray-600 mb-4">{form.description}</p>
          <p className="text-sm text-gray-500">{form.questionData.length} questions</p>
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {form.questionData.map((question, index) => (
            <div
              key={question.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <label className="block font-semibold text-gray-900 mb-4">
                {index + 1}. {question.title}
                {question.required && <span className="text-red-500"> *</span>}
              </label>

              {question.type === 'short-answer' && (
                <input
                  type="text"
                  onChange={(e) => handleResponse(question.id, e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              )}

              {question.type === 'long-answer' && (
                <textarea
                  onChange={(e) => handleResponse(question.id, e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  rows={4}
                />
              )}

              {question.type === 'multiple-choice' && (
                <div className="space-y-2">
                  {question.options?.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        onChange={(e) => handleResponse(question.id, e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'dropdown' && (
                <select
                  onChange={(e) => handleResponse(question.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="">Select an option...</option>
                  {question.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {question.type === 'checkboxes' && (
                <div className="space-y-2">
                  {question.options?.map((option, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        onChange={(e) => {
                          const current = responses[question.id] || []
                          if (e.target.checked) {
                            handleResponse(question.id, [...current, option])
                          } else {
                            handleResponse(
                              question.id,
                              current.filter((v: string) => v !== option)
                            )
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow text-lg"
        >
          Submit
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          This form collects responses to help improve our services.
        </p>
      </div>
    </div>
  )
}
