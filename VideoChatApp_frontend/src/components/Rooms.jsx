import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Rooms.css';
import { fetchChatRooms } from '../redux/slices/ChatRoomSlice';
import { Button } from 'react-bootstrap';
import CreateRoomModal from './utils/CreateRoomModal';
import VideoChatRoom from './VideoChatRoom';
import { SOCKET } from '../axios/EndPoints';

const Rooms = () => {
  const { rooms, status, error } = useSelector((state) => state.ChatRooms);
  const dispatch = useDispatch();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [webSocket, setWebSocket] = useState(null);

  const handleClose = () => setShowCreateModal(false);
  const handleShow = () => setShowCreateModal(true);

  useEffect(() => {
    dispatch(fetchChatRooms());
  }, [dispatch]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);

    // Close any existing WebSocket connection
    if (webSocket) {
      webSocket.close();
    }

    // Establish a new WebSocket connection for the selected room
    const ws = new WebSocket(`${SOCKET}chat/${room.id}/`);

    ws.onopen = () => {
      console.log(`Connected to room: ${room.Room_name}`);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(`Message received: ${data.message}`);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    ws.onclose = () => {
      console.log(`Disconnected from room: ${room.Room_name}`);
    };

    setWebSocket(ws);
  };

  return (
    <>
      <h1 style={{ fontSize: "30px", color: "#004d40", marginLeft: "15px" }}>Chat Rooms</h1>
      <div className="outer-rooms text-center">
        {rooms.map((room) => (
          <div
            className="card"
            key={room?.id}
            onClick={() => handleRoomClick(room)}
          >
            <p>{room?.subject}</p>
            <h6>{room?.Room_name}</h6>
            <h6>Host: {room?.created_by}</h6>
          </div>
        ))}
      </div>
      <Button
        className="px-5 mx-1 text-light w-25"
        variant="primary"
        style={{ backgroundColor: '#00796b' }}
        onClick={handleShow}
      >
        Create Chat Room
      </Button>
      <CreateRoomModal show={showCreateModal} handleClose={handleClose} />
      {selectedRoom && webSocket && <VideoChatRoom roomId={selectedRoom.id} webSocket={webSocket} />}
    </>
  );
};

export default Rooms;
