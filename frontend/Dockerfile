FROM node:18

WORKDIR /app

# 1. Копируем только package.json сначала
COPY my-app/package.json my-app/package-lock.json ./

# 2. Устанавливаем зависимости (включая react-scripts)
RUN npm install

# 3. Копируем остальные файлы проекта
COPY my-app/ ./

# 4. Запускаем приложение
CMD ["npm", "start"]