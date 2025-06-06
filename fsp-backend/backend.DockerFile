FROM node:22

RUN apt-get update && apt-get install -y \
  wget \
  ca-certificates \
  chromium \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgbm1 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Add non-root user
RUN useradd -m -s /bin/bash pptruser

ENV CHROME_DEVEL_SANDBOX=/usr/local/sbin/chrome-devel-sandbox
ENV NODE_ENV=development

# Optional: install Chromium if you want to use system Chromium
# RUN apt-get update && apt-get install -y chromium

WORKDIR /app

RUN mkdir -p /app/fsp-backend

COPY package*.json ./fsp-backend

WORKDIR /app/fsp-backend

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

RUN npm install

COPY . .

RUN chown -R pptruser:node /app/fsp-backend

EXPOSE 8080

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER pptruser

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
