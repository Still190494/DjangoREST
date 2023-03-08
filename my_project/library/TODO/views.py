from rest_framework import filters
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import mixins, viewsets


class ProjectPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name_project']


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoPagination
    filterset_fields = ['project_note']

    # def destroy(self, request, *args, **kwargs):
    #     instanse = self.get_object()
    #     serializer = ToDoModelSerializer(instanse, data={'deleted': True},
    #                                      context={'request': request}, partial=True)
    #     serializer.is_valid()
    #     serializer.save()
    #     return Response(serializer.data)

