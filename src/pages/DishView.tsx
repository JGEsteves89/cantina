import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Dish {
  id: string;
  name: string;
  category: "soup" | "main" | "side" | "salad";
}

const DishView = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    { id: "1", name: "Tomato Basil Soup", category: "soup" },
    { id: "2", name: "Grilled Chicken", category: "main" },
    { id: "3", name: "Roasted Vegetables", category: "side" },
    { id: "4", name: "Caesar Salad", category: "salad" },
    { id: "5", name: "Mushroom Soup", category: "soup" },
    { id: "6", name: "Beef Stir Fry", category: "main" },
    { id: "7", name: "Jasmine Rice", category: "side" },
    { id: "8", name: "Lentil Soup", category: "soup" },
    { id: "9", name: "French Onion Soup", category: "soup" },
    { id: "10", name: "Salmon Fillet", category: "main" },
    { id: "11", name: "Vegetable Curry", category: "main" },
    { id: "12", name: "Mashed Potatoes", category: "side" },
    { id: "13", name: "Steamed Broccoli", category: "side" },
    { id: "14", name: "Greek Salad", category: "salad" },
    { id: "15", name: "Garden Salad", category: "salad" },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "" });

  const categoryColors = {
    soup: "bg-orange-100 text-orange-800 border-orange-200",
    main: "bg-red-100 text-red-800 border-red-200",
    side: "bg-amber-100 text-amber-800 border-amber-200",
    salad: "bg-green-100 text-green-800 border-green-200",
  };

  const categoryIcons = {
    soup: "🍲",
    main: "🍖",
    side: "🥔",
    salad: "🥗",
  };

  const groupedDishes = {
    soup: dishes.filter((d) => d.category === "soup"),
    main: dishes.filter((d) => d.category === "main"),
    side: dishes.filter((d) => d.category === "side"),
    salad: dishes.filter((d) => d.category === "salad"),
  };

  const handleOpenDialog = (dish?: Dish) => {
    if (dish) {
      setEditingDish(dish);
      setFormData({ name: dish.name, category: dish.category });
    } else {
      setEditingDish(null);
      setFormData({ name: "", category: "soup" });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;

    if (editingDish) {
      setDishes((prev) =>
        prev.map((d) =>
          d.id === editingDish.id
            ? { ...d, name: formData.name, category: formData.category as Dish["category"] }
            : d
        )
      );
      toast({ title: "Dish updated successfully" });
    } else {
      const newDish: Dish = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category as Dish["category"],
      };
      setDishes((prev) => [...prev, newDish]);
      toast({ title: "Dish created successfully" });
    }

    setIsDialogOpen(false);
    setFormData({ name: "", category: "" });
  };

  const handleDelete = (id: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
    toast({ title: "Dish deleted successfully", variant: "destructive" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Dishes</h1>
            <p className="text-muted-foreground">Add, edit, and organize your restaurant's dishes</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="shadow-lg">
            <Plus className="h-5 w-5 mr-2" />
            Add New Dish
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {(Object.keys(groupedDishes) as Array<keyof typeof groupedDishes>).map((category) => (
            <Card key={category} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{categoryIcons[category]}</span>
                  <span className="capitalize">{category}s</span>
                  <Badge variant="secondary" className="ml-auto">
                    {groupedDishes[category].length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {groupedDishes[category].length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No dishes yet</p>
                  ) : (
                    groupedDishes[category].map((dish) => (
                      <div
                        key={dish.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-all"
                      >
                        <span className="font-medium text-foreground">{dish.name}</span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                            onClick={() => handleOpenDialog(dish)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(dish.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingDish ? "Edit Dish" : "Add New Dish"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Dish Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter dish name"
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soup">🍲 Soup</SelectItem>
                  <SelectItem value="main">🍖 Main</SelectItem>
                  <SelectItem value="side">🥔 Side</SelectItem>
                  <SelectItem value="salad">🥗 Salad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {editingDish ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DishView;
