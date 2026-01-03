'use client'

import { Button } from '@/components/ui/button'
import { AuthModal } from '../auth/auth'
import { useState } from 'react'
import { BookOpen, Pen, Users, Sparkles, ArrowRight, Check } from 'lucide-react'

export function LandingWithoutSession() {
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>(
    'login',
  )

  const features = [
    {
      icon: <Pen className="w-6 h-6" />,
      title: 'Write & Share',
      description:
        'Express your thoughts and share your stories with millions of readers worldwide.',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Discover Stories',
      description:
        'Explore diverse perspectives and quality content curated just for you.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Connect & Grow',
      description:
        'Build your audience and connect with a community of passionate writers and readers.',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Get Inspired',
      description:
        'Find inspiration from thought leaders, experts, and creative minds across the globe.',
    },
  ]

  const benefits = [
    'Distraction-free writing experience',
    'Built-in audience of millions',
    'Powerful analytics and insights',
    'Earn money from your writing',
    'No ads, just great content',
    'Simple and elegant design',
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold tracking-tight">Medium</h1>
            </div>

            {/* Auth Buttons */}
            <div className="flex gap-4 items-center">
              <Button
                onClick={() => {
                  setShowAuthModal(true)
                  setAuthModalType('login')
                }}
                variant="outline"
                className="border-2 border-black hover:bg-black hover:text-white transition-colors rounded-lg"
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setShowAuthModal(true)
                  setAuthModalType('signup')
                }}
                className="bg-black text-white hover:bg-gray-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Where good ideas
              <br />
              find you
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Read and share ideas from independent voices, world-class
              publications, and experts from around the globe.
            </p>
            <Button
              onClick={() => {
                setShowAuthModal(true)
                setAuthModalType('signup')
              }}
              className="bg-black text-white hover:bg-gray-800 rounded-full text-lg px-12 py-6 h-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Start reading <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 hidden md:block">
          <div className="w-32 h-32 border-4 border-black rounded-full flex items-center justify-center">
            <Pen className="w-12 h-12" />
          </div>
        </div>
        <div className="absolute bottom-20 right-10 hidden md:block">
          <div className="w-40 h-40 border-4 border-black rounded-lg rotate-12 flex items-center justify-center">
            <BookOpen className="w-16 h-16" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why choose Medium?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="border-2 border-white p-8 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <div className="mb-4 inline-block p-3 bg-white text-black group-hover:bg-black group-hover:text-white transition-colors rounded-lg">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3">{feature.title}</h4>
                <p className="text-gray-300 group-hover:text-gray-600 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-8">
                Everything you need to share your story
              </h3>
              <p className="text-xl text-gray-600 mb-8">
                Medium provides all the tools you need to write, publish, and
                build an audience. Focus on what matters—your content.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="border-4 border-black rounded-2xl p-8 bg-gray-50 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="space-y-4">
                  <div className="h-4 bg-black rounded w-3/4" />
                  <div className="h-4 bg-gray-300 rounded w-full" />
                  <div className="h-4 bg-gray-300 rounded w-5/6" />
                  <div className="h-32 bg-gray-200 rounded-lg mt-6" />
                  <div className="h-4 bg-gray-300 rounded w-full" />
                  <div className="h-4 bg-gray-300 rounded w-4/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to start writing?
          </h3>
          <p className="text-xl text-gray-300 mb-12">
            Join millions of people sharing their stories on Medium today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setShowAuthModal(true)
                setAuthModalType('signup')
              }}
              className="bg-white text-black hover:bg-gray-100 rounded-lg text-lg px-10 py-6 h-auto shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all"
            >
              Get Started
            </Button>
            <Button
              onClick={() => {
                setShowAuthModal(true)
                setAuthModalType('login')
              }}
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-lg text-lg px-10 py-6 h-auto transition-colors"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold">Medium</div>
            <p className="text-gray-600">© 2025 Medium. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="min-h-screen w-full fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop with blur */}
          <div
            className="absolute inset-0  bg-opacity-40 backdrop-blur-md"
            onClick={() => setShowAuthModal(false)}
          />
          {/* Modal Container */}
          <div className="relative z-10 max-w-175 mx-auto w-full">
            <AuthModal
              authModalType={authModalType}
              closeModal={setShowAuthModal}
            />
          </div>
        </div>
      )}
    </div>
  )
}
