import React, { useState } from "react";
import {
  Minus,
  Plus,
  ActivitySquare,
  Scale,
  Ruler,
  User,
  Utensils,
  Goal,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const DietRecommendation = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

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

  // Input component for number fields with +/- controls
  const NumberInput = ({
    label,
    value,
    onChange,
    icon: Icon,
    unit = "",
    min = 1,
    max = 999,
  }) => (
    <div className="space-y-3">
      <label className="flex items-center text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
        <Icon className="w-4 h-4 mr-2" />
        {label}{" "}
        {unit && (
          <span className="text-xs dark:text-gray-400 text-gray-500 ml-1">
            ({unit})
          </span>
        )}
      </label>
      <div className="flex items-center dark:bg-gray-700/50 bg-gray-100 rounded-lg overflow-hidden border dark:border-gray-600 border-gray-300">
        <button
          type="button"
          className="p-3 dark:hover:bg-gray-600/50 hover:bg-gray-200 transition-colors"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus className="w-4 h-4 dark:text-gray-300 text-gray-700" />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(
              Math.max(min, Math.min(max, parseInt(e.target.value) || min))
            )
          }
          className="bg-transparent text-center w-full p-2 focus:outline-none dark:text-white text-gray-900"
          min={min}
          max={max}
        />
        <button
          type="button"
          className="p-3 dark:hover:bg-gray-600/50 hover:bg-gray-200 transition-colors"
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus className="w-4 h-4 dark:text-gray-300 text-gray-700" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 dark:text-white text-gray-900 transition-colors duration-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Personalized Diet Plan
          </h1>
          <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
            Complete your profile for a customized nutrition plan tailored to
            your unique body composition, activity level, and health goals.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="dark:bg-gray-800/50 bg-white rounded-2xl p-8 shadow-xl border dark:border-gray-700 border-gray-200 backdrop-blur-sm"
        >
          <h2 className="text-xl font-semibold mb-6 dark:text-gray-200 text-gray-800">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Age Input */}
            <NumberInput
              label="Age"
              value={formData.age}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, age: value }))
              }
              icon={User}
              min={12}
              max={100}
            />

            {/* Height Input */}
            <NumberInput
              label="Height"
              value={formData.height}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, height: value }))
              }
              icon={Ruler}
              unit="cm"
              min={100}
              max={250}
            />

            {/* Weight Input */}
            <NumberInput
              label="Weight"
              value={formData.weight}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, weight: value }))
              }
              icon={Scale}
              unit="kg"
              min={30}
              max={250}
            />

            {/* Gender Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    formData.gender === "male"
                      ? "dark:bg-blue-600 bg-blue-500 text-white border-transparent"
                      : "dark:bg-gray-700/50 bg-gray-100 dark:text-gray-300 text-gray-700 dark:border-gray-600 border-gray-300 dark:hover:bg-gray-600/50 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, gender: "male" }))
                  }
                >
                  Male
                </button>
                <button
                  type="button"
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    formData.gender === "female"
                      ? "dark:bg-purple-600 bg-purple-500 text-white border-transparent"
                      : "dark:bg-gray-700/50 bg-gray-100 dark:text-gray-300 text-gray-700 dark:border-gray-600 border-gray-300 dark:hover:bg-gray-600/50 hover:bg-gray-200"
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

          <hr className="my-8 dark:border-gray-700 border-gray-200" />

          <h2 className="text-xl font-semibold mb-6 dark:text-gray-200 text-gray-800">
            Lifestyle & Goals
          </h2>

          {/* Activity Level */}
          <div className="space-y-3 mb-8">
            <label className="flex items-center text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              <ActivitySquare className="w-4 h-4 mr-2" />
              Activity Level
            </label>
            <select
              value={formData.activity}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, activity: e.target.value }))
              }
              className="w-full dark:bg-gray-700/50 bg-gray-100 rounded-lg p-3 dark:text-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border dark:border-gray-600 border-gray-300"
            >
              <option value="sedentary">
                Sedentary (Little or no exercise)
              </option>
              <option value="light">Light (Exercise 1-3 times/week)</option>
              <option value="moderate">
                Moderate (Exercise 3-5 times/week)
              </option>
              <option value="active">
                Very Active (Exercise 6-7 times/week)
              </option>
              <option value="extra">
                Extra Active (Very active & physical job)
              </option>
            </select>
          </div>

          {/* Weight Goal with visual cues */}
          <div className="space-y-3 mb-8">
            <label className="flex items-center text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              <Goal className="w-4 h-4 mr-2" />
              Weight Goal
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  formData.plan === "lose"
                    ? "dark:bg-green-600 bg-green-500 text-white border-transparent"
                    : "dark:bg-gray-700/50 bg-gray-100 dark:text-gray-300 text-gray-700 dark:border-gray-600 border-gray-300 dark:hover:bg-gray-600/50 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, plan: "lose" }))
                }
              >
                Lose Weight
              </button>
              <button
                type="button"
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  formData.plan === "maintain"
                    ? "dark:bg-blue-600 bg-blue-500 text-white border-transparent"
                    : "dark:bg-gray-700/50 bg-gray-100 dark:text-gray-300 text-gray-700 dark:border-gray-600 border-gray-300 dark:hover:bg-gray-600/50 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, plan: "maintain" }))
                }
              >
                Maintain
              </button>
              <button
                type="button"
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  formData.plan === "gain"
                    ? "dark:bg-purple-600 bg-purple-500 text-white border-transparent"
                    : "dark:bg-gray-700/50 bg-gray-100 dark:text-gray-300 text-gray-700 dark:border-gray-600 border-gray-300 dark:hover:bg-gray-600/50 hover:bg-gray-200"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, plan: "gain" }))
                }
              >
                Gain Weight
              </button>
            </div>
          </div>

          {/* Meals per Day */}
          <div className="space-y-3 mb-8">
            <label className="flex items-center text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
              <Utensils className="w-4 h-4 mr-2" />
              Meals per Day
            </label>
            <div className="flex items-center justify-center">
              <div className="flex items-center dark:bg-gray-700/50 bg-gray-100 rounded-lg overflow-hidden border dark:border-gray-600 border-gray-300 w-full max-w-xs">
                <button
                  type="button"
                  className="p-3 dark:hover:bg-gray-600/50 hover:bg-gray-200 transition-colors"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      meals: Math.max(2, prev.meals - 1),
                    }))
                  }
                >
                  <Minus className="w-4 h-4 dark:text-gray-300 text-gray-700" />
                </button>
                <div className="flex-1 flex items-center justify-center gap-2 py-3">
                  {[...Array(6)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i < formData.meals
                          ? "dark:bg-blue-500 bg-blue-400 scale-100"
                          : "dark:bg-gray-600 bg-gray-300 scale-75 opacity-50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="p-3 dark:hover:bg-gray-600/50 hover:bg-gray-200 transition-colors"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      meals: Math.min(6, prev.meals + 1),
                    }))
                  }
                >
                  <Plus className="w-4 h-4 dark:text-gray-300 text-gray-700" />
                </button>
              </div>
            </div>
            <div className="text-center text-sm dark:text-gray-400 text-gray-600 mt-2">
              {formData.meals} meals per day
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 focus:ring-offset-white focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            Generate Diet Plan
          </button>
        </form>

        {/* Results placeholder with improved styling */}
        <div className="mt-10 rounded-2xl p-8 dark:bg-gray-800/50 bg-white backdrop-blur-sm border dark:border-gray-700 border-gray-200 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Your Diet Plan</h2>
          <p className="dark:text-gray-400 text-gray-600">
            Submit your preferences above to receive a personalized nutrition
            plan designed for your goals and lifestyle.
          </p>
          <div className="mt-4 p-4 rounded-lg dark:bg-gray-700/50 bg-gray-100 dark:text-gray-300 text-gray-700 text-sm">
            The plan will include recommended daily calories, macronutrients
            breakdown, meal ideas, and a sample daily menu customized to your
            dietary needs.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietRecommendation;
