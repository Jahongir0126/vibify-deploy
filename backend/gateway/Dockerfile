FROM node:23-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

EXPOSE 3000

# Запускаем приложение
CMD ["npm", "run", "start:dev"]
