import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, Users, Heart, Share2, Bookmark, ChefHat } from "lucide-react";
import pastaImage from "@/assets/recipe-pasta.jpg";

// Mock recipe data - in a real app, this would come from an API
const mockRecipe = {
  id: "1",
  title: "Creamy Tomato Basil Pasta",
  description: "A rich and creamy pasta dish with fresh basil and perfectly ripe tomatoes. This comfort food classic combines the tangy sweetness of tomatoes with aromatic basil and a luxurious cream sauce that coats every strand of pasta perfectly.",
  image_url: pastaImage,
  prep_time: 15,
  cook_time: 20,
  servings: 4,
  ingredients: [
    "500g pasta (penne or rigatoni)",
    "2 cans (400g each) diced tomatoes",
    "1 cup heavy cream",
    "1/2 cup fresh basil leaves, chopped",
    "4 cloves garlic, minced",
    "1 large onion, diced",
    "1/2 cup grated Parmesan cheese",
    "3 tablespoons olive oil",
    "Salt and pepper to taste",
    "Red pepper flakes (optional)"
  ],
  instructions: `1. Bring a large pot of salted water to boil. Cook pasta according to package directions until al dente. Reserve 1 cup pasta water before draining.

2. While pasta cooks, heat olive oil in a large skillet over medium heat. Add diced onion and cook for 5 minutes until softened.

3. Add minced garlic and cook for another minute until fragrant. Be careful not to burn the garlic.

4. Pour in the diced tomatoes with their juice. Season with salt, pepper, and red pepper flakes if using. Simmer for 10-12 minutes until the sauce thickens slightly.

5. Reduce heat to low and slowly stir in the heavy cream. Let it simmer gently for 3-4 minutes.

6. Add the cooked pasta to the sauce along with half of the fresh basil. Toss everything together, adding pasta water as needed to achieve desired consistency.

7. Remove from heat and stir in the Parmesan cheese. Taste and adjust seasoning.

8. Serve immediately, garnished with remaining fresh basil and extra Parmesan cheese if desired.`,
  author: {
    username: "chef_maria",
    full_name: "Maria Rodriguez",
    avatar_url: undefined,
    bio: "Passionate home cook with 10+ years of Italian cuisine experience"
  },
  categories: ["Dinner", "Italian", "Vegetarian", "Comfort Food"],
  created_at: "2024-01-15T10:30:00Z"
};

const RecipeDetail = () => {
  const { id } = useParams();
  
  // In a real app, you'd fetch the recipe based on the ID
  const recipe = mockRecipe;
  const totalTime = recipe.prep_time + recipe.cook_time;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Recipe Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{recipe.description}</p>
          
          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button variant="hero" className="gap-2">
              <Heart className="h-4 w-4" />
              Save Recipe
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="gap-2">
              <Bookmark className="h-4 w-4" />
              Bookmark
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recipe Image */}
            <div className="relative rounded-lg overflow-hidden shadow-card">
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* Ingredients */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <ChefHat className="h-6 w-6 text-primary" />
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <div className="prose prose-lg max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                    {recipe.instructions}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recipe Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recipe Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Prep Time</span>
                    </div>
                    <span className="font-medium">{recipe.prep_time}m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Cook Time</span>
                    </div>
                    <span className="font-medium">{recipe.cook_time}m</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Total Time</span>
                    </div>
                    <span className="font-semibold text-primary">{totalTime}m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Servings</span>
                    </div>
                    <span className="font-medium">{recipe.servings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Recipe by</h3>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={recipe.author.avatar_url} />
                    <AvatarFallback>
                      {recipe.author.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{recipe.author.full_name || recipe.author.username}</h4>
                    <p className="text-sm text-muted-foreground">@{recipe.author.username}</p>
                    {recipe.author.bio && (
                      <p className="text-sm mt-2">{recipe.author.bio}</p>
                    )}
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nutrition Facts (placeholder) */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Nutrition Facts</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div className="flex justify-between">
                    <span>Calories</span>
                    <span>~450 per serving</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protein</span>
                    <span>~15g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carbohydrates</span>
                    <span>~60g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fat</span>
                    <span>~18g</span>
                  </div>
                  <p className="text-xs mt-3 text-muted-foreground">
                    *Nutritional values are approximate
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RecipeDetail;