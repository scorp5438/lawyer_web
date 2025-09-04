# Lawyer Web - Веб-сайт для юридической компании

Современный адаптивный веб-сайт для юридической компании.

## 🚀 О проекте

## 🛠 Технологии
**Backend**: Django (Python 3.12) + Django REST Framework  
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![DjangoREST](https://img.shields.io/badge/Django%20REST-ff1709?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/)

**Frontend**: React  
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

**База данных**: PostgreSQL  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**Очередь задач**: Celery + Redis  
[![Celery](https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white)](https://docs.celeryproject.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

**Веб-сервер**: Nginx + Gunicorn  
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)
[![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)](https://gunicorn.org/)

**Контейнеризация**: Docker + Docker Compose  
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/)

## 📂 Структура проекта

## 📦 Установка

### Требования

- Docker 28.1.1+1
- Docker Compose 2.33.1

1. Клонируйте репозиторий:
```bash
   git clone https://github.com/scorp5438/lawyer_web.git
   cd lawyer_web/backend/lawyer_web
```
2. Установите зависимости
```bash
   pip install -r requirements.txt
```

3. Создайте файл .env на основе .env.template и заполните настройки:

```bash
   cp .env.template .env
   nano .env  # или отредактируйте в любом редакторе
```

4. Создайте символическую ссылку в корне проекта, рядом с docker-compose.yml

```bash
   ln -s backend/lawyer_web/.env .env
```

5. Запустите сервисы через docker-compose:

```bash
   sudo docker-compose up -d --build
```

6. При первом запуске выполните миграции:

```bash
   sudo docker ps
   sudo docker exec -it {id контейнера web} python manage.py migrate
```  

    или зайти в контейнер и выполнить команду внутри

```bash
   sudo docker ps
   sudo docker exec -it {id контейнера web} /bin/bash
   python manage.py migrate
``` 

7. Можно загрузить файл фикстур в базу данных (опционально)

```bash
  sudo docker ps
  sudo docker exec -it {id контейнера web} python manage.py loaddata data.json
```

    или зайти в контейнер и выполнить команду внутри

```bash
  sudo docker ps
  sudo docker exec -it {id контейнера web} /bin/bash
  python manage.py loaddata data.json
```

8. Создайте суперпользователя (опционально):
* ВАЖНО Если выполнен шаг 7, загрузка фикстур, супер пользователь уже есть

```bash
   sudo docker exec {id контейнера web} python manage.py createsuperuser
```

    или зайти в контейнер и выполнить команду внутри

```bash
  sudo docker ps
  sudo docker exec -it {id контейнера web} /bin/bash
  python manage.py createsuperuser
```

    и поочереди ввести email fullname и два раза password

## Фикстуры содержат:

- Суперпользователь:
  - login: admin
  - password: 1234
- Набор статей и Практик
    
## ⚙️ Конфигурация
- Файл .env для backend 

```ini
#DJANGO
SECRET_KEY=Секретный ключ
DEBUG=Режим дебага, True для разработки и False для продакшена
ALLOWED_HOSTS=Разрешенные хосты, localhost,127.0.0.1 для разработки
HEADER_CSRF_TOKEN=Заголовок безопасности. Проверка что сервис реакт обращается для получения токена 
HEADER_SUPERUSER_ACCESS=Заголовок безопасности, для предоставления данных о пользователе, приходит из реакт сервиса

# Настройки БД
POSTGRES_NAME_DB=Имя базы данных
POSTGRES_USER_NAME=Имя пользователя
POSTGRES_PASSWORD=Пароль
POSTGRES_HOST=Имя хоста, db
POSTGRES_PORT=Порт, по дефолту 5432

# Настройки email
EMAIL_HOST_USER=Почта для серивиса отправки писем
EMAIL_HOST_PASSWORD=Пароль для использования почты в приложении (не пароль самой почты)
DEFAULT_FROM_EMAIL=Почта для сервиса отправки писем
REDIS_HOST=redis
```
- Файл .env для backend 

ini
```
REACT_APP_BASE_URL=Базовый url на в разработке http://localhost/api/ в проде /api/
REACT_APP_DEFAULT_PAGE=
REACT_APP_DEFAULT_PAGE_SIZE=
REACT_APP_DEFAULT_ORDERING=
REACT_APP_API_TIMEOUT=
REACT_APP_SUPERUSER_ACCESS_KEY=Заголовок безопасности. Такой же как HEADER_SUPERUSER_ACCESS в файле .env для backend
REACT_APP_CSRF_TOKEN_HEADER_KEY=Заголовок безопасности. Такой же как HEADER_CSRF_TOKEN в файле .env для backend
```
## 🔧 Использование
* Приложение доступно http://localhost:3000/
* API: http://localhost:80/api/
* Админка Django: http://localhost:80/admin/

## 📌 API Endpoints

## 🧪 Тестирование

## ⚠️ Важные замечания
