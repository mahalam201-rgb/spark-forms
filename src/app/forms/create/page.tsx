'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, X, Save } from 'lucide-react'

interface Question {
  id: string
  title: string
  type: 'short-answer' | 'long-answer' | 'multiple-choice' | 'dropdown' | 'checkboxes'
  options?: string[]
  required: boolean
}

export default function CreateForm() {
  const router = useRouter()
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      title: '',
      type: 'short-answer',
      required: false,
    }
    setQuestions([...questions, newQuestion])
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map(q => q.id === id ? { ...q, ...updates } : q)
    )
  }

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: [...(q.options || []), `Option ${(q.options?.length || 0) + 1}`]
          }
        }
        return q
      })
    )
  }

  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          const newOptions = [...(q.options || [])]
          newOptions[index] = value
          return { ...q, options: newOptions }
        }
        return q
      })
    )
  }

  const removeOption = (questionId: string, index: number) => {
    setQuestions(
      questions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            options: q.options?.filter((_, i) => i !== index) || []
          }
        }
        return q
      })
    )
  }

  const saveForm = () => {
    if (!formTitle.trim()) {
      alert('Please enter a form title')
      return
    }

    const newForm = {
      id: Date.now().toString(),
      title: formTitle,
      description: formDescription,
      questions: questions.length,
      responses: 0,
      lastUpdated: new Date().toISOString(),
      created: new Date().toISOString(),
      questionData: questions,
    }

    const existingForms = JSON.parse(localStorage.getItem('sparkforms_data') || '[]')
    existingForms.push(newForm)
    localStorage.setItem('sparkforms_data', JSON.stringify(existingForms))

    router.push('/dashboard')
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
              <button
                onClick={saveForm}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
              >
                <Save size={20} />
                Save Form
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Form Header */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm border border-gray-200">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Form Title
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g., Customer Feedback Survey"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Form Description
            </label>
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Tell respondents what this form is about..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              rows={3}
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-4 mb-8">
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 mb-4">No questions yet. Add your first question!</p>
            </div>
          ) : (
            questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Question {index + 1}
                    </label>
                    <input
                      type="text"
                      value={question.title}
                      onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                      placeholder="Enter your question..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={question.type}
                      onChange={(e) =>
                        updateQuestion(question.id, {
                          type: e.target.value as any,
                          options:
                            ['multiple-choice', 'dropdown', 'checkboxes'].includes(
                              e.target.value
                            )
                              ? ['Option 1', 'Option 2']
                              : undefined,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    >
                      <option value="short-answer">Short Answer</option>
                      <option value="long-answer">Long Answer</option>
                      <option value="multiple-choice">Multiple Choice</option>
                      <option value="dropdown">Dropdown</option>
                      <option value="checkboxes">Checkboxes</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) =>
                          updateQuestion(question.id, { required: e.target.checked })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium text-gray-700">Required</span>
                    </label>
                  </div>
                </div>

                {/* Options for choice-based questions */}
                {['multiple-choice', 'dropdown', 'checkboxes'].includes(question.type) && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Options</label>
                    {question.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateOption(question.id, optionIndex, e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                        <button
                          onClick={() => removeOption(question.id, optionIndex)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addOption(question.id)}
                      className="text-sm text-purple-600 font-medium hover:text-purple-700"
                    >
                      + Add Option
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className="flex items-center justify-center gap-2 w-full px-6 py-4 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          <Plus size={20} />
          Add Question
        </button>
      </div>
    </div>
  )
}
