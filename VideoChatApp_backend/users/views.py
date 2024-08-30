from rest_framework.generics import ListCreateAPIView
from .models import User
from .serializers import UserSerializer,UserLoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class Userview(ListCreateAPIView):
    queryset = User.objects.all().exclude(is_superuser = True)
    serializer_class = UserSerializer
    
    def post(self,request,*args, **kwargs):
        data = request.data
        serializer = UserSerializer(data= data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer

