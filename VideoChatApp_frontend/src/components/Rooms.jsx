// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './Rooms.css';
// import { fetchChatRooms } from '../redux/slices/ChatRoomSlice';
// import { Button, Modal } from 'react-bootstrap';
// import CreateRoomModal from './utils/CreateRoomModal';
// import VideoChatRoom from './VideoChatRoom';
// import { SOCKET } from '../axios/EndPoints';

// const Rooms = () => {
//   const { rooms, status, error } = useSelector((state) => state.ChatRooms);
//   const dispatch = useDispatch();

//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [webSocket, setWebSocket] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);

//   const handleClose = () => setShowCreateModal(false);
//   const handleShow = () => setShowCreateModal(true);

//   useEffect(() => {
//     dispatch(fetchChatRooms());
//   }, [dispatch]);

//   const connectWebSocket = (room) => {
//     const ws = new WebSocket(`${SOCKET}chat/${room.id}/`);

//     ws.onopen = () => {
//       console.log(`Connected to room: ${room.Room_name}`);
//       setWebSocket(ws);
//     };

//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log('Received WebSocket message:', data);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket Error:', error);
//     };

//     ws.onclose = () => {
//       console.log(`Disconnected from room: ${room.Room_name}`);
//       setWebSocket(null);
//     };
//   };

//   const handleRoomClick = (room) => {
//     setSelectedRoom(room);
//     setShowConfirmation(true);
//   };

//   const handleConfirmJoin = () => {
//     if (webSocket) {
//       webSocket.close();
//     }
//     connectWebSocket(selectedRoom);
//     setShowConfirmation(false);
//   };

//   return (
//     <>
//       <h1 style={{ fontSize: "30px", color: "#004d40", marginLeft: "15px" }}>Chat Rooms</h1>
//       <div className="outer-rooms text-center">
//         {rooms.map((room) => (
//           <div className="card" key={room?.id} onClick={() => handleRoomClick(room)}>
//             <p>{room?.subject}</p>
//             <h6>{room?.Room_name}</h6>
//             <h6>Host: {room?.created_by}</h6>
//           </div>
//         ))}
//       </div>
//       <Button
//         className="px-5 mx-1 text-light w-25"
//         variant="primary"
//         style={{ backgroundColor: '#00796b' }}
//         onClick={handleShow}
//       >
//         Create Chat Room
//       </Button>
//       <CreateRoomModal show={showCreateModal} handleClose={handleClose} />
//       {selectedRoom && webSocket && (
//         <VideoChatRoom roomId={selectedRoom.id} webSocket={webSocket} />
//       )}

//       <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Join Room</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to join the room <strong>{selectedRoom?.Room_name}</strong>?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleConfirmJoin}>
//             Join
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default Rooms;

import React, { useState, useEffect } from 'react';
import './Rooms.css';
import WebRTCComponent from './WebRTCComponent';

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [usersInRoom, setUsersInRoom] = useState({});

  const rooms = [
    { id: 'room1', Room_name: 'Room 1', subject: 'Subject 1' },
    { id: 'room2', Room_name: 'Room 2', subject: 'Subject 2' },
    { id: 'room3', Room_name: 'Room 3', subject: 'Subject 3' },
  ];

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    // Simulating user joining the room
    const newUsersInRoom = { ...usersInRoom, [room.id]: (usersInRoom[room.id] || 0) + 1 };
    setUsersInRoom(newUsersInRoom);
  };

  const handleUserLeaveRoom = (room) => {
    const newUsersInRoom = { ...usersInRoom, [room.id]: usersInRoom[room.id] - 1 };
    setUsersInRoom(newUsersInRoom);
  };

  useEffect(() => {
    if (selectedRoom && usersInRoom[selectedRoom.id] < 2) {
      alert('Waiting for another user to join...');
    }
  }, [selectedRoom, usersInRoom]);

  return (
    <>
      <h1 style={{ fontSize: "30px", color: "#004d40", marginLeft: "15px" }}>Chat Rooms</h1>
      <div className='d-flex '>

      <div className="outer-rooms text-center">
        {rooms.map((room) => (
          <div className="card" key={room?.id} onClick={() => handleRoomClick(room)}>
            <p>{room?.subject}</p>
            <h6>{room?.Room_name}</h6>
            <h6>Users in Room: {usersInRoom[room.id] || 0}</h6>
          </div>
        ))}
      </div>
      <div className='mx-2'>


      {selectedRoom && usersInRoom[selectedRoom.id] >= 2 && (
        <WebRTCComponent
        usersCount = {usersInRoom[selectedRoom.id]}
        roomId={selectedRoom.id}
        onLeave={() => handleUserLeaveRoom(selectedRoom)}
        />
      )}
      </div>
      </div>
    </>
  );
};

export default Rooms;
