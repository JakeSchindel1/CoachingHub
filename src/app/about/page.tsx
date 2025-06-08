import Link from 'next/link'
import { HeartIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">CoachingApp</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Pricing
              </Link>
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About CoachingApp
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re building the future of coaching by connecting coaches and athletes 
              through technology that enhances performance and strengthens relationships.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every great athlete has a great coach behind them. But finding the right tools to manage 
              training, communicate effectively, and handle business operations can be overwhelming. 
              That&apos;s where CoachingApp comes in.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe that coaching is fundamentally about human connection and expertise. Technology 
              should enhance that relationship, not complicate it. Our platform is designed to handle 
              the logistics so coaches can focus on what they do best: coaching.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we build and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <HeartIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Coach-First Design</h3>
              <p className="text-gray-600">
                Every feature is designed with coaches in mind. We understand that your time is valuable 
                and your expertise is irreplaceable.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Focus</h3>
              <p className="text-gray-600">
                We&apos;re building a community where coaches and athletes can thrive together. 
                Success is measured by the relationships we help strengthen.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Trust & Transparency</h3>
              <p className="text-gray-600">
                We believe in fair pricing, clear communication, and putting our users first. 
                No hidden fees, no complicated contracts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              CoachingApp was born from the frustration of coaches juggling multiple tools, 
              spreadsheets, and platforms just to manage their athletes. We saw talented coaches 
              spending more time on administration than actual coaching.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our founders, both former athletes who worked with multiple coaches throughout their 
              careers, recognized that the best coaching relationships were built on clear communication, 
              consistent programming, and mutual trust. They set out to build a platform that would 
              enhance these core elements while handling all the business logistics seamlessly.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, CoachingApp serves thousands of coaches and athletes worldwide, from weekend warriors 
              to Olympic hopefuls. We&apos;re proud to be a small part of every personal record, every breakthrough, 
              and every goal achieved on our platform.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Whether you&apos;re a coach looking to grow your business or an athlete seeking better training, 
            we&apos;d love to have you on board.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup?role=coach"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Join as Coach
            </Link>
            <Link
              href="/auth/signup?role=athlete"
              className="bg-emerald-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition-colors inline-block"
            >
              Join as Athlete
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 