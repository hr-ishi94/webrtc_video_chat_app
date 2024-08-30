import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './VideoChatRoom.css';

const VideoChatRoom = ({ roomId, webSocket }) => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState(null);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
      console.log(`Joined room: ${roomId} with Peer ID: ${id}`);
      
      // Notify the server with the peer ID
      webSocket.send(JSON.stringify({ type: 'peer-id', roomId, peerId: id }));
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((err) => {
          console.error('Error accessing media devices:', err);
        });
    });

    peerInstance.current = peer;

    // Handle incoming WebSocket messages
    webSocket.onmessage = (event) => {
      console.log('ddd')
      try {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket message:', data);

        if (data.type === 'peer-id' && data.roomId === roomId && data.peerId !== peerId) {
          setRemotePeerId(data.peerId);
        }
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    };
    
    const handleWebSocketMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received WebSocket message:', data);
    
        if (data.type === 'peer-id' && data.roomId === roomId && data.peerId !== peerId) {
          console.log('Updating remotePeerId:', data.peerId);
          setRemotePeerId(data.peerId);
        }
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    };
    
    webSocket.onmessage = handleWebSocketMessage;
    

    // Clean up on component unmount
    return () => {
      if (peerInstance.current) {
        peerInstance.current.destroy();
      }
    };
  }, [roomId, webSocket]);

  const callPeer = () => {
    if (remotePeerId) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();

          const call = peerInstance.current.call(remotePeerId, mediaStream);

          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((err) => {
          console.error('Error accessing media devices:', err);
        });
    } else {
      console.log('No remote peer ID available to call.');
    }
  };

  useEffect(() => {
    console.log('remotePeerId:', remotePeerId);
  }, [remotePeerId]);

  return (
    <div className="v-app">
      <h1>Room: {roomId}</h1>
      <h2>Your Peer ID: {peerId}</h2>
      <button onClick={callPeer} disabled={!remotePeerId}>Call Remote Peer</button>
      <div>
        <video ref={currentUserVideoRef} className="current-user-video" autoPlay />
      </div>
      <div>
        <video ref={remoteVideoRef} className="remote-user-video" autoPlay />
      </div>
    </div>
  );
};

export default VideoChatRoom;
