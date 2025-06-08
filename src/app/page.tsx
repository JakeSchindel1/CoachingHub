import Link from 'next/link'
import { ArrowRightIcon, UserGroupIcon, TrophyIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">CoachingApp</h1>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/about"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/auth/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Connect Coaches
              <span className="block text-blue-600">& Athletes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              A comprehensive platform that brings coaches and athletes together. Create custom workouts, 
              track progress, manage payments, and build stronger coaching relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/auth/signup?role=coach"
                className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center transform hover:-translate-y-0.5"
              >
                I&apos;m a Coach
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Link>
              <Link
                href="/auth/signup?role=athlete"
                className="bg-emerald-500 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl inline-flex items-center transform hover:-translate-y-0.5"
              >
                I&apos;m an Athlete
                <ArrowRightIcon className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-emerald-100 rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-100 rounded-full opacity-40 blur-xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need for Successful Coaching
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools designed to enhance the coaching experience for both coaches and athletes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <CalendarIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Custom Workouts</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Create personalized lifting and running programs. Build from templates or design from scratch 
                with our intuitive workout builder.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <TrophyIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Progress Tracking</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Upload .FIT files, track performance metrics, and provide detailed feedback on every workout. 
                See real progress over time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <UserGroupIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Seamless Payments</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Integrated payment system with custom branding. Athletes pay coaches directly with zero platform fees. 
                Focus on coaching, not billing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600 text-lg">Active Coaches</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-500 mb-2">50,000+</div>
              <div className="text-gray-600 text-lg">Athletes Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500 mb-2">1M+</div>
              <div className="text-gray-600 text-lg">Workouts Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Coaching?
          </h2>
          <p className="text-blue-100 text-xl mb-10 leading-relaxed">
            Join thousands of coaches and athletes who are already using CoachingApp to achieve their goals.
          </p>
          <Link
            href="/auth/signup"
            className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl inline-flex items-center transform hover:-translate-y-0.5"
          >
            Start Free Trial
            <ArrowRightIcon className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">CoachingApp</h3>
              <p className="text-gray-400 leading-relaxed">
                Connecting coaches and athletes for better training outcomes. Built with passion for the fitness community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CoachingApp. All rights reserved. Made with ❤️ for coaches and athletes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
