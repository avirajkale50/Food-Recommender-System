// Use a directly accessible URL instead of a Docker service name
const API_URL = "http://localhost:8080";

export const generateDietPlan = async (userData) => {
  try {
    console.log("Generating diet plan with user data:", userData);
    
    // Transform frontend data to match the backend's expected format
    const nutritionInput = calculateNutritionInput(userData);
    console.log("Calculated nutrition input:", nutritionInput);
    
    const requestData = {
      nutrition_input: nutritionInput,
      ingredients: [], // Add any ingredient restrictions if needed
      params: { n_neighbors: 5, return_distance: false }
    };
    
    console.log("Sending request to:", `${API_URL}/predict/`);
    console.log("Request payload:", requestData);
    
    const response = await fetch(`${API_URL}/predict/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
    }
    
    const data = await response.json();
    console.log("Raw API response:", data);

    // If the API returns meals in a specific format that needs transformation
    if (data && !data.output && data.results) {
      // Example: if data is in a different structure than expected
      console.log("Transforming API response format");
      return {
        output: data.results
      };
    }

    return data;
  } catch (error) {
    console.error("Error generating diet plan:", error);
    throw error;
  }
};

// Helper function to calculate nutrition input based on user data
const calculateNutritionInput = (userData) => {
  // Calculate BMR
  let bmr = 0;
  if (userData.gender === "male") {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
  } else {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
  }
  
  // Activity multiplier
  const activityMultipliers = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "extra": 1.9
  };
  
  // Weight goal multiplier
  const goalMultipliers = {
    "maintain": 1,
    "lose": 0.8,
    "gain": 1.1
  };
  
  // Map frontend activity values to backend expected values
  const activityLevel = {
    "sedentary": "Little/no exercise",
    "light": "Light exercise",
    "moderate": "Moderate exercise (3-5 days/wk)",
    "active": "Very active (6-7 days/wk)",
    "extra": "Extra active (very active & physical job)"
  }[userData.activity] || "Moderate exercise (3-5 days/wk)";
  
  // Calculate total calories based on activity and goal
  const totalCalories = bmr * (activityMultipliers[userData.activity] || 1.55) * (goalMultipliers[userData.plan] || 1);
  
  // Calculate calories per meal
  const caloriesPerMeal = totalCalories / userData.meals;
  
  // Format: [calories, fat, saturated fat, cholesterol, sodium, carbs, fiber, sugar, protein]
  return [
    caloriesPerMeal,
    caloriesPerMeal * 0.3 / 9, // Fat (30% of calories)
    caloriesPerMeal * 0.1 / 9, // Saturated fat (10% of calories)
    300, // Example cholesterol value
    2000, // Example sodium value
    caloriesPerMeal * 0.5 / 4, // Carbs (50% of calories)
    25, // Example fiber value
    caloriesPerMeal * 0.1 / 4, // Sugar (10% of calories)
    caloriesPerMeal * 0.2 / 4  // Protein (20% of calories)
  ];
};