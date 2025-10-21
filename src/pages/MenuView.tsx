import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";

interface DishItem {
  id: string;
  name: string;
  category: "soup" | "main" | "side" | "salad";
}

interface DayMenu {
  date: string;
  day: string;
  soup?: DishItem;
  main?: DishItem;
  side?: DishItem;
  salad?: DishItem;
}

const MenuView = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for the week
  const [weekMenu, setWeekMenu] = useState<DayMenu[]>([
    {
      date: "2025-10-20",
      day: "Monday",
      soup: { id: "1", name: "Tomato Basil Soup", category: "soup" },
      main: { id: "2", name: "Grilled Chicken", category: "main" },
      side: { id: "3", name: "Roasted Vegetables", category: "side" },
      salad: { id: "4", name: "Caesar Salad", category: "salad" },
    },
    {
      date: "2025-10-21",
      day: "Tuesday",
      soup: { id: "5", name: "Mushroom Soup", category: "soup" },
      main: { id: "6", name: "Beef Stir Fry", category: "main" },
      side: { id: "7", name: "Jasmine Rice", category: "side" },
    },
    {
      date: "2025-10-22",
      day: "Wednesday",
    },
    {
      date: "2025-10-23",
      day: "Thursday",
    },
    {
      date: "2025-10-24",
      day: "Friday",
    },
  ]);

  // Mock dishes pool
  const dishesPool: DishItem[] = [
    { id: "8", name: "Lentil Soup", category: "soup" },
    { id: "9", name: "French Onion Soup", category: "soup" },
    { id: "10", name: "Salmon Fillet", category: "main" },
    { id: "11", name: "Vegetable Curry", category: "main" },
    { id: "12", name: "Mashed Potatoes", category: "side" },
    { id: "13", name: "Steamed Broccoli", category: "side" },
    { id: "14", name: "Greek Salad", category: "salad" },
    { id: "15", name: "Garden Salad", category: "salad" },
  ];

  const categoryColors = {
    soup: "bg-orange-100 text-orange-800 border-orange-200",
    main: "bg-red-100 text-red-800 border-red-200",
    side: "bg-amber-100 text-amber-800 border-amber-200",
    salad: "bg-green-100 text-green-800 border-green-200",
  };

  const categoryLabels = {
    soup: "🍲 Soup",
    main: "🍖 Main",
    side: "🥔 Side",
    salad: "🥗 Salad",
  };

  const handleAddDish = (dayDate: string, category: string) => {
    setSelectedDay(dayDate);
    setSelectedCategory(category);
  };

  const handleSelectDish = (dish: DishItem) => {
    if (!selectedDay || !selectedCategory) return;

    setWeekMenu((prev) =>
      prev.map((day) =>
        day.date === selectedDay
          ? { ...day, [selectedCategory]: dish }
          : day
      )
    );
    setSelectedDay(null);
    setSelectedCategory(null);
  };

  const handleRemoveDish = (dayDate: string, category: string) => {
    setWeekMenu((prev) =>
      prev.map((day) =>
        day.date === dayDate ? { ...day, [category]: undefined } : day
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Weekly Menu</h1>
          <p className="text-muted-foreground">Plan and manage your restaurant's weekly menu</p>
        </div>

        <div className="grid gap-6">
          {weekMenu.map((day) => (
            <Card key={day.date} className="overflow-hidden hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{day.day}</span>
                    <span className="text-sm text-muted-foreground ml-3">{day.date}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(["soup", "main", "side", "salad"] as const).map((category) => (
                    <div
                      key={category}
                      className="border-2 border-border rounded-lg p-4 bg-card hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className={categoryColors[category]}>
                          {categoryLabels[category]}
                        </Badge>
                        {day[category] && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleRemoveDish(day.date, category)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {day[category] ? (
                        <p className="font-medium text-foreground">{day[category].name}</p>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full border-dashed hover:bg-primary/5 hover:border-primary"
                          onClick={() => handleAddDish(day.date, category)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Dish
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Select a {selectedCategory && categoryLabels[selectedCategory as keyof typeof categoryLabels]}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {dishesPool
              .filter((dish) => dish.category === selectedCategory)
              .map((dish) => (
                <Button
                  key={dish.id}
                  variant="outline"
                  className="justify-start h-auto py-3 hover:bg-primary/10 hover:border-primary"
                  onClick={() => handleSelectDish(dish)}
                >
                  {dish.name}
                </Button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuView;
