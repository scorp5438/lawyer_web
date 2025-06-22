from unittest.mock import patch

from django.test import TestCase
from django.urls import reverse


class ProfileApiViewTestCase(TestCase):
    @patch('form_data.api.views.send_form.delay')
    def test_valid_data(self, mock_send_form):
        data = {
            "first_name": "Алекс",
            "last_name": "Иванов",
            "phone": "+79999999999",
            "email": "a@bk.ru",
            "text": "Какой-то рандомный текст обращения"
        }

        response = self.client.post(
            reverse('api-root:data-list'),
            data=data,
            content_type='application/json',
        )

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data.get('message'), 'Successfully')
        mock_send_form.assert_called_once_with(data)

    @patch('form_data.api.views.send_form.delay')
    def test_invalid_first_name(self, mock_send_form):
        data = {
            "first_name": "Алекс1",
            "last_name": "Иванов",
            "phone": "+79999999999",
            "email": "a@bk.ru",
            "text": "Какой-то рандомный текст обращения"
        }

        response = self.client.post(
            reverse('api-root:data-list'),
            data=data,
            content_type='application/json',
        )

        response_data = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response_data.get('message'), 'Invalid data')
        mock_send_form.assert_not_called()

    @patch('form_data.api.views.send_form.delay')
    def test_invalid_first_phone(self, mock_send_form):
        data = {
            "first_name": "Алекс1",
            "last_name": "Иванов",
            "phone": "9999999999",
            "email": "a@bk.ru",
            "text": "Какой-то рандомный текст обращения"
        }

        response = self.client.post(
            reverse('api-root:data-list'),
            data=data,
            content_type='application/json',
        )

        response_data = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response_data.get('message'), 'Invalid data')
        mock_send_form.assert_not_called()

    @patch('form_data.api.views.send_form.delay')
    def test_invalid_first_email(self, mock_send_form):
        data = {
            "first_name": "Алекс1",
            "last_name": "Иванов",
            "phone": "9999999999",
            "email": "abk.ru",
            "text": "Какой-то рандомный текст обращения"
        }

        response = self.client.post(
            reverse('api-root:data-list'),
            data=data,
            content_type='application/json',
        )

        response_data = response.json()

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response_data.get('message'), 'Invalid data')
        mock_send_form.assert_not_called()
