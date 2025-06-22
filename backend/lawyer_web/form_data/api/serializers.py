import re

from rest_framework import serializers

NAME_PATTERN = r'(?i)^[a-яё]*(-[a-яё]*)?$'
PHONE_PATTERN = r'^(\+?7|8)\s?-?\(?\d{3}-?\)?-?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$'

class DataSerializer(serializers.Serializer):
    """
    Сериализатор для валидации данных формы.

    Поля:
    - 'first_name' (str): Имя (2-50 символов, только кириллица и дефис).
    - 'last_name' (str): Фамилия (2-50 символов, только кириллица и дефис).
    - 'phone' (str): Номер телефона (в форматах +7/8 XXX XXX-XX-XX).
    - 'email' (str): Электронная почта (стандартная валидация EmailField).
    - 'text' (str): Текст сообщения (12-500 символов).

    Валидация:
    - 'validate_first_name', 'validate_last_name': Проверяют соответствие 'NAME_PATTERN'.
    - 'validate_phone': Проверяет соответствие 'PHONE_PATTERN'.

    Пример ошибок:
    - {'first_name': 'Имя содержит недопустимые символы. Допустимые символы a-я и '-''}
    - {'phone': 'Неверно указан номер'}
    """
    first_name = serializers.CharField(min_length=2, max_length=50, allow_blank=False)
    last_name = serializers.CharField(min_length=2, max_length=50, allow_blank=False)
    phone = serializers.CharField(min_length=5, max_length=12, allow_blank=False)
    email = serializers.EmailField(allow_blank=False)
    text = serializers.CharField(min_length=12, max_length=500, allow_blank=False)

    def validate_first_name(self, value):
        """Проверяет, что имя содержит только кириллицу и дефис."""
        if re.match(NAME_PATTERN, value):
            return value
        raise serializers.ValidationError('Имя содержит недопустимые символы.\nДопустимые символы a-я и "-"')

    def validate_last_name(self, value):
        """Проверяет, что фамилия содержит только кириллицу и дефис."""
        if re.match(NAME_PATTERN, value):
            return value
        raise serializers.ValidationError('Фамилия содержит недопустимые символы.\nДопустимые символы a-я и "-"')

    def validate_phone(self, value):
        """Проверяет корректность номера телефона (Российские форматы)."""
        if re.match(PHONE_PATTERN, value):
            return value
        raise serializers.ValidationError('Неверно указан номер')
