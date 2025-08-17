import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import heroImage from "@/assets/hero-cooking.jpg";
import pastaImage from "@/assets/recipe-pasta.jpg";
import dessertImage from "@/assets/recipe-dessert.jpg";
import breakfastImage from "@/assets/recipe-breakfast.jpg";

// Mock data for demonstration
const mockRecipes = [
  {
    id: "1",
    title: "Creamy Tomato Basil Pasta",
    description: "A rich and creamy pasta dish with fresh basil and perfectly ripe tomatoes. Comfort food at its finest!",
    image_url: pastaImage,
    prep_time: 15,
    cook_time: 20,
    servings: 4,
    author: {
      username: "chef_maria",
      avatar_url: undefined,
    },
    categories: ["Dinner", "Italian"],
  },
  {
    id: "2",
    title: "Decadent Chocolate Cake",
    description: "Moist chocolate cake with rich frosting and fresh berries. Perfect for special occasions!",
    image_url: dessertImage,
    prep_time: 30,
    cook_time: 45,
    servings: 8,
    author: {
      username: "baker_john",
      avatar_url: undefined,
    },
    categories: ["Dessert", "Chocolate"],
  },
  {
    id: "3",
    title: "Healthy Breakfast Bowl",
    description: "Start your day right with this nutritious breakfast bowl packed with fresh fruits and granola.",
    image_url: breakfastImage,
    prep_time: 10,
    cook_time: 0,
    servings: 1,
    author: {
      username: "wellness_guru",
      avatar_url: undefined,
    },
    categories: ["Breakfast", "Healthy"],
  },
];

const categories = [
  "All", "Breakfast", "Lunch", "Dinner", "Dessert", "Vegetarian", "Quick & Easy", "Healthy"
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);

  useEffect(() => {
    let filtered = mockRecipes;
    
    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(recipe =>
        recipe.categories?.includes(selectedCategory)
      );
    }
    
    setFilteredRecipes(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Recipes
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Share your culinary creations and explore delicious recipes from food lovers around the world
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="hero" size="lg">
              Explore Recipes
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              Share a Recipe
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="md:w-auto gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse different categories
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Home;