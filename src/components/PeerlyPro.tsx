import React, { useState } from 'react';
import { Crown, Star, Users, Award, Calendar, FolderOpen, Zap, CheckCircle, X, CreditCard, Shield, Clock } from 'lucide-react';
import { User } from '../types';

interface PeerlyProProps {
  user: User;
}

const PeerlyPro: React.FC<PeerlyProProps> = ({ user }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Alumni Connect',
      description: 'Exclusive access to verified alumni for mentorship, networking, and career advice.',
      status: 'coming_soon',
      available: false
    },
    {
      icon: Star,
      title: 'Priority Recruiter Access',
      description: 'Early notification and direct messaging with top recruiters and premium internships.',
      status: 'available',
      available: true
    },
    {
      icon: Zap,
      title: 'Advanced Job & Internship Filters',
      description: 'Enhanced search and personalized recommendations based on skills and preferences.',
      status: 'available',
      available: true
    },
    {
      icon: Award,
      title: 'Resume & Portfolio Builder',
      description: 'Tools to create polished, recruiter-ready resumes and project portfolios.',
      status: 'coming_soon',
      available: false
    },
    {
      icon: Calendar,
      title: 'Exclusive Webinars & Workshops',
      description: 'Access to premium career development sessions with industry experts.',
      status: 'available',
      available: true
    },
    {
      icon: Crown,
      title: 'Profile Boost & Visibility',
      description: 'Highlighted profiles in search and recruiter views to increase outreach chances.',
      status: 'available',
      available: true
    },
    {
      icon: FolderOpen,
      title: 'Project Collaboration Workspace',
      description: 'Private spaces to build and showcase projects with peers or mentors.',
      status: 'available',
      available: true
    },
    {
      icon: Clock,
      title: 'Application Tracker',
      description: 'Manage internship/job applications with status tracking and deadlines.',
      status: 'available',
      available: true
    },
    {
      icon: Star,
      title: 'Learning Hub Access',
      description: 'Premium curated courses, tutorials, and certifications beyond free content.',
      status: 'available',
      available: true
    },
    {
      icon: Calendar,
      title: 'Event & Hackathon Priority',
      description: 'Early or exclusive invites to featured campus and national-level events.',
      status: 'available',
      available: true
    }
  ];

  const pricing = {
    monthly: {
      price: 99,
      period: 'month',
      savings: null,
      popular: false
    },
    yearly: {
      price: 990,
      period: 'year',
      savings: 'Save ₹198 (2 months free)',
      popular: true
    }
  };

  const testimonials = [
    {
      name: 'Sarah Chen',
      college: 'MIT',
      course: 'Computer Science',
      text: 'Peerly Pro helped me land my dream internship at Google. The alumni connections and priority recruiter access were game-changers!',
      rating: 5
    },
    {
      name: 'Alex Rodriguez',
      college: 'Stanford',
      course: 'Data Science',
      text: 'The project collaboration workspace is incredible. I built my portfolio and got multiple job offers before graduation.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      college: 'Harvard',
      course: 'Business',
      text: 'The exclusive webinars with industry leaders gave me insights I couldn\'t get anywhere else. Worth every rupee!',
      rating: 5
    }
  ];

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real implementation, integrate with payment gateway
    alert(`Payment processed! You now have Peerly Pro access. ₹${pricing[selectedPlan].price} charged.`);
    
    setIsProcessing(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6">
          <Crown className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Unlock Your Potential with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Peerly Pro</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get exclusive access to premium features, alumni network, priority opportunities, and advanced tools to accelerate your career.
        </p>
      </div>

      {/* Current Status */}
      {user.isPro ? (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">You're a Peerly Pro member!</h3>
              <p className="text-green-600">
                Your Pro subscription is active until {user.proExpiryDate?.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Crown className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Upgrade to Peerly Pro</h3>
              <p className="text-blue-600">
                Unlock all premium features and accelerate your career growth
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      {!user.isPro && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Choose Your Plan</h2>
          
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedPlan === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedPlan === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className={`bg-white rounded-2xl shadow-lg border-2 p-8 ${
              pricing[selectedPlan].popular ? 'border-purple-500' : 'border-gray-200'
            }`}>
              {pricing[selectedPlan].popular && (
                <div className="bg-purple-500 text-white text-center py-2 px-4 rounded-lg text-sm font-medium mb-6 -mt-8 mx-auto w-fit">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">₹{pricing[selectedPlan].price}</span>
                  <span className="text-gray-600 ml-2">/{pricing[selectedPlan].period}</span>
                </div>
                {pricing[selectedPlan].savings && (
                  <p className="text-green-600 font-medium mt-2">{pricing[selectedPlan].savings}</p>
                )}
              </div>

              <button
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Subscribe Now
                  </>
                )}
              </button>

              <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                <Shield className="h-4 w-4 mr-1" />
                Secure payment • Cancel anytime
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Pro Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border p-6 ${
                  feature.available ? 'border-gray-200' : 'border-gray-100 opacity-75'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                    feature.available 
                      ? 'bg-purple-100 text-purple-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      {feature.status === 'coming_soon' && (
                        <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">What Pro Members Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.course} • {testimonial.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: 'Can I cancel my subscription anytime?',
              answer: 'Yes, you can cancel your Peerly Pro subscription at any time. You\'ll continue to have access to Pro features until the end of your current billing period.'
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards, debit cards, UPI, and net banking. All payments are processed securely through our payment partners.'
            },
            {
              question: 'Do I get a refund if I\'m not satisfied?',
              answer: 'We offer a 7-day money-back guarantee. If you\'re not satisfied with Peerly Pro, contact our support team for a full refund.'
            },
            {
              question: 'Are the alumni connections verified?',
              answer: 'Yes, all alumni in our network are verified through their LinkedIn profiles and professional credentials. We ensure quality connections for our Pro members.'
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeerlyPro;
