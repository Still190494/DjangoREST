from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Users


class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class UsersModelSerializer2(ModelSerializer):
    class Meta:
        model = Users
        fields = ('email',)
