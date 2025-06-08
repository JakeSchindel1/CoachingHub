import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function PricingPage() {
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
                href="/about"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
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

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple Pricing for Coaches
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your coaching business. 
            Athletes always connect for free.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                $0
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Up to 2 athletes</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Basic workout creation</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Exercise library</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Athlete messaging</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Progress tracking</span>
              </li>
            </ul>
            
            <Link
              href="/auth/signup?plan=free"
              className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center block"
            >
              Start Free
            </Link>
          </div>

          {/* Pro Plan */}
                      <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-blue-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                              <div className="text-4xl font-bold text-blue-600 mb-2">
                $29
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <p className="text-gray-600">For professional coaches</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="font-semibold">Unlimited athletes</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Advanced workout templates</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="font-semibold">Custom branding</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span className="font-semibold">Payment collection (0% fees)</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>File uploads & tracking</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <span>Analytics & reporting</span>
              </li>
            </ul>
            
            <Link
              href="/auth/signup?plan=pro"
                              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
            >
              Start Pro Trial
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do athletes pay anything?
              </h3>
              <p className="text-gray-600">
                No! Athletes can join and use the platform completely free. They only pay their coaches directly for coaching services.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do payments work?
              </h3>
              <p className="text-gray-600">
                Pro coaches can connect their Stripe account to collect payments directly from athletes. We take 0% fees on athlete-to-coach payments.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I switch plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial for Pro?
              </h3>
              <p className="text-gray-600">
                Yes! All new Pro accounts get a 14-day free trial. No credit card required to start.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
              <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Coaching?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of coaches who are already using CoachingApp to grow their business.
          </p>
          <Link
            href="/auth/signup?role=coach"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  )
} 