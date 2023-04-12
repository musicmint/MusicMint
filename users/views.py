from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .serializers import UserSerializer
from .models import User

# Create your views here.
class UserUpdateAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer

    @permission_classes([IsAuthenticated])
    def post(self, request, *args, **kwargs):
        user = request.user
        newData = request.data


        for key, value in newData.items():
            setattr(user, key, value)

        user.save()
        
        return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
            })