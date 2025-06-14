import datetime
from smtplib import SMTPException
from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

from django.contrib.auth.models import User

@shared_task
def send_form(data: dict):
    data['current_date'] = datetime.timezone.now().strftime("%d.%m.%Y %H:%M")
    user_email = User.objects.last().email
    html_message = render_to_string('email/form_template.html', data)
    email = EmailMessage(
        f"Новое обращение от {data.get('first_name')} {data.get('last_name')}",  # Тема письма
        html_message,
        [user_email],  # Список получателей
    )
    email.content_subtype = "html"  # Указываем, что письмо содержит HTML
    try:
        email.send()
        # logger_console.info(f'Заказ № {order_pk} создан')
    except SMTPException as e:
        # logger_file.error(f"Ошибка отправки письма для заказа {order_pk}: {str(e)}")
        print(f'{ e = }')