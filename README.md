# Lawyer Web - Веб-сайт для юридической компании

## 🚀 О проекте: Сайт-визитка юриста
Профессиональный и современный веб-сайт, предназначенный для юриста.
Сайт служит цифровым представительством, обеспечивая клиентам легкий доступ к контактной информации,
возможности отправки запросов и знакомству с экспертизой юриста через блог.  

## Архитектор и разработчик бэкенда

- Отвечал за полный цикл разработки серверной части приложения: от проектирования архитектуры и схемы базы данных до реализации и развертывания.
- Разработал RESTful API, обеспечивающее взаимодействие между клиентской стороной и сервером.
- Реализовал бизнес-логику, механизмы аутентификации и авторизации

## ✨ Ключевые функции

#### 📞 Контактная информация
- Администратор (владелец-юрист) может легко добавлять и обновлять свои контакты (телефон и email) через интуитивную админ-панель Django.

#### 📧 Обратная связь
- Клиенты могут отправить заявку на консультацию прямо с сайта.
- Форма запроса доступна на главной странице и в разделе «Юридическая помощь».
- Для отправки необходимо указать:
  - ФИ
  - Номер телефона
  - Электронную почту
  - Краткое описание сути обращения
- Каждая новая заявка мгновенно отправляется на электронную почту администратора, указанную в настройках проекта (переменная EMAIL_HOST_USER в файле .env).

#### 👨‍⚖️ Блок «Обо мне»

- В верхней части сайта расположен раздел с подробной информацией о юристе: его опыте, специализации и профессиональных достижениях. Это помогает потенциальным клиентам узнать эксперта лучше.

####  📰 Юридический блог

- На сайте интегрирован блог для публикации:
  - Статей и заметок по правовой тематике
  - Обзоров на новости законодательства («Новое в праве»)
- Владелец сайта может самостоятельно публиковать и редактировать все материалы через админ-панель Django, без необходимости написания кода.

#### 🌐 Социальные сети
- В футере (нижней части страницы) размещены ссылки на профессиональные социальные сети юриста для дополнительных каналов связи.

## 🛠 Технологии
**Backend**: Django (Python 3.12) + Django REST Framework  
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![DjangoREST](https://img.shields.io/badge/Django%20REST-ff1709?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/)

**Frontend**: React • HTML5 • Sass  
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)

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

**GitHub Actions**  
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

## 📂 Структура проекта

```commandline
backend/
├── backend
├───├── lawyer_web/          # папка с backend
├───├── .env.template        # Dockerfile
├───├── data.json            # файл с фикстурами
├───├── gunicorn.conf.py     # конфигурация gunicorn
├───├── nginx.conf           # конфигурация nginx для с
├───├── nginx.prod.conf      # конфигурация nginx для продакшена
├───├── requirements.txt     # файл с зависимостями 
├── frontend                 
├───├── my-app/              # папка с frontend
├───├── Dockerfile           # Dockerfile для разработки
├───└── Dockerfile.prod      # Dockerfile для продакшена
├── logs/                    # Папка для логов
├── docker-compose.prod.yml  # docker-compose для продакшена
└── docker-compose.yml       # docker-compose для разработки
.github/workflows/           # CI/CD конфигурация
```


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
   pip install -r backend/lawyer_web/requirements.txt
```

3. Создайте файл .env для backend, на основе .env.template и заполните настройки:

```bash
   cd backend/lawyer_web
   cp .env.template .env
   nano .env  # или отредактируйте в любом редакторе
```
4. Создайте файл .env для frontend, на основе .env.template и заполните настройки:

```bash
   cd frontend/my-app
   cp .env.template .env
   nano .env  # или отредактируйте в любом редакторе
```

5. Создайте символическую ссылку находясь в корне проекта, рядом с docker-compose.yml

```bash
   ln -s backend/lawyer_web/.env .env
```

6. Запустите сервисы через docker-compose:
**ВАЖНО!** Запускать именно такой командой, т.к. docker-compose.prod.yml рассчитан на работу на продакшене
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
- Файл .env для frontend 

```ini
REACT_APP_BASE_URL=Базовый url на в разработке http://localhost/api/ в проде /api/
REACT_APP_DEFAULT_PAGE=Дефолтное значение для страницы со статьями
REACT_APP_DEFAULT_PAGE_SIZE=Дефолтное максимальное значение для страниц со статьями
REACT_APP_DEFAULT_ORDERING=Дефолтное значение сортировки кейсов
REACT_APP_API_TIMEOUT=Таймаут для запросов
REACT_APP_SUPERUSER_ACCESS_KEY=Заголовок безопасности. Такой же как HEADER_SUPERUSER_ACCESS в файле .env для backend
REACT_APP_CSRF_TOKEN_HEADER_KEY=Заголовок безопасности. Такой же как HEADER_CSRF_TOKEN в файле .env для backend
```
## 🔧 Использование
* Приложение доступно http://localhost:3000/
* API: http://localhost:80/api/
* Админка Django: http://localhost:80/admin/

## 📌 API Endpoints

   - Пользователь: http://localhost/api/user/  
    **ВАЖНО!** Закрытый эндпоинт, доступен при определенном заголовке из реакта или для авторизованного пользователя
   - Статьи: http://localhost/api/article/
   - Кейсы http://localhost/api/case/ 
   - Категории http://localhost/api/category/
   - Типы (статей): http://localhost/api/type/
   - Практики: http://localhost/api/practice/
   - Данные принятые из формы: http://localhost/api/data/
   - Адрес организации: http://localhost/api/address/
   - csrf-token: http://localhost/api/get-csrf-token/
   - **ВАЖНО!** Закрытый эндпоинт, доступен только при определенном заголовке из реакта

## 🧪 Тестирование

Находясь в папке с файлом manage.py выполнить команду
```
python manage.py test
```

##  📝 Логирование

Логи приложения сохраняются в директории logs/.

## ⚠️ Важные замечания

1. Для работы email-рассылки необходимо настроить SMTP в .env
2. Redis используется как брокер для Celery
3. Все чувствительные данные (секреты) должны храниться в .env

