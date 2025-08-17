import { useState } from "react";
import Layout from "@/components/Layout";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Edit, Settings, BookOpen, Heart, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import pastaImage from "@/assets/recipe-pasta.jpg";
import dessertImage from "@/assets/recipe-dessert.jpg";

// Mock user data
const mockUser = {
  id: "1",
  username: "chef_maria",
  full_name: "Maria Rodriguez",
  email: "maria@example.com",
  bio: "Passionate home cook with 10+ years of Italian cuisine experience. Love sharing family recipes and creating new fusion dishes!",
  avatar_url: undefined,
  created_at: "2024-01-01T00:00:00Z",
  recipe_count: 12,
  followers: 245,
  following: 89,
};

// Mock user's recipes
const mockUserRecipes = [
  {
    id: "1",
    title: "Creamy Tomato Basil Pasta",
    description: "A rich and creamy pasta dish with fresh basil and perfectly ripe tomatoes.",
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
    description: "Moist chocolate cake with rich frosting and fresh berries.",
    image_url: dessertImage,
    prep_time: 30,
    cook_time: 45,
    servings: 8,
    author: {
      username: "chef_maria",
      avatar_url: undefined,
    },
    categories: ["Dessert", "Chocolate"],
  },
];

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: mockUser.full_name,
    username: mockUser.username,
    bio: mockUser.bio,
  });

  const handleSaveProfile = () => {
    // Here you would typically update the user profile via API
    console.log("Updated profile:", formData);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setFormData({
      full_name: mockUser.full_name,
      username: mockUser.username,
      bio: mockUser.bio,
    });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="mb-8 shadow-card border-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative">
                  <Avatar className="h-24 w-24 md:h-32 md:w-32">
                    <AvatarImage src={mockUser.avatar_url} />
                    <AvatarFallback className="text-2xl">
                      {mockUser.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} variant="hero" size="sm">
                        Save Changes
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold">{mockUser.full_name}</h1>
                        <p className="text-muted-foreground">@{mockUser.username}</p>
                      </div>
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                    
                    <p className="text-foreground mb-4">{mockUser.bio}</p>
                    
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="font-semibold text-primary">{mockUser.recipe_count}</span>
                        <span className="text-muted-foreground ml-1">Recipes</span>
                      </div>
                      <div>
                        <span className="font-semibold text-primary">{mockUser.followers}</span>
                        <span className="text-muted-foreground ml-1">Followers</span>
                      </div>
                      <div>
                        <span className="font-semibold text-primary">{mockUser.following}</span>
                        <span className="text-muted-foreground ml-1">Following</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content Tabs */}
        <Tabs defaultValue="recipes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recipes" className="gap-2">
              <BookOpen className="h-4 w-4" />
              My Recipes
            </TabsTrigger>
            <TabsTrigger value="favorites" className="gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recipes" className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">My Recipes ({mockUserRecipes.length})</h2>
              <Button variant="accent" className="gap-2">
                Create New Recipe
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUserRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
            
            {mockUserRecipes.length === 0 && (
              <Card className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start sharing your delicious creations with the community!
                </p>
                <Button variant="hero">Create Your First Recipe</Button>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-6">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Favorite Recipes</h2>
              <p className="text-muted-foreground">Recipes you've saved for later</p>
            </div>
            
            <Card className="p-12 text-center">
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-4">
                Start exploring recipes and save your favorites here!
              </p>
              <Button variant="outline">Browse Recipes</Button>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={mockUser.email} disabled />
                  </div>
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Button variant="outline" size="sm">Toggle</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Public Profile</Label>
                    <Button variant="outline" size="sm">Toggle</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Recipe Recommendations</Label>
                    <Button variant="outline" size="sm">Toggle</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;