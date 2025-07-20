from django.contrib.auth import get_user_model
from django.contrib.auth.management.commands.createsuperuser import Command as BaseCreatesuperuserCommand
from django.core.management.base import CommandError
from lawyer_web.profiles.models import Profile

User = get_user_model()

class Command(BaseCreatesuperuserCommand):
    help = "Создает суперпользователя и автоматически создает связанный профиль"

    def handle(self, *args, **options):
        # 1. Сначала вызываем стандартную логику createsuperuser
        super().handle(*args, **options)

        # 2. Получаем email или username из аргументов
        email = options.get('email')
        username = options.get('username')

        # 3. Находим только что созданного пользователя
        user = None
        if email:
            user = User.objects.get(email=email)
        elif username:
            user = User.objects.get(username=username)
        else:
            # Если не указаны явно, берем последнего созданного суперпользователя
            user = User.objects.filter(is_superuser=True).order_by('-date_joined').first()

        if not user:
            raise CommandError("Не удалось найти созданного суперпользователя")

        # 4. Создаем профиль, если его еще нет
        Profile.objects.get_or_create(user_id=user)

        self.stdout.write(
            self.style.SUCCESS(f"✅ Успешно создан суперпользователь {user.username} с профилем")
        )
