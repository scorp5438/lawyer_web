import re

from rest_framework import serializers

NAME_PATTERN = r'(?i)^[a-яё]*(-[a-яё]*)?$'
PHONE_PATTERN = r'^(\+?7|8)\s?-?\(?\d{3}-?\)?-?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$'

class DataSerializer(serializers.Serializer):
    first_name = serializers.CharField(min_length=2, max_length=50, allow_blank=False)
    last_name = serializers.CharField(min_length=2, max_length=50, allow_blank=False)
    phone = serializers.CharField(min_length=5, max_length=12, allow_blank=False)
    email = serializers.EmailField(allow_blank=False)
    text = serializers.CharField(min_length=12, max_length=500, allow_blank=False)

    def validate_first_name(self, value):
        if re.match(NAME_PATTERN, value):
            return value
        print(value)
        raise serializers.ValidationError('Имя содержит недопустимые символы.\nДопустимые символы a-я и "-"')

    def validate_last_name(self, value):
        if re.match(NAME_PATTERN, value):
            return value
        print(value)
        raise serializers.ValidationError('Фамилия содержит недопустимые символы.\nДопустимые символы a-я и "-"')

    def validate_phone(self, value):
        if re.match(PHONE_PATTERN, value):
            return value
        print(value)
        raise serializers.ValidationError('Неверно указан номер')
