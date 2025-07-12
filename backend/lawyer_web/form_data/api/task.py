import datetime
import logging
from smtplib import SMTPException
from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from django.contrib.auth.models import User

console_logger = logging.getLogger('console_logger')
file_logger = logging.getLogger('file_logger')
@shared_task
def send_form(data: dict):
    data['current_date'] = datetime.datetime.now().strftime("%d.%m.%Y %H:%M")
    user_email = User.objects.last().email
    html_message = render_to_string('email/form_template.html', data)
    email = EmailMessage(
        subject=f"Новое обращение от {data.get('first_name')} {data.get('last_name')}",
        body=html_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=['vavilonskiy99@mail.ru'],
    )
    email.content_subtype = "html"
    try:
        email.send()
        console_logger.info(f'Новое обращение от {data.get('first_name')} {data.get('last_name')}')
    except SMTPException as e:
        print(f"Ошибка отправки: {str(e)}")  # Логирование
        file_logger.error(f"Ошибка отправки письма {str(e)}")
