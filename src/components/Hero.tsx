'use client'

import React from 'react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
          <span className="text-gray-900">Forms powered by </span>
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Create, share, and analyze forms in seconds. Let AI generate your questions or build them yourself with our modern, intuitive builder.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link 
            href="/dashboard"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-semibold hover:shadow-2xl transition-shadow text-lg"
          >
            Get Started for Free
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-lg font-semibold mb-2">AI Form Generator</h3>
            <p className="text-gray-600">Just type a topic and let our AI generate a complete, ready-to-use form with relevant questions.</p>
          </div>

          <div className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">Visualize responses instantly with beautiful charts, graphs, and detailed summaries.</p>
          </div>

          <div className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
            <p className="text-gray-600">Share via link, QR code, WhatsApp, or Telegram. Export data to PDF or CSV with one click.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
