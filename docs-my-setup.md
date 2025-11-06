# My Home Setup

To allow `my-json-server` and `cantina` to communicate, both must share the same Docker network.

---

## 1. Create a shared network

```bash
docker network create my-json-server-net
```

---

## 2. my-json-server `docker-compose.yml`

```yaml
# my-json-server/docker-compose.yml
version: '3.9'

services:
  my-json-server-service:
    image: ijimiguel/my-json-server:latest
    user: '${UID}:${GID}' # Optional: match host user
    networks:
      - my-json-server-net # Shared network
    ports:
      - '4123:3000' # External:Internal (CONFIG.PORT defaults to 3000)
    environment:
      ALLOWED_ORIGIN: '*'
      RATE_LIMIT_WINDOW_MS: 60000
      RATE_LIMIT_MAX: 100
    volumes:
      - ./data:/usr/src/app/data # Writable local folder for app data
      - ./myApiKeys.json:/usr/src/app/apiKeys.json:ro # Read-only token file
    restart: always

networks:
  my-json-server-net:
    external: true
```

> Note: The network must be declared as `external` so Docker Compose uses the pre-created network.

---

## 3. cantina `docker-compose.yml`

```yaml
# cantina/docker-compose.yml
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
      MY_JSON_SERVER_API: 'TOKEN'

networks:
  my-json-server-net:
    external: true
```

> Important: The `MY_JSON_SERVER_URL` points to the service name of `my-json-server-service`, defined on my-json-server yml.

---

## 4. Running the setup

Start each service in its own folder:

```bash
docker-compose -f my-json-server/docker-compose.yml up -d
docker-compose -f cantina/docker-compose.yml up -d
```
d