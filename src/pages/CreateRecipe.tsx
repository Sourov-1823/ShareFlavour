import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Clock, Users, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateRecipe = () => {
  const { toast } = useToast();
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    prep_time: "",
    cook_time: "",
    servings: "",
    image_url: "",
  });

  const availableCategories = [
    "Breakfast", "Lunch", "Dinner", "Dessert", "Appetizer", "Snack",
    "Vegetarian", "Vegan", "Gluten-Free", "Quick & Easy", "Italian", "Asian", "Mexican"
  ];

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.instructions) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (ingredients.filter(ing => ing.trim()).length === 0) {
      toast({
        title: "Missing Ingredients",
        description: "Please add at least one ingredient.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log("Recipe data:", {
      ...formData,
      ingredients: ingredients.filter(ing => ing.trim()),
      categories: selectedCategories,
    });

    toast({
      title: "Recipe Created!",
      description: "Your delicious recipe has been shared with the community.",
    });

    // Reset form (in a real app, you might redirect to the recipe page)
    setFormData({
      title: "",
      description: "",
      instructions: "",
      prep_time: "",
      cook_time: "",
      servings: "",
      image_url: "",
    });
    setIngredients([""]);
    setSelectedCategories([]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Recipe</h1>
          <p className="text-muted-foreground">
            Share your culinary masterpiece with the FlavorShare community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Recipe Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Give your recipe a delicious name..."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe what makes this recipe special..."
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image_url">Recipe Photo URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    placeholder="https://example.com/recipe-photo.jpg"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recipe Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recipe Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="prep_time">Prep Time (minutes)</Label>
                  <Input
                    id="prep_time"
                    type="number"
                    value={formData.prep_time}
                    onChange={(e) => setFormData({...formData, prep_time: e.target.value})}
                    placeholder="15"
                  />
                </div>
                <div>
                  <Label htmlFor="cook_time">Cook Time (minutes)</Label>
                  <Input
                    id="cook_time"
                    type="number"
                    value={formData.cook_time}
                    onChange={(e) => setFormData({...formData, cook_time: e.target.value})}
                    placeholder="30"
                  />
                </div>
                <div>
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    value={formData.servings}
                    onChange={(e) => setFormData({...formData, servings: e.target.value})}
                    placeholder="4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients *</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}...`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addIngredient}
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Ingredient
              </Button>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Instructions *</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                placeholder="Provide step-by-step instructions for preparing this recipe..."
                rows={8}
                required
              />
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" variant="hero" size="lg" className="flex-1">
              Share Recipe
            </Button>
            <Button type="button" variant="outline" size="lg">
              Save as Draft
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateRecipe;