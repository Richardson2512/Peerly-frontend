import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, ArrowLeft, Users, TrendingUp, Zap, Briefcase, Calendar, MessageCircle, BookOpen, Target, Check, Star, Award, Globe, Shield, FileText } from 'lucide-react';

const ProPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Alumni Connect",
      description: "Access exclusive alumni network and mentorship opportunities (Coming Soon)",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Priority Recruiter Access",
      description: "Get noticed by top recruiters with profile boosting",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Zap,
      title: "Profile Boosting",
      description: "Increase your visibility and profile views by 300%",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Briefcase,
      title: "Project Collaboration Workspace",
      description: "Exclusive tools for team projects and collaboration",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Calendar,
      title: "Event Priority Access",
      description: "Early access to premium events and workshops",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: MessageCircle,
      title: "Advanced Messaging",
      description: "Unlimited messages and advanced communication tools",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: BookOpen,
      title: "Exclusive Learning Content",
      description: "Access to premium courses and certifications",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Target,
      title: "Career Guidance",
      description: "Personalized career advice and goal tracking",
      color: "from-rose-500 to-rose-600"
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description: "Professional resume builder with templates and AI suggestions (Coming Soon)",
      color: "from-violet-500 to-violet-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      college: "IIT Delhi",
      text: "Peerly Pro helped me land my dream internship at Google! The alumni connections were invaluable.",
      rating: 5
    },
    {
      name: "Arjun Patel",
      role: "Business Student",
      college: "IIM Ahmedabad",
      text: "The priority recruiter access got me noticed by top companies. Worth every rupee!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Engineering Student",
      college: "BITS Pilani",
      text: "The project collaboration tools are amazing. Built 3 successful startups with my team!",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "What's included in the 7-day free trial?",
      answer: "You get full access to all Pro features for 7 days with no credit card required. Cancel anytime during the trial period."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have Pro access until the end of your current billing period."
    },
    {
      question: "Is there a student discount?",
      answer: "Our ₹99/month pricing is already heavily discounted for students. This is 70% less than our regular pricing."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, UPI, net banking, and digital wallets including Paytm, PhonePe, and Google Pay."
    },
    {
      question: "How does the alumni connect feature work?",
      answer: "You get access to our exclusive alumni directory, can request mentorship, and join alumni-only events and networking sessions."
    },
    {
      question: "What if I'm not satisfied with Pro?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your payment in full."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Peerly Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-8">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6">
            Unlock Your Potential with Peerly Pro
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already accelerating their careers with exclusive Pro features
          </p>
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold">₹99</div>
              <div className="text-sm opacity-90">per month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">7-day</div>
              <div className="text-sm opacity-90">free trial</div>
            </div>
          </div>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Pro Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            What Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.college}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Free</h3>
              <div className="text-4xl font-bold mb-6 text-gray-900">₹0<span className="text-lg text-gray-500">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Basic profile
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Limited connections
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Basic messaging
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  Public events
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-500 to-emerald-500 p-8 rounded-xl text-white relative">
              <div className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">₹99<span className="text-lg opacity-90">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Everything in Free
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Alumni Connect (Coming Soon)
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Priority Recruiter Access
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Profile Boosting
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Advanced Messaging
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Exclusive Events
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Project Collaboration
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Career Guidance
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-white mr-3" />
                  Resume Builder (Coming Soon)
                </li>
              </ul>
              <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of students who are already succeeding with Peerly Pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProPage;