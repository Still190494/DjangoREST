import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserModelViewSet
from .models import Users


class TestUserViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUsersViewSet(APITestCase):
    def test_get_list_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_user(self):
        user = mixer.blend(Users)
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/users/{user.id}/', {'user_name': 'Still',
                                                              'first_name': user.first_name,
                                                              'last_name': user.last_name,
                                                              'birthday_year': user.birthday_year,
                                                              'email': user.email})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = Users.objects.get(id=user.id)
        self.assertEqual(user.user_name, 'Still')

