import React, { useState } from "react";
import { Minus, Plus, Beef, Fish, Carrot, Cookie } from "lucide-react";

const CustomFood = () => {
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
  }) => (
    <div className="space-y-3">
      <label className="flex items-center text-sm font-medium text-gray-300">
        <Icon className="w-4 h-4 mr-2" />
        {label}
      </label>
      <div className="flex items-center bg-gray-700/50 rounded-lg overflow-hidden">
        <button
          type="button"
          className="p-3 hover:bg-gray-600/50 transition-colors"
          onClick={() => onChange(Math.max(0, value - step))}
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) =>
            onChange(Math.min(max, Math.max(0, parseInt(e.target.value) || 0)))
          }
          className="bg-transparent text-center w-full p-2 focus:outline-none"
        />
        <button
          type="button"
          className="p-3 hover:bg-gray-600/50 transition-colors"
          onClick={() => onChange(Math.min(max, value + step))}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Custom Food Recommendation
        </h1>
        <p className="text-gray-400">
          Set your desired nutritional values for personalized food suggestions
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <NutritionInput
            label="Calories (kcal)"
            value={nutritionValues.calories}
            onChange={(value) =>
              setNutritionValues((prev) => ({ ...prev, calories: value }))
            }
            step={50}
            max={5000}
            icon={Cookie}
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
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Get Food Recommendations
        </button>
      </form>

      {/* Results will be shown here */}
      <div className="mt-8">
        {/* Add food recommendations component here */}
      </div>
    </div>
  );
};

export default CustomFood;
