FROM node:20-bullseye-slim



# Установим зависимости, включая OpenSSL 1.1
RUN apt-get update && \
    apt-get install -y openssl libssl1.1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

# Генерируем Prisma Client
RUN npx prisma generate

EXPOSE 4003

CMD ["npm" "run" "start"]

