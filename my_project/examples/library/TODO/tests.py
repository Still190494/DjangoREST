from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ProjectModelViewSet, ToDoModelViewSet
from .models import Project, ToDo, Users


class TestTodoViewSet(TestCase):
    def test_create_admin(self):
        factory = APIRequestFactory()
        users = mixer.blend(Users)
        request = factory.post('/api/project/', {'name_project': 'project1',
                                                 'link_to_the_repository': 'html1',
                                                 'users': users.id
                                                 })
        admin = User.objects.create_superuser('admin', 'admin@admin.com',
                                              'admin123456')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_edit_admin(self):
        user = mixer.blend(Users)
        project = mixer.blend(Project)
        client = APIClient()
        admin = User.objects.create_superuser('still', 'still@admin.com', 'still123456')
        client.login(username='still', password='still123456')
        response = client.put(f'/api/project/{project.id}/', {'name_project': 'project3',
                                                              'link_to_the_repository': 'html3',
                                                              'users': user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name_project, 'project3')
        self.assertEqual(project.link_to_the_repository, 'html3')
        self.assertEqual(project.users, user)
        client.logout()


