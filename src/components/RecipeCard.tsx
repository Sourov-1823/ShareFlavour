import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  description: string;
  image_url: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  author: {
    username: string;
    avatar_url?: string;
  };
  categories?: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const totalTime = recipe.prep_time + recipe.cook_time;

  return (
    <Card className="group overflow-hidden hover:shadow-card transition-all duration-300 border-0 shadow-soft">
      <div className="relative overflow-hidden">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        {recipe.categories && recipe.categories.length > 0 && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90 text-primary">
              {recipe.categories[0]}
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{totalTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={recipe.author.avatar_url} />
            <AvatarFallback className="text-xs">
              {recipe.author.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            by {recipe.author.username}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/recipe/${recipe.id}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            View Recipe
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;