from rest_framework import serializers
from .models import ChatRoom,RoomParticipant
from users.serializers import UserSerializer

class ChatRoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ChatRoom
        fields = '__all__'


class RoomParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomParticipant
        fields = '__all__'