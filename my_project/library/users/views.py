from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import Users
from .serializers import UsersModelSerializer, UsersModelSerializer2
from rest_framework import mixins, viewsets


class UserModelViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin,
                       mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = UsersModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2':
            return UsersModelSerializer2
        return UsersModelSerializer
