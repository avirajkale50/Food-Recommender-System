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
  Loader,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { generateDietPlan } from "../services/dietService";

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

  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState(null);

  const transformDietPlanData = (apiResponse) => {
    // If the response comes with no "output" property, create one
    if (!apiResponse.output && Array.isArray(apiResponse)) {
      return { output: apiResponse };
    }
    
    // If the response is an object but has the meals in a different format
    if (apiResponse && typeof apiResponse === 'object' && !apiResponse.output) {
      // Check for common response structures
      if (apiResponse.meals) {
        return { output: apiResponse.meals };
      }
      if (apiResponse.diet_plan) {
        return { output: apiResponse.diet_plan };
      }
      // If we can identify other structure, add here
    }
    
    // Return original if nothing needs transformation
    return apiResponse;
  };

// Update the handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    const result = await generateDietPlan(formData);
    console.log("Raw result from API:", result);
    
    // Transform data if needed
    const transformedData = transformDietPlanData(result);
    console.log("Transformed diet plan data:", transformedData);
    
    setDietPlan(transformedData);
  } catch (err) {
    setError("Failed to generate diet plan. Please try again.");
    console.error("Error in diet plan generation:", err);
  } finally {
    setLoading(false);
  }
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

  // Component to display the BMI calculation
  const BMIDisplay = () => {
    const bmi = (formData.weight / ((formData.height / 100) ** 2)).toFixed(2);
    let category, color;
    
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-red-500";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal";
      color = "text-green-500";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      color = "text-yellow-500";
    } else {
      category = "Obesity";
      color = "text-red-500";
    }
    
    return (
      <div className="mt-6 p-4 rounded-lg dark:bg-gray-800/60 bg-gray-100/80">
        <h3 className="text-lg font-semibold mb-2">Your BMI</h3>
        <div className="text-3xl font-bold">{bmi} kg/m²</div>
        <div className={`text-lg font-medium ${color}`}>{category}</div>
        <div className="text-sm dark:text-gray-400 text-gray-600 mt-1">
          Healthy BMI range: 18.5 kg/m² - 25 kg/m²
        </div>
      </div>
    );
  };

  // Display diet plan results
  const DietPlanResults = () => {
    // Handle empty data cases
    if (!dietPlan) {
      return null;
    }
    
    console.log("Rendering diet plan:", dietPlan);
    
    // If output is missing or empty, show error
    if (!dietPlan.output || dietPlan.output.length === 0) {
      return (
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold">Your Personalized Diet Plan</h2>
          <div className="p-6 rounded-lg dark:bg-gray-800/60 bg-white shadow-md text-center">
            <p className="text-yellow-600 dark:text-yellow-400 mb-4">
              No meal data was returned from the recommendation system.
            </p>
            <p className="text-sm dark:text-gray-400 text-gray-600">
              This might be due to a backend issue or data format mismatch. 
              Please try again with different parameters.
            </p>
          </div>
        </div>
      );
    }

    // Helper function to get meal name based on index and total meals
    const getMealName = (index, totalMeals) => {
      if (totalMeals <= 3) {
        return index === 0 ? "Breakfast" : index === 1 ? "Lunch" : "Dinner";
      } else if (totalMeals === 4) {
        return index === 0 ? "Breakfast" : index === 1 ? "Morning Snack" : 
               index === 2 ? "Lunch" : "Dinner";
      } else {
        return index === 0 ? "Breakfast" : index === 1 ? "Morning Snack" : 
               index === 2 ? "Lunch" : index === 3 ? "Afternoon Snack" : "Dinner";
      }
    };

    // Organize meals by meal time
    const distributeMeals = () => {
      const totalMeals = Math.min(formData.meals, dietPlan.output.length);
      const mealsByTime = [];

      // Distribute available meals across meal slots
      for (let i = 0; i < totalMeals; i++) {
        mealsByTime.push([dietPlan.output[i]]);
      }
      
      return mealsByTime;
    };

    const mealsByTime = distributeMeals();

    return (
      <div className="mt-8 space-y-6">
        <h2 className="text-2xl font-bold">Your Personalized Diet Plan</h2>
        
        {mealsByTime.map((mealGroup, i) => (
          <div key={i} className="p-6 rounded-lg dark:bg-gray-800/60 bg-white shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              {getMealName(i, mealsByTime.length)}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {mealGroup.map((meal, j) => (
                <div key={j} className="border dark:border-gray-700 border-gray-200 rounded-lg overflow-hidden mx-auto max-w-md w-full">
                  {meal.image_link ? (
                    <img 
                      src={meal.image_link} 
                      alt={meal.Name} 
                      className="w-full h-56 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                      <Utensils className="w-14 h-14 text-gray-400 dark:text-gray-600" />
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="text-xl font-medium mb-4">{meal.Name}</h4>
                    
                    {/* Timing badges */}
                    {(meal.CookTime || meal.PrepTime || meal.TotalTime) && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {meal.TotalTime && (
                          <span className="text-sm px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                            Total: {meal.TotalTime} min
                          </span>
                        )}
                        {meal.PrepTime && (
                          <span className="text-sm px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                            Prep: {meal.PrepTime} min
                          </span>
                        )}
                        {meal.CookTime && (
                          <span className="text-sm px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
                            Cook: {meal.CookTime} min
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Nutritional values in a grid */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="text-center p-3 rounded bg-blue-100 dark:bg-blue-900/30">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
                        <div className="font-bold text-lg">{Math.round(meal.Calories)}</div>
                      </div>
                      <div className="text-center p-3 rounded bg-green-100 dark:bg-green-900/30">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Protein</div>
                        <div className="font-bold text-lg">{Math.round(meal.ProteinContent)}g</div>
                      </div>
                      <div className="text-center p-3 rounded bg-yellow-100 dark:bg-yellow-900/30">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Carbs</div>
                        <div className="font-bold text-lg">{Math.round(meal.CarbohydrateContent)}g</div>
                      </div>
                    </div>
                    
                    {/* Additional nutritional info in expandable section */}
                    <details className="mb-5 dark:bg-gray-700/30 bg-gray-100/80 p-4 rounded-lg">
                      <summary className="cursor-pointer font-medium text-base">More Nutritional Details</summary>
                      <div className="pt-4 grid grid-cols-2 gap-3 text-base">
                        <div>Fat: {Math.round(meal.FatContent)}g</div>
                        <div>Saturated Fat: {Math.round(meal.SaturatedFatContent)}g</div>
                        <div>Cholesterol: {Math.round(meal.CholesterolContent)}mg</div>
                        <div>Sodium: {Math.round(meal.SodiumContent)}mg</div>
                        <div>Fiber: {Math.round(meal.FiberContent)}g</div>
                        <div>Sugar: {Math.round(meal.SugarContent)}g</div>
                      </div>
                    </details>
                    
                    {/* Ingredients section */}
                    {meal.RecipeIngredientParts && meal.RecipeIngredientParts.length > 0 && (
                      <details className="mb-5 dark:bg-gray-700/30 bg-gray-100/80 p-4 rounded-lg">
                        <summary className="cursor-pointer font-medium text-base flex items-center">
                          <span className="mr-2">Ingredients</span>
                          <span className="text-sm px-2.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                            {meal.RecipeIngredientParts.length}
                          </span>
                        </summary>
                        <div className="pt-4 flex flex-wrap gap-2">
                          {meal.RecipeIngredientParts.map((ingredient, idx) => (
                            <span key={idx} className="text-sm px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                      </details>
                    )}
                    
                    {/* Instructions section */}
                    {meal.RecipeInstructions && meal.RecipeInstructions.length > 0 && (
                      <details className="mb-5 dark:bg-gray-700/30 bg-gray-100/80 p-4 rounded-lg">
                        <summary className="cursor-pointer font-medium text-base">
                          Cooking Instructions
                        </summary>
                        <ol className="pt-4 pl-7 list-decimal text-base space-y-3">
                          {meal.RecipeInstructions.map((instruction, idx) => (
                            <li key={idx}>{instruction}</li>
                          ))}
                        </ol>
                      </details>
                    )}
                    
                    <div className="flex space-x-2 mt-5">
                      <button 
                        className="flex-1 py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center text-base font-medium"
                        onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(meal.Name)} recipe`, '_blank')}
                      >
                        <Utensils className="w-5 h-5 mr-2" />
                        View Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

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

          <BMIDisplay />

          <button
            type="submit"
            disabled={loading}
            className={`mt-8 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 focus:ring-offset-white focus:ring-offset-2 shadow-lg hover:shadow-xl ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Generating Diet Plan...
              </span>
            ) : (
              "Generate Diet Plan"
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-10 text-center">
            <div className="inline-block p-8 dark:bg-gray-800/50 bg-white backdrop-blur-sm border dark:border-gray-700 border-gray-200 rounded-2xl shadow-lg">
              <Loader className="w-12 h-12 animate-spin mx-auto text-blue-500" />
              <p className="mt-4 text-lg font-medium">Generating your personalized diet plan...</p>
              <p className="text-sm dark:text-gray-400 text-gray-600">This may take a moment as we analyze your data</p>
            </div>
          </div>
        ) : (
          dietPlan && <DietPlanResults />
        )}
      </div>
    </div>
  );
};

export default DietRecommendation;