FROM python:3.12

RUN useradd -m lawyer

WORKDIR /app

COPY requirements.txt /app

RUN pip install --no-cache-dir -r requirements.txt

RUN pip cache purge

COPY . .

RUN chown -R lawyer:lawyer /app

USER lawyer

RUN python manage.py collectstatic --noinput

CMD ["gunicorn", "--config", "gunicorn.conf.py", "lawyer_web.lawyer_web.wsgi:application"]