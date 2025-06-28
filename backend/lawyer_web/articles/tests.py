from django.test import TestCase
from django.urls import reverse
from unicodedata import category

from .models import Article, Category


class ProfileApiViewTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.category_1 = Category.objects.create(
            name='category_one'
        )
        cls.category_2 = Category.objects.create(
            name='category_two'
        )
        cls.category_3 = Category.objects.create(
            name='category_three'
        )

        cls.article_1 = Article.objects.create(
            title='article_one',
            type='заметка',
            category=cls.category_1,
            content='content_one',
        )
        cls.article_2 = Article.objects.create(
            title='article_two',
            type='статья',
            category=cls.category_1,
            content='content_two',
        )
        cls.article_3 = Article.objects.create(
            title='article_three',
            type='статья',
            category=cls.category_2,
            content='content_three',
        )
        cls.article_4 = Article.objects.create(
            title='article_four',
            type='новое в праве',
            category=cls.category_3,
            content='content_four',
        )

    def test_category_api(self):
        response = self.client.get(reverse('api-root:category-list'))

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 3)
        self.assertEqual(response_data[0].get('name'), 'category_one')
        self.assertEqual(response_data[1].get('name'), 'category_two')

    def test_articles_api(self):
        response = self.client.get(reverse('api-root:article-list'))

        response_data = response.json().get('results')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 4)
        self.assertEqual(response_data[3].get('title'), 'article_one')
        self.assertEqual(response_data[2].get('type'), 'статья')
        self.assertEqual(response_data[1].get('category_name'), 'category_two')
        self.assertEqual(response_data[0].get('content'), 'content_four')



    def test_articles_api_with_ordering(self):
        query_params = {'ordering': 'pk'}

        response = self.client.get(
            reverse('api-root:article-list'),
            query_params=query_params
        )

        response_data = response.json().get('results')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 4)
        self.assertEqual(response_data[0].get('title'), 'article_one')
        self.assertEqual(response_data[1].get('type'), 'статья')
        self.assertEqual(response_data[2].get('category_name'), 'category_two')
        self.assertEqual(response_data[3].get('content'), 'content_four')


    def test_articles_api_with_filter_on_type(self):
        query_params = {'type': 'статья'}

        response = self.client.get(
            reverse('api-root:article-list'),
            query_params=query_params
        )

        response_data = response.json().get('results')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 2)
        self.assertEqual(response_data[0].get('title'), 'article_three')
        self.assertEqual(response_data[1].get('content'), 'content_two')


    def test_articles_api_with_filter_on_category(self):
        category = Category.objects.filter(name='category_one').last()
        query_params = {'category': category.id}

        response = self.client.get(
            reverse('api-root:article-list'),
            query_params=query_params
        )

        response_data = response.json().get('results')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 2)
        self.assertEqual(response_data[0].get('title'), 'article_two')
        self.assertEqual(response_data[1].get('content'), 'content_one')


    def test_articles_api_with_search_on_title(self):
        query_params = {'search': 'article_four'}

        response = self.client.get(
            reverse('api-root:article-list'),
            query_params=query_params
        )

        response_data = response.json().get('results')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0].get('title'), 'article_four')
        self.assertEqual(response_data[0].get('type'), 'новое в праве')
        self.assertEqual(response_data[0].get('content'), 'content_four')


    def test_articles_api_with_search_on_content(self):
        query_params = {'search': 'content_three'}

        response = self.client.get(
            reverse('api-root:article-list'),
            query_params=query_params
        )

        response_data = response.json().get('results')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0].get('title'), 'article_three')
        self.assertEqual(response_data[0].get('type'), 'статья')
        self.assertEqual(response_data[0].get('content'), 'content_three')