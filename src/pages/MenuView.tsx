import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Dish, DishCategory, DishIcon, DishController, DayMenu } from "@/api";


const MenuView = () => {
  const [selectedWeekDay, setSelectedWeekDay] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for the week
  const [weekMenu, setWeekMenu] = useState<DayMenu[]>([
    {
      id: "monday",
      weekDay: "monday",
      soup: { id: "1", name: "Tomato Basil Soup", category: "soup" } as Dish,
      main: { id: "2", name: "Grilled Chicken", category: "main" } as Dish,
      side: { id: "3", name: "Roasted Vegetables", category: "side" } as Dish,
      salad: { id: "4", name: "Caesar Salad", category: "salad" } as Dish,
    },
    {
      id: "tuesday",
      weekDay: "tuesday",
      soup: { id: "5", name: "Mushroom Soup", category: "soup" } as Dish,
      main: { id: "6", name: "Beef Stir Fry", category: "main" } as Dish,
      side: { id: "7", name: "Jasmine Rice", category: "side" } as Dish,
    },
    {
      id: "wednesday",
      weekDay: "wednesday",
    },
    {
      id: "thursday",
      weekDay: "thursday",
    },
    {
      id: "friday",
      weekDay: "friday",
    },
  ]);

  // Mock dishes pool
  const dishesPool: Dish[] = DishController.getAll();
  console.log(dishesPool);

  const categoryColors = {
    soup: "bg-orange-100 text-orange-800 border-orange-200",
    main: "bg-red-100 text-red-800 border-red-200",
    side: "bg-amber-100 text-amber-800 border-amber-200",
    salad: "bg-green-100 text-green-800 border-green-200",
  };

  const categoryLabels = Object.values(DishCategory).reduce((acc, category) => {
    const icon = DishIcon[category as DishCategory]; // type-safe access
    const formatted = category.charAt(0).toUpperCase() + category.slice(1);
    acc[category] = `${icon} ${formatted}`;
    return acc;
  }, {} as Record<DishCategory, string>);

  const handleAddDish = (weekDay: string, category: string) => {
    setSelectedWeekDay(weekDay);
    setSelectedCategory(category);
  };

  const handleSelectDish = (dish: Dish) => {
    if (!selectedWeekDay || !selectedCategory) return;

    setWeekMenu((prev) =>
      prev.map((day) =>
        day.weekDay === selectedWeekDay
          ? { ...day, [selectedCategory]: dish }
          : day
      )
    );
    setSelectedWeekDay(null);
    setSelectedCategory(null);
  };

  const handleRemoveDish = (dayDate: string, category: string) => {
    setWeekMenu((prev) =>
      prev.map((day) =>
        day.weekDay === dayDate ? { ...day, [category]: undefined } : day
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
            <Card key={day.weekDay} className="overflow-hidden hover:shadow-lg transition-all">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground">{day.weekDay}</span>
                    {/* TODO: Either remove me or change with something else */}
                    <span className="text-sm text-muted-foreground ml-3">{day.weekDay}</span> 
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
                            onClick={() => handleRemoveDish(day.weekDay, category)}
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
                          onClick={() => handleAddDish(day.weekDay, category)}
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

      <Dialog open={!!selectedWeekDay} onOpenChange={() => setSelectedWeekDay(null)}>
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
