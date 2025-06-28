from django.test import TestCase
from django.urls import reverse
from .models import Practice, Cases


class ProfileApiViewTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.practice_1 = Practice.objects.create(
            category='practice_one',
            description='description_one'
        )
        cls.practice_2 = Practice.objects.create(
            category='practice_two',
            description='description_two'
        )

        cls.case_1 = Cases.objects.create(
            name_case='case_one',
            description='description_one',
            case_category=cls.practice_1,
        )
        cls.case_2 = Cases.objects.create(
            name_case='case_two',
            description='description_two',
            case_category=cls.practice_1,
        )
        cls.case_3 = Cases.objects.create(
            name_case='case_three',
            description='description_three',
            case_category=cls.practice_2,
        )

    def test_practice_api(self):
        response = self.client.get(reverse('api-root:practice-list'))

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 2)
        self.assertEqual(response_data[0].get('category'), 'practice_one')
        self.assertEqual(response_data[1].get('description'), 'description_two')

    def test_cases_api(self):
        case_category = Practice.objects.filter(category='practice_two').last()

        response = self.client.get(reverse('api-root:case-list'))

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 3)
        self.assertEqual(response_data[0].get('name_case'), 'case_one')
        self.assertEqual(response_data[1].get('description'), 'description_two')
        self.assertEqual(response_data[2].get('case_category_name'), case_category.category)

    def test_cases_api_with_filter(self):
        case_category = Practice.objects.filter(category='practice_one').last()
        query_params = {'case_category': case_category.id}

        response = self.client.get(
            reverse('api-root:case-list'),
            query_params=query_params
        )

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 2)
        self.assertEqual(response_data[0].get('name_case'), 'case_one')
        self.assertEqual(response_data[1].get('description'), 'description_two')

    def test_cases_api_with_ordering(self):
        case_category = Practice.objects.filter(category='practice_one').last()
        query_params = {'ordering': '-pk'}

        response = self.client.get(
            reverse('api-root:case-list'),
            query_params=query_params
        )

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 3)
        self.assertEqual(response_data[0].get('name_case'), 'case_three')
        self.assertEqual(response_data[1].get('description'), 'description_two')
        self.assertEqual(response_data[2].get('case_category_name'), case_category.category)

    def test_cases_api_with_search_name_case(self):
        case_category = Practice.objects.filter(category='practice_one').last()
        query_params = {'search':'case_one'}

        response = self.client.get(
            reverse('api-root:case-list'),
            query_params=query_params
        )

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0].get('name_case'), 'case_one')

    def test_cases_api_with_search_description(self):
        case_category = Practice.objects.filter(category='practice_one').last()
        query_params = {'search':'description_two'}

        response = self.client.get(
            reverse('api-root:case-list'),
            query_params=query_params
        )

        response_data = response.json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0].get('description'), 'description_two')