import React, { useEffect, useRef, useState } from 'react';
import { SOCKET } from '../axios/EndPoints';
import { Button } from 'react-bootstrap';

const WebRTCComponent = ({ roomId, usersCount ,myName}) => {
  const [callSocket, setCallSocket] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [remoteRTCMessage, setRemoteRTCMessage] = useState(null);
  const [callInProgress, setCallInProgress] = useState(false);
  const [callReceived, setCallReceived] = useState(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const pcConfig = {
    iceServers: [
      { url: "stun:stun.jap.bloggernepal.com:5349" },
      {
        url: "turn:turn.jap.bloggernepal.com:5349",
        username: "guest",
        credential: "somepassword"
      }
    ]
  };

  useEffect(() => {
    const socket = new WebSocket(`${SOCKET}ws/call/`);

    socket.onopen = () => {
      console.log('Connected');
      socket.send(JSON.stringify({
        type: 'login',
        data: { name: myName },
      }));
    };

    socket.onmessage = (e) => {
      const response = JSON.parse(e.data);
      console.log('Received WebSocket message:', response);

      const { type, data } = response;

      if (type === 'connection') {
        console.log(data.message);
      } else if (type === 'call_received') {
        onNewCall(data);
      } else if (type === 'call_answered') {
        onCallAnswered(data);
      } else if (type === 'ICEcandidate') {
        onICECandidate(data);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

    setCallSocket(socket);

    return () => {
      socket.close();
    };
  }, [myName]);

  const createPeerConnection = () => {
    try {
      const pc = new RTCPeerConnection(pcConfig);
      setPeerConnection(pc);
      pc.onicecandidate = handleIceCandidate;
      pc.onaddstream = handleRemoteStreamAdded;
      pc.onremovestream = handleRemoteStreamRemoved;
      console.log('Created RTCPeerConnection');
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
    }
  };

  const beReady = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log("Got media stream:", stream);
      setLocalStream(stream);
      localVideoRef.current.srcObject = stream;

      createPeerConnection();
      if (peerConnection) {
        peerConnection.addStream(stream);
      }
    } catch (e) {
      console.error('getUserMedia() error:', e.name, e.message);
      alert('getUserMedia() error: ' + e.name);
    }
  };

  const processCall = (userName) => {
    if (!peerConnection) {
      createPeerConnection();
    }

    if (peerConnection) {
      peerConnection.createOffer((sessionDescription) => {
        peerConnection.setLocalDescription(sessionDescription);
        sendCall({
          name: userName,
          rtcMessage: sessionDescription
        });
      }, (error) => {
        console.log("Error creating offer: ", error);
      });
    } else {
      console.error("Failed to create a peer connection.");
    }
  };

  const processAccept = () => {
    if (peerConnection) {
      peerConnection.setRemoteDescription(new RTCSessionDescription(remoteRTCMessage));
      peerConnection.createAnswer((sessionDescription) => {
        peerConnection.setLocalDescription(sessionDescription);
        answerCall({
          caller: otherUser,
          rtcMessage: sessionDescription
        });
      }, (error) => {
        console.log("Error creating answer: ", error);
      });
    } else {
      console.error("PeerConnection is not established.");
    }
  };

  const sendCall = (data) => {
    console.log("Send Call");
    callSocket.send(JSON.stringify({
      type: 'call',
      data
    }));
    setCallInProgress(true);
  };

  const answerCall = (data) => {
    console.log("Answering Call");
    callSocket.send(JSON.stringify({
      type: 'answer_call',
      data
    }));
    setCallInProgress(true);
    setCallReceived(false);
  };

  const sendICEcandidate = (data) => {
    console.log("Send ICE candidate");
    callSocket.send(JSON.stringify({
      type: 'ICEcandidate',
      data
    }));
  };

  const handleIceCandidate = (event) => {
    if (event.candidate) {
      console.log("Local ICE candidate");
      sendICEcandidate({
        user: otherUser,
        rtcMessage: {
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        }
      });
    } else {
      console.log('End of candidates.');
    }
  };

  const handleRemoteStreamAdded = (event) => {
    console.log('Remote stream added.');
    setRemoteStream(event.stream);
    remoteVideoRef.current.srcObject = event.stream;
  };

  const handleRemoteStreamRemoved = (event) => {
    console.log('Remote stream removed. Event: ', event);
    setRemoteStream(null);
    remoteVideoRef.current.srcObject = null;
  };

  const onNewCall = (data) => {
    console.log("New call received");
    setOtherUser(data.caller);
    setRemoteRTCMessage(data.rtcMessage);
    setCallReceived(true);
  };

  const onCallAnswered = (data) => {
    console.log("Call answered");
    setRemoteRTCMessage(data.rtcMessage);
    if (peerConnection) {
      peerConnection.setRemoteDescription(new RTCSessionDescription(data.rtcMessage));
    }
  };

  const onICECandidate = (data) => {
    console.log("GOT ICE candidate");
    if (peerConnection) {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: data.rtcMessage.label,
        candidate: data.rtcMessage.candidate
      });
      peerConnection.addIceCandidate(candidate);
    }
  };

  return (
    <div>
        {/* {usersCount && usersCount.map((user)=> */}
        {/* )} */}
      <div className='d-flex'>
        <video ref={localVideoRef}  autoPlay style={{ width: '280px', height: '200px', border: '1px solid grey',margin:'3px' }}></video>
        <video ref={remoteVideoRef} autoPlay style={{ width: '280px', height: '200px', border: '1px solid grey',margin:'3px' }}></video>
        <video ref={remoteVideoRef} autoPlay style={{ width: '280px', height: '200px', border: '1px solid grey',margin:'3px' }}></video>
      </div>
      <br />
      {!callInProgress && !callReceived && (
        <Button onClick={() => { beReady(); processCall('recipientUserName'); }}>Join</Button>
      )}
      {callReceived && (
        <div>
          <p>Incoming call from {otherUser}</p>
          <Button onClick={processAccept}>Answer</Button>
        </div>
      )}
      {callInProgress && (
        <div>
          <p>Call in progress with {otherUser}</p>
        </div>
      )}
    </div>
  );
};

export default WebRTCComponent;
