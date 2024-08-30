from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets, permissions
from .models import ChatRoom, RoomParticipant
from .serializers import ChatRoomSerializer, RoomParticipantSerializer
from rest_framework.response import Response

# Create your views  here.
class ChatRoomView(generics.ListCreateAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer

    def post(self,request,*args, **kwargs):
        data = request.data
        serializer = ChatRoomSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status= status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    # def perform_create(self, serializer):
    #     serializer.save(created_by=self.request.user)

class RoomParticipantViewSet(viewsets.ModelViewSet):
    queryset = RoomParticipant.objects.all()
    serializer_class = RoomParticipantSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)