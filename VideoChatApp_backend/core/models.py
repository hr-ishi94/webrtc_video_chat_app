from django.db import models
from users.models import User

class ChatRoom(models.Model):
    Room_name = models.CharField(max_length=30,unique=True)
    subject= models.CharField(max_length=30)
    created_by = models.ForeignKey(User,on_delete=models.CASCADE,blank=True,null=True)

    def __str__(self):
        return self.Room_name


class RoomParticipant(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)
