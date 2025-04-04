import React, { useState } from "react";
import { Minus, Plus, ActivitySquare, Scale, Ruler, User } from "lucide-react";

const DietRecommendation = () => {
  const [formData, setFormData] = useState({
    age: 25,
    height: 170,
    weight: 70,
    gender: "male",
    activity: "moderate",
    plan: "maintain",
    meals: 3,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Personalized Diet Plann
        </h1>
        <p className="text-gray-400">
          Complete your profile for a customized nutrition plan
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Age Input */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 mr-2" />
              Age
            </label>
            <div className="flex items-center bg-gray-700/50 rounded-lg overflow-hidden">
              <button
                type="button"
                className="p-3 hover:bg-gray-600/50 transition-colors"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    age: Math.max(1, prev.age - 1),
                  }))
                }
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={formData.age}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    age: parseInt(e.target.value) || 0,
                  }))
                }
                className="bg-transparent text-center w-full p-2 focus:outline-none"
              />
              <button
                type="button"
                className="p-3 hover:bg-gray-600/50 transition-colors"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, age: prev.age + 1 }))
                }
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Height Input */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Ruler className="w-4 h-4 mr-2" />
              Height (cm)
            </label>
            <div className="flex items-center bg-gray-700/50 rounded-lg overflow-hidden">
              <button
                type="button"
                className="p-3 hover:bg-gray-600/50 transition-colors"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    height: Math.max(1, prev.height - 1),
                  }))
                }
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={formData.height}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    height: parseInt(e.target.value) || 0,
                  }))
                }
                className="bg-transparent text-center w-full p-2 focus:outline-none"
              />
              <button
                type="button"
                className="p-3 hover:bg-gray-600/50 transition-colors"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, height: prev.height + 1 }))
                }
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <Scale className="w-4 h-4 mr-2" />
              Weight (kg)
            </label>
            <div className="flex items-center bg-gray-700/50 rounded-lg overflow-hidden">
              <button
                type="button"
                className="p-3 hover:bg-gray-600/50 transition-colors"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    weight: Math.max(1, prev.weight - 1),
                  }))
                }
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    weight: parseInt(e.target.value) || 0,
                  }))
                }
                className="bg-transparent text-center w-full p-2 focus:outline-none"
              />
              <button
                type="button"
                className="p-3 hover:bg-gray-600/50 transition-colors"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, weight: prev.weight + 1 }))
                }
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Gender Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className={`p-3 rounded-lg transition-colors ${
                  formData.gender === "male"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, gender: "male" }))
                }
              >
                Male
              </button>
              <button
                type="button"
                className={`p-3 rounded-lg transition-colors ${
                  formData.gender === "female"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, gender: "female" }))
                }
              >
                Female
              </button>
            </div>
          </div>
        </div>

        {/* Activity Level */}
        <div className="mt-8 space-y-3">
          <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
            <ActivitySquare className="w-4 h-4 mr-2" />
            Activity Level
          </label>
          <select
            value={formData.activity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, activity: e.target.value }))
            }
            className="w-full bg-gray-700/50 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sedentary">Sedentary (Little or no exercise)</option>
            <option value="light">Light (Exercise 1-3 times/week)</option>
            <option value="moderate">Moderate (Exercise 3-5 times/week)</option>
            <option value="active">
              Very Active (Exercise 6-7 times/week)
            </option>
            <option value="extra">
              Extra Active (Very active & physical job)
            </option>
          </select>
        </div>

        {/* Weight Goal */}
        <div className="mt-8 space-y-3">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Weight Goal
          </label>
          <select
            value={formData.plan}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, plan: e.target.value }))
            }
            className="w-full bg-gray-700/50 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>

        {/* Meals per Day */}
        <div className="mt-8 space-y-3">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Meals per Day
          </label>
          <div className="flex items-center bg-gray-700/50 rounded-lg overflow-hidden">
            <button
              type="button"
              className="p-3 hover:bg-gray-600/50 transition-colors"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  meals: Math.max(2, prev.meals - 1),
                }))
              }
            >
              <Minus className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={formData.meals}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  meals: parseInt(e.target.value) || 2,
                }))
              }
              className="bg-transparent text-center w-full p-2 focus:outline-none"
              min="2"
              max="6"
            />
            <button
              type="button"
              className="p-3 hover:bg-gray-600/50 transition-colors"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  meals: Math.min(6, prev.meals + 1),
                }))
              }
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Generate Diet Plan
        </button>
      </form>

      {/* Results will be shown here */}
      <div className="mt-8">{/* Add diet plan results component here */}</div>
    </div>
  );
};

export default DietRecommendation;
