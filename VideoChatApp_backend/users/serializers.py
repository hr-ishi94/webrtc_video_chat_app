from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username = attrs['email'],password =attrs['password'])
        if user and user.is_active:
            refresh = RefreshToken.for_user(user)
            return {
                'refresh':str(refresh),
                'access':str(refresh.access_token),
                'email':attrs['email']
            }
        raise serializers.ValidationError("Invalid credentials")