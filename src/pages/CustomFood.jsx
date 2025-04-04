import React, { useState } from "react";
import { Minus, Plus, Beef, Fish, Carrot, Cookie } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const CustomFood = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [nutritionValues, setNutritionValues] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70,
    fiber: 25,
    sodium: 2300,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const NutritionInput = ({
    label,
    value,
    onChange,
    step,
    max,
    icon: Icon,
    color,
  }) => (
    <div className="space-y-3">
      <label className="flex items-center text-sm font-medium dark:text-gray-300 text-gray-700">
        <Icon className={`w-4 h-4 mr-2 ${color}`} />
        {label}
      </label>
      <div className="flex items-center rounded-lg overflow-hidden border dark:bg-gray-700/50 dark:border-gray-600 bg-gray-100 border-gray-300">
        <button
          type="button"
          className="p-3 transition-colors dark:hover:bg-gray-600/50 hover:bg-gray-200"
          onClick={() => onChange(Math.max(0, value - step))}
        >
          <Minus className="w-4 h-4 dark:text-gray-300 text-gray-700" />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(Math.min(max, Math.max(0, parseInt(e.target.value) || 0)))
          }
          className="text-center w-full p-2 focus:outline-none bg-transparent dark:text-white text-gray-900"
        />
        <button
          type="button"
          className="p-3 transition-colors dark:hover:bg-gray-600/50 hover:bg-gray-200"
          onClick={() => onChange(Math.min(max, value + step))}
        >
          <Plus className="w-4 h-4 dark:text-gray-300 text-gray-700" />
        </button>
      </div>
      <div className="h-1.5 dark:bg-gray-700 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className="dark:text-gray-400 text-gray-500">0</span>
        <span className="dark:text-gray-400 text-gray-500">{max}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 dark:text-white text-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center">
            Custom Food Recommendation
          </h1>
          <p className="dark:text-gray-400 text-gray-600 text-center">
            Set your desired nutritional values for personalized food
            suggestions
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 shadow-xl dark:bg-gray-800/50 dark:backdrop-blur-sm bg-white border border-gray-200"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <NutritionInput
              label="Calories (kcal)"
              value={nutritionValues.calories}
              onChange={(value) =>
                setNutritionValues((prev) => ({ ...prev, calories: value }))
              }
              step={50}
              max={5000}
              icon={Cookie}
              color="from-amber-400 to-orange-500"
            />

            <NutritionInput
              label="Protein (g)"
              value={nutritionValues.protein}
              onChange={(value) =>
                setNutritionValues((prev) => ({ ...prev, protein: value }))
              }
              step={5}
              max={300}
              icon={Beef}
              color="from-red-400 to-red-600"
            />

            <NutritionInput
              label="Carbohydrates (g)"
              value={nutritionValues.carbs}
              onChange={(value) =>
                setNutritionValues((prev) => ({ ...prev, carbs: value }))
              }
              step={5}
              max={500}
              icon={Carrot}
              color="from-yellow-400 to-orange-500"
            />

            <NutritionInput
              label="Fat (g)"
              value={nutritionValues.fat}
              onChange={(value) =>
                setNutritionValues((prev) => ({ ...prev, fat: value }))
              }
              step={5}
              max={200}
              icon={Fish}
              color="from-blue-400 to-blue-600"
            />

            <NutritionInput
              label="Fiber (g)"
              value={nutritionValues.fiber}
              onChange={(value) =>
                setNutritionValues((prev) => ({ ...prev, fiber: value }))
              }
              step={1}
              max={100}
              icon={Carrot}
              color="from-green-400 to-green-600"
            />

            <NutritionInput
              label="Sodium (mg)"
              value={nutritionValues.sodium}
              onChange={(value) =>
                setNutritionValues((prev) => ({ ...prev, sodium: value }))
              }
              step={100}
              max={5000}
              icon={Cookie}
              color="from-purple-400 to-purple-600"
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 focus:ring-offset-white focus:ring-offset-2"
          >
            Get Food Recommendations
          </button>
        </form>

        {/* Results section */}
        <div className="mt-10 rounded-2xl p-8 dark:bg-gray-800/50 dark:backdrop-blur-sm bg-white border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Your Recommendations</h2>
          <p className="dark:text-gray-400 text-gray-600">
            Submit your preferences to see customized food recommendations here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomFood;
