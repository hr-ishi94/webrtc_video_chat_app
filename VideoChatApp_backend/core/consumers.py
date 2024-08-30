# consumers.py
from channels.generic.websocket import WebsocketConsumer
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'video_chat_{self.room_name}'

        self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type', '')

        if message_type == 'peer-id':
            peer_id = text_data_json['peerId']
            print(f"Sending peer ID: {peer_id}")  # Debugging line
            self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'peer_id_message',
                    'peerId': peer_id
                }
            )

    def peer_id_message(self, event):
        peer_id = event['peerId']

        self.send(text_data=json.dumps({
            'type': 'peer-id',
            'roomId': self.room_name,
            'peerId': peer_id
        }))

    async def chat_message(self, event):
        message = event['message']
        room_id = event['room_id']
        peer_id = event['peer_id']

        # Log the message being sent
        print(f"Sending message to room {room_id}: {peer_id}")

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'peer-id',
            'roomId': room_id,
            'peerId': peer_id
        }))
