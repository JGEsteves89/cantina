# Cantina 🍲

**Cantina** is a modern web application that makes it easy to view, select, and manage weekly menus from your canteen. Whether you want to plan your meals in advance or contribute new dishes, Cantina provides a simple, intuitive interface for everyone — no login required.

---

## 🚀 Features

### Weekly Menu Viewing

- See the menu plan for the **next N days** at a glance.
- Each daily menu shows:
  - Soup
  - Main dish
  - Side dish
  - Salad
- Days without a menu display a friendly **“No menu available”** message.

### Menu Selection

- Pick **1–7 menus** for the upcoming week from the available pool.
- Modify your selections anytime:
  - Add new menus to your week
  - Remove menus you no longer want
  - Clear your entire selection
- Selections are always limited to the **current week’s menu pool**.

### Weekly Menu Pool

- A curated **weekly menu pool** is automatically generated or updated.
- Users can manage the pool collaboratively:
  - **Add Menu:** Create a new menu with soup, main dish, side dish, and salad
  - **Edit Menu:** Update any dish in an existing menu
  - **Delete Menu:** Remove menus from the pool

### Dish Management

- Add new dishes (soups, mains, sides, salads) to the system.
- Dishes become part of the menu pool in future weeks.

---

## 🌟 Why Use Cantina

- **No login required:** Instantly access menus and make selections.
- **Collaborative:** Everyone shares the same pool — contribute and benefit from collective choices.
- **Persistent & Reliable:** Weekly menus and selections are saved, ensuring your planning is never lost.
- **Simple & Fast:** Minimal clicks or taps to view menus, select meals, and manage dishes.

---

## 🛠️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/cantina.git
   cd cantina
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173` (or your configured Vite port).

> For production, run `npm run build` and serve the `dist/` folder with your favorite web server.

---

## 📦 Configuration

Cantina supports `.env` configuration for local development:

```env
VITE_DAYS_TO_BE_SCHEDULES=5
VITE_MY_JSON_SERVER_URL=http://localhost:3000/
VITE_MY_JSON_SERVER_API=TEST_TOKEN
```

In Docker or production, environment variables override `.env` automatically.

---

## ❤️ Contribute

Cantina is open source! Feel free to:

- Add new features
- Suggest improvements
- Report issues

---

## 🔗 License

MIT License

---

