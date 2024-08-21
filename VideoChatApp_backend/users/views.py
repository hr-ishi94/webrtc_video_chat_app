from rest_framework.generics import ListCreateAPIView
from .models import User
from .serializers import UserSerializer,UserLoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
class Userview(ListCreateAPIView):
    queryset = User.objects.all().exclude(is_superuser = True)
    serializer_class = UserSerializer

class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer

