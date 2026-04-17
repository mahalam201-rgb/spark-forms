'use client'

import React from 'react'

export default function Features() {
  const features = [
    {
      icon: '✨',
      title: 'AI Form Generator',
      description: 'Just type a topic and let our AI generate a complete, ready-to-use form with relevant questions.',
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Visualize responses instantly with beautiful charts, graphs, and detailed summaries.',
    },
    {
      icon: '🔗',
      title: 'Easy Sharing',
      description: 'Share via link, QR code, WhatsApp, or Telegram. Export data to PDF or CSV with one click.',
    },
    {
      icon: '🎨',
      title: 'Beautiful Forms',
      description: 'Create stunning, professional-looking forms with our intuitive drag-and-drop builder.',
    },
    {
      icon: '🔐',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. Control who can access and respond to your forms.',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built for performance. Forms load instantly and handle thousands of responses.',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
