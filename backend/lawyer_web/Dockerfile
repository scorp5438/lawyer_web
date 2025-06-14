FROM python:alpine

WORKDIR /app

COPY requirements.txt /app

RUN pip install --no-cache-dir -r requirements.txt

RUN pip cache purge

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "lawyer_web.lawyer_web.wsgi:application"]