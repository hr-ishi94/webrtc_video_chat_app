from django.urls import path
from .views import *

urlpatterns = [
    path('chat_rooms/',ChatRoomView.as_view(),name='chat_rooms')
]
