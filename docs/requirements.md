# Cantina

## Cantina requirements

1. Overview
   1. Purpose: Cantina is a web application that allows users to view and interact with weekly menus offered by a canteen. It provides functionality to view upcoming menus, select meals for upcoming days, and contribute new dishes or menus to a shared pool.
   1. Scope: The first version of Cantina focuses on read and write operations without user accounts or authentication. All users share the same access level and data visibility.

1. Functional Requirements
   1. Accessibility
      1. The application must be publicly accessible without login or registration.
      1. All users share the same interface and data (no personalization or authentication).

   1. Menu Viewing
      1. The user can view the menu plan for the next 7 days.
      1. Each daily menu displays:
         - Soup
         - Main dish
         - Side dish
         - Salad
      1. If no menu is set for a specific day, the UI should indicate it (e.g. “No menu available”).

   1. Menu Selection
      1. The user can select 1 to 7 menus (one per day) from the available group of menus for the upcoming week.
      1. A selection is limited to the current week’s menu pool.
      1. Once a menu's are selected, the user can:
      1. Add to the selection (until the end of the week)
      1. Remove from the selection (until the end of the week)
      1. Clear their selection

   1. Weekly Menu Pool
      1. Each week, there exists a pre-selected group of menus (the “menu pool”) from which users can choose.
      1. The menu pool changes every week.
      1. The weekly pool is stored in a database and can be updated by any user.

   1. Menu Pool Management
      1. Users can manage the pool of possible menus:
      1. Add Menu: Create a new menu composed of a soup, main dish, side dish, and salad.
      1. Edit Menu: Modify any component (soup, main dish, side dish, salad) of an existing menu.
      1. Delete Menu: Remove a menu from the pool.

   1. Dish Management
      1. The user can add new dishes (soups, mains, sides, salads) to the system.
      1. These dishes become available for inclusion in future menus.

1. Non-Functional Requirements
   1. Usability
      1. Simple, minimal interface accessible via modern web browsers.
      1. Menu selection should require minimal clicks/taps.

   1. Reliability
      1. Weekly data (menus and selections) must persist between sessions.
      1. Weekly resets (new menu pool) occur automatically or through admin input.

## Cantina class diagram

```plantuml
@startuml

' Base class for all dishes
class DishBase {
  id: uuid
  name: string
  ingredients: List<{quantity: number, ingredient: string, unit: string}>
}

' Specific dishes inherit from DishBase

class Soup
class Main
class Side
class Salad

DishBase <|-- Soup
DishBase <|-- Main
DishBase <|-- Side
DishBase <|-- Salad

class Menu {
  id: uuid
  start_date: DateTime
}

' Menu contains exactly one Soup and Main, optionally Side/Salad
Menu "1" *-- "1" Soup
Menu "1" *-- "1" Main
Menu "1" o-- "0,1" Side
Menu "1" o-- "0,1" Salad

class DishesPool {
  id: uuid
  start_date: DateTime
}

' DishesPool contains lists of each dish type
DishesPool "1" *-- "N" Soup
DishesPool "1" *-- "N" Main
DishesPool "1" *-- "N" Side
DishesPool "1" *-- "N" Salad

@enduml
```

## Cantina databse diagram

```plantuml
@startuml
hide circle

' ====================
' TABLES
' ====================

entity "DishBase" as DishBase {
  * id : UUID <<PK>>
  * name : VARCHAR
}

entity "Ingredient" as Ingredient {
  * id : UUID <<PK>>
  * dish_id : UUID <<FK>>
  * name : VARCHAR
  * quantity : DECIMAL
  * unit : VARCHAR
}

entity "Soup" as Soup {
  * id : UUID <<PK,FK>>
}

entity "Main" as Main {
  * id : UUID <<PK,FK>>
}

entity "Side" as Side {
  * id : UUID <<PK,FK>>
}

entity "Salad" as Salad {
  * id : UUID <<PK,FK>>
}

entity "Menu" as Menu {
  * id : UUID <<PK>>
  * start_date : DATE
  * soup_id : UUID <<FK>>
  * main_id : UUID <<FK>>
  * side_id : UUID <<FK,nullable>>
  * salad_id : UUID <<FK,nullable>>
}

' ====================
' RELATIONSHIPS
' ====================

DishBase ||--|| Soup
DishBase ||--|| Main
DishBase ||--|| Side
DishBase ||--|| Salad

DishBase ||--o{ Ingredient : "has ingredients"

Menu }o--|| Soup
Menu }o--|| Main
Menu }o--o{ Side
Menu }o--o{ Salad


@enduml
```

## Cantina MVC

```plantuml
@startuml
skinparam classAttributeIconSize 0

' ====================
' MODELS
' ====================
package Models {
    class DishBaseModel {
      +id: UUID
      +name: string
      +addDish(name): DishBaseModel
      +updateDish(id, data)
      +deleteDish(id)
    }

    class SoupModel
    class MainModel
    class SideModel
    class SaladModel

    DishBaseModel <|-- SoupModel
    DishBaseModel <|-- MainModel
    DishBaseModel <|-- SideModel
    DishBaseModel <|-- SaladModel

    class MenuModel {
      +id: UUID
      +start_date: date
      +soup_id: UUID
      +main_id: UUID
      +side_id: UUID
      +salad_id: UUID
      +getMenuByDate(date)
      +addMenu(data)
      +updateMenu(id, data)
      +deleteMenu(id)
      +getWeekDishesPool(start_date)
    }
}

' ====================
' CONTROLLERS
' ====================
package Controllers {
    class MenuController {
      +showCurrentMenu()
      +editMenu(id, data)
    }

    class DishController {
      +listDishes()
      +createDish(data)
      +editDish(id, data)
      +deleteDish(id)
    }

    class DishesPoolController {
      +showPool()
      +generatePool()
    }
}

' ====================
' VIEWS
' ====================
package Views {
    class MenuView {
      +displayWeeklyMenu(menu)
      +removeDishFromMenu(dish_id)
      +addDishToMenu(dish_id)
      +openAddDishesToMenuView(menu)
    }

    class AddDishesToMenuView {
      +displayDishesPoolMenu(menu)
    }

    class DishView {
      +displayDishList(dishes)
      +removeDish(dish_id)
      +addDish(dish)
      +openAddDishView()
    }

    class AddDishView {
      +createDish(data)
    }
}



' ====================
' RELATIONSHIPS
' ====================

' Models to Controllers
MenuModel --> MenuController
DishBaseModel --> DishController
DishBaseModel --> DishesPoolController

' Controllers to Views
MenuController --> MenuView
DishesPoolController --> MenuView
DishController --> DishView

' Sub views
MenuView --> AddDishesToMenuView
DishView --> AddDishView


' Models relations
MenuModel --> SoupModel
MenuModel --> MainModel
MenuModel --> SideModel
MenuModel --> SaladModel

@enduml

```

