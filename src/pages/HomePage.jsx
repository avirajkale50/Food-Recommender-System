import React from "react";
import { Link } from "react-router-dom";
import {
  Utensils,
  Apple,
  ArrowRight,
  Activity,
  Brain,
  Heart,
  ChevronDown,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="text-gray-900 dark:text-white transition-colors duration-200">
      {/* Hero Section with Background */}
      <div className="relative py-20 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-900/20 dark:to-purple-900/20 z-0"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-green-400 dark:bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm animate-gradient">
            Welcome to NutriGuide
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-xl max-w-2xl mx-auto mb-8">
            Your personalized nutrition companion for a healthier lifestyle
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <Link
              to="/diet"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
          <a
            href="#main-features"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 animate-bounce"
          >
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Main Features Section */}
      <div
        id="main-features"
        className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24"
      >
        <Link
          to="/diet"
          className="group bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 p-8 rounded-xl hover:from-blue-200 hover:to-blue-100 dark:hover:from-blue-800 dark:hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-2 shadow-xl hover:shadow-2xl relative overflow-hidden"
        >
          <div className="absolute right-0 bottom-0 h-32 w-32 bg-gradient-to-tl from-blue-300 to-transparent opacity-20 transform rotate-12 translate-x-8 translate-y-8 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700"></div>
          <div className="flex items-center justify-between mb-6">
            <div className="bg-blue-500/20 p-3 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300">
              <Utensils className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-blue-900 dark:text-blue-100">
            Diet Recommendation
          </h2>
          <p className="text-blue-800 dark:text-blue-200 opacity-80">
            Get a personalized diet plan based on your body metrics and
            lifestyle
          </p>
        </Link>

        <Link
          to="/custom"
          className="group bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900 dark:to-emerald-800 p-8 rounded-xl hover:from-emerald-200 hover:to-emerald-100 dark:hover:from-emerald-800 dark:hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-2 shadow-xl hover:shadow-2xl relative overflow-hidden"
        >
          <div className="absolute right-0 bottom-0 h-32 w-32 bg-gradient-to-tl from-emerald-300 to-transparent opacity-20 transform rotate-12 translate-x-8 translate-y-8 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700"></div>
          <div className="flex items-center justify-between mb-6">
            <div className="bg-emerald-500/20 p-3 rounded-lg group-hover:bg-emerald-500/30 transition-colors duration-300">
              <Apple className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-emerald-900 dark:text-emerald-100">
            Custom Food Recommendation
          </h2>
          <p className="text-emerald-800 dark:text-emerald-200 opacity-80">
            Customize your nutritional requirements and discover perfect meal
            options
          </p>
        </Link>
      </div>

      {/* Benefits Section */}
      <div
        id="features"
        className="py-16 bg-gray-50/70 dark:bg-gray-900/70 rounded-3xl my-16"
      >
        <h2 className="text-3xl font-bold text-center mb-4">
          Why Choose NutriGuide?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
          Our platform combines cutting-edge nutrition science with AI to help
          you eat better and feel amazing
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
          <div className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-6 group-hover:bg-purple-500/30 transition-colors duration-300">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-purple-900 dark:text-purple-100">
              Personalized Plans
            </h3>
            <p className="text-gray-700 dark:text-gray-400">
              Get diet recommendations tailored specifically to your body and
              goals
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-6 group-hover:bg-blue-500/30 transition-colors duration-300">
              <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">
              Smart Analysis
            </h3>
            <p className="text-gray-700 dark:text-gray-400">
              Advanced algorithms calculate your perfect nutritional balance for
              optimal health
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
            <div className="bg-red-500/20 p-3 rounded-lg w-fit mb-6 group-hover:bg-red-500/30 transition-colors duration-300">
              <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-red-900 dark:text-red-100">
              Health Focused
            </h3>
            <p className="text-gray-700 dark:text-gray-400">
              All recommendations are based on proven nutritional science and
              health research
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Transform Your Nutrition?
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Start your journey to better health today with personalized nutrition
          guidance
        </p>
        <Link
          to="/diet"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
        >
          Get Your Custom Diet Plan
        </Link>
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: scale(1) translate(0px, 0px);
          }
          25% {
            transform: scale(1.1) translate(20px, 15px);
          }
          50% {
            transform: scale(1) translate(0px, 0px);
          }
          75% {
            transform: scale(0.9) translate(-20px, 15px);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
