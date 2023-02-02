from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Users
from .serializers import UsersModelSerializer
from rest_framework import mixins, viewsets


class UserModelViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin,
                       mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Users.objects.all()
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = UsersModelSerializer

