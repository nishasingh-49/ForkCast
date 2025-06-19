import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Recommendations.css";

const foodMap = {
  happy: ["Fruit Salad", "Ice Cream", "Smoothies", "Waffles", "Cupcakes", "Pancakes", "Mango Tart", "Lemonade"],
  sad: ["Mac and Cheese", "Chocolate Cake", "Ramen", "Brownies", "Hot Soup", "Pudding", "Grilled Cheese", "Cookies"],
  angry: ["Spicy Wings", "Nachos", "Crunchy Tacos", "Chili Potatoes", "Buffalo Cauliflower", "Hot Cheetos", "Schezwan Noodles"],
  tired: ["Coffee", "Energy Bars", "Peanut Butter Toast", "Oatmeal", "Granola", "Banana Bread", "Trail Mix", "Smoothie Bowl"],
  excited: ["Pizza", "Sushi", "Burgers", "Spring Rolls", "Tacos", "Mozzarella Sticks", "Quesadilla", "Corn Dogs"],
  meh: ["Toast", "Pasta", "Rice Bowl", "Sandwich", "Fried Rice", "Omelette", "Instant Noodles", "Cereal"]
};

const Recommendations = () => {
  const { state } = useLocation();
  const { mood, weather } = state || {};
  const [selectedFood, setSelectedFood] = useState(null);
  const [recipeData, setRecipeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foodThumbnails, setFoodThumbnails] = useState({});
  const [hoveredFood, setHoveredFood] = useState(null);
  const [foodNutrition, setFoodNutrition] = useState({});
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const foodSuggestions = foodMap[mood?.toLowerCase()] || [];

  // Fetch thumbnails
  useEffect(() => {
    const fetchThumbnails = async () => {
      const thumbnails = {};
      await Promise.all(
        foodSuggestions.map(async (food) => {
          try {
            const res = await fetch(
              `https://api.spoonacular.com/recipes/complexSearch?query=${food}&number=1&apiKey=${apiKey}`
            );
            const data = await res.json();
            if (data.results?.[0]) {
              thumbnails[food] = data.results[0].image;
            }
          } catch (err) {
            console.error(`Thumbnail error for ${food}`, err);
          }
        })
      );
      setFoodThumbnails(thumbnails);
    };

    if (mood && apiKey) fetchThumbnails();
  }, [mood, apiKey]);

  // Fetch nutrition facts on hover
  const fetchNutrition = async (food) => {
    if (foodNutrition[food]) return; // already fetched

    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/guessNutrition?title=${food}&apiKey=${apiKey}`
      );
      const data = await res.json();
      setFoodNutrition((prev) => ({
        ...prev,
        [food]: {
          calories: data.calories?.value + " kcal",
          protein: data.protein?.value + " " + data.protein?.unit,
          fat: data.fat?.value + " " + data.fat?.unit,
          carbs: data.carbs?.value + " " + data.carbs?.unit
        }
      }));
    } catch (err) {
      console.error(`Nutrition error for ${food}`, err);
    }
  };

  // Fetch full recipe
  const fetchRecipe = async (food) => {
    setLoading(true);
    setSelectedFood(food);
    setRecipeData(null);

    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${food}&number=1&addRecipeInformation=true&apiKey=${apiKey}`
      );
      const data = await res.json();
      if (data.results?.[0]) {
        setRecipeData(data.results[0]);
      }
    } catch (err) {
      console.error("Error fetching recipe:", err);
    }
    setLoading(false);
  };

  if (!mood || !weather) {
    return (
      <div className="recommendations-container">
        <h2>⚠️ Oops!</h2>
        <p>Please go back and re-enter your mood and weather.</p>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h2>🍽️ ForkCast Picks for You</h2>
      <p>
        Based on your mood (<strong>{mood}</strong>) and the weather (<strong>{weather}</strong>)
      </p>

      <div className="food-list">
        {foodSuggestions.map((food, index) => (
          
          <div
  key={index}
  className="food-item"
  style={{
    backgroundImage: `url(${foodThumbnails[food] || 'https://via.placeholder.com/300?text=Loading...'})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  }}
  onMouseEnter={() => setHoveredFood(food)}
  onMouseLeave={() => setHoveredFood(null)}
>
  {/* 👇 TOOLTIP GOES HERE 👇 */}
  {hoveredFood === food && foodNutrition[food] && (
    <div className="nutrition-tooltip">
      <p><strong>⚡ {foodNutrition[food].calories}</strong></p>
      <p>🥩 {foodNutrition[food].protein}</p>
      <p>🍞 {foodNutrition[food].carbs}</p>
      <p>🧈 {foodNutrition[food].fat}</p>
    </div>
  )}

  {/* Food content inside */}
  <div className="food-item-content">
    <p className="glass-food-name">{food}</p>
    <button onClick={() => fetchRecipe(food)}>View Recipe</button>
  </div>
</div>

        ))}
      </div>

      {loading && <p className="loading">Fetching recipe for {selectedFood}...</p>}

      {recipeData && (
        <div className="recipe-modal">
          <div className="recipe-box">
            <button className="close-button" onClick={() => setRecipeData(null)}>❌</button>
            <h3>{recipeData.title}</h3>
            <img src={recipeData.image} alt={recipeData.title} />
            <p><a href={recipeData.sourceUrl} target="_blank" rel="noreferrer">Full Recipe 🔗</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
