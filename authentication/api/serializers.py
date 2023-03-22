from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from users.models import User 

# User Serializer
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'full_name')

# Register Serializer
class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'full_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['full_name'], validated_data['email'], validated_data['password'])

        return user
