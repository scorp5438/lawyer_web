FROM node:18

WORKDIR /app

# Копируем package.json первым для кэширования
COPY my-app/package.json my-app/package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY my-app/ ./

# Собираем приложение
RUN npm run build

# Команда для development-режима
CMD ["npm", "start"]