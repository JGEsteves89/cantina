# Cantina 🍲

<p align="center">
  <img src="https://raw.githubusercontent.com/JGEsteves89/videos/refs/heads/main/Finalpromo-ezgif.com-video-to-gif-converter.gif" height="25%" />
</p>

**Cantina** is a modern web application for planning and managing your household's weekly menus. Plan meals for upcoming days, manage your dish library, and keep everyone on the same page — no login required.

---

## 🚀 Features

### Almost Weekly Menu View

- View menus for **up to 7 days** at a glance
- Each daily menu displays four categories:
  - 🍲 Soup
  - 🍖 Main dish
  - 🥔 Side dish
  - 🥗 Salad
- **Add dishes** to any category for any day
- **Remove dishes** from the menu with a single click
- Automatically expands to show days with dishes assigned
- Add additional days to your schedule on demand

### Dish Management

Organize your household's dish library by category:

- **Add new dishes** to any category (soup, main, side, salad)
- **Edit existing dishes** to update names or categories
- **Delete dishes** you no longer use
- Visual category cards with emoji icons
- Real-time dish count badges
- Quick-add buttons for each category

### Smart Features

- **Rotating dish pool:** Automatically suggests different dishes each week
- **Persistent storage:** All menus and dishes are saved
- **Error handling:** Toast notifications for all operations
- **Responsive design:** Works seamlessly on desktop, tablet, and mobile
- **No authentication:** Simple and instant access for all household members

---

## 🌟 Why Use Cantina

- **No login required:** Instant access for everyone in your household
- **Collaborative:** Shared menu planning made simple
- **Persistent:** Never lose your menu plans or dish library
- **Fast & intuitive:** Minimal clicks to plan your week
- **Category-based:** Organized by meal components for balanced planning

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** TailwindCSS + Material-UI
- **State Management:** Zustand with persistence
- **Build Tool:** Vite
- **Backend:** my-json-server (JSON-based API)
- **Server:** Express with SSR support

---

## 📦 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/JGEsteves89/cantina.git
   cd cantina
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file for local development:

   ```env
   PORT=3001
   MY_JSON_SERVER_URL=http://localhost:3000
   MY_JSON_SERVER_API=YOUR_TOKEN_HERE
   ```

4. Start the development server:

   ```bash
   npm run dev:client  # Frontend (Vite)
   npm run dev:server  # Backend (Express)
   ```

5. Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run serve
```

---

## 🐳 Docker Setup

### Using Docker Compose with my-json-server

Cantina uses `my-json-server` as its backend. Both services must share the same Docker network.

#### 1. Create a shared network

```bash
docker network create my-json-server-net
```

#### 2. Start my-json-server

Create `my-json-server/docker-compose.yml`:

```yaml
version: '3.9'

services:
  my-json-server-service:
    image: ijimiguel/my-json-server:latest
    networks:
      - my-json-server-net
    ports:
      - '4123:3000'
    environment:
      ALLOWED_ORIGIN: '*'
      RATE_LIMIT_WINDOW_MS: 60000
      RATE_LIMIT_MAX: 100
    volumes:
      - ./data:/usr/src/app/data
      - ./myApiKeys.json:/usr/src/app/apiKeys.json:ro
    restart: always

networks:
  my-json-server-net:
    external: true
```

#### 3. Start Cantina

Create `cantina/docker-compose.yml`:

```yaml
version: '3.9'

services:
  cantina:
    image: ijimiguel/cantina:latest
    container_name: cantina
    restart: unless-stopped
    networks:
      - my-json-server-net
    ports:
      - '7456:3001'
    environment:
      NODE_ENV: production
      PORT: 3001
      MY_JSON_SERVER_URL: 'http://my-json-server-service:3000'
      MY_JSON_SERVER_API: 'YOUR_TOKEN_HERE'

networks:
  my-json-server-net:
    external: true
```

#### 4. Run both services

```bash
docker-compose -f my-json-server/docker-compose.yml up -d
docker-compose -f cantina/docker-compose.yml up -d
```

Access Cantina at `http://localhost:7456`

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `MY_JSON_SERVER_URL` | Backend API URL | `http://localhost:3000` |
| `MY_JSON_SERVER_API` | API authentication token | - |

---

## 📝 Scripts

- `npm run dev:client` - Start Vite dev server
- `npm run dev:server` - Start Express dev server
- `npm run build` - Build for production
- `npm run serve` - Serve production build
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

---

## ❤️ Contributing

Contributions are welcome! Feel free to:

- Report bugs via [GitHub Issues](https://github.com/JGEsteves89/cantina/issues)
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

Built with modern web technologies and powered by [my-json-server](https://github.com/ijimiguel/my-json-server) for simple, file-based data persistence.

