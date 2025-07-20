from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

from .models import Profile


class ProfileApiViewTestCase(TestCase):

    def setUp(self):
        super().setUp()
        self.admin = User.objects.create(
            username='test_admin',
            email='test_email_for_admin@test.ru',
            password='1234',
            is_staff=True,
            is_active=True,
            is_superuser=True,
        )

        self.profile = Profile.objects.create(
            user_id=self.admin,
            phone='+79999999999',
            fb='www.facebook.com',
            x='x.com',
            tg='tg.com',
            wa='www.whatsapp.com',
            viber='www.viber.com',
            inst='instagram.com',
            site='www.example.com',
            bio='Some thing about my'
        )

    def test_user_api_with_headers(self):
        headers = {
            'X-Superuser-Access': 'hjflSdhjlkSDfjo79sdffs009fs87s0df09s8d'
        }
        response = self.client.get(reverse('api-root:user-list'), headers=headers)

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0].get('username'), 'test_admin')

    def test_user_api_authenticated(self):
        self.client.force_login(self.admin)
        response = self.client.get(reverse('api-root:user-list'))

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0].get('username'), 'test_admin')

    def test_user_api_without_headers_auth(self):
        response = self.client.get(reverse('api-root:user-list'))

        self.assertEqual(response.status_code, 403)
